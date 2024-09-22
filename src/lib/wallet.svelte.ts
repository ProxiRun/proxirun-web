import type {
	SignMessagePayload,
	Wallet,
	InputGenerateTransactionOptions,
	AnyRawTransaction,
	InputSubmitTransactionData,
	AccountAuthenticator,
	PendingTransactionResponse,
	SignMessageResponse,
	WalletName,
	Types,
	AptosStandardSupportedWallet,
	AvailableWallets,
	InputTransactionData
} from '@aptos-labs/wallet-adapter-core';
import { type DappConfig, WalletCore } from '@aptos-labs/wallet-adapter-core';
import { onMount } from 'svelte';

export class AptosWalletAdapter {
	connected = $state(false);
	isLoading = $state(true);
	walletCore = $state<WalletCore>();
	wallets = $state<ReadonlyArray<Wallet | AptosStandardSupportedWallet>>([]);
	//account = $state<AccountInfo | null>(null);

	// FIXME: this shouldn't work, we should be using the on events instead
	account = $derived(this.walletCore?.account || null);
	network = $derived(this.walletCore?.network || null);

	onError: (error: unknown) => void = (error) => console.error(error);

	static UNINITIALIZED_ERROR = new Error('WalletCore is not initialized');

	// FIXME: add walletcore and config
	constructor(autoconnect: boolean) {
		if (autoconnect) {
			onMount(() => {
				this.connect(localStorage.getItem('AptosWalletName') as WalletName);
			});
		}
		this.isLoading = false;
	}

	initialize(config: {
		plugins: ReadonlyArray<Wallet> | null;
		optInWallets: ReadonlyArray<AvailableWallets> | null;
		dappConfig: DappConfig;
	}) {
		this.walletCore = new WalletCore(
			config.plugins || [],
			config.optInWallets || [],
			config.dappConfig
		);
		this.eventsSetUp(this.walletCore);
		this.wallets = this.walletCore.wallets;
	}

	async connect(walletName: WalletName) {
		try {
			this.isLoading = true;
			await this.walletCore?.connect(walletName);
		} catch (error: unknown) {
			if (this.onError) {
				this.onError(error as Error);
			}
			return Promise.reject(error);
		} finally {
			this.isLoading = false;
		}
	}

	async disconnect() {
		try {
			await this.walletCore?.disconnect();
		} catch (error) {
			if (this.onError) {
				this.onError(error);
				return Promise.reject(error);
			}
		}
	}

	handleConnect() {
		this.connected = true;
		// this.account = account;
	}

	handleDisconnect() {
		if (this.connected) {
			this.connected = false;
		}
	}

	handleAccountChange() {
		if (!this.connected || !this.walletCore?.wallet) {
			return;
		}

		this.account = this.walletCore?.account || null;
	}

	handleNetworkChange() {
		if (!this.connected || !this.walletCore?.wallet) {
			return;
		}

		this.network = this.walletCore?.network || null;
	}

	handleReadyStateChange(updatedWallet: Wallet) {
		const updatedWallets = this.wallets.map((wallet) => {
			if (wallet.name === updatedWallet.name) {
				return { ...wallet, readyState: updatedWallet.readyState };
			}
			return wallet;
		});
		// @ts-expect-error This should work
		this.wallets = updatedWallets;
	}

	handleStandardWalletsAdded(standardWallet: Wallet | AptosStandardSupportedWallet) {
		const existingWalletIndex = this.wallets.findIndex(
			(wallet) => wallet.name == standardWallet.name
		);
		if (existingWalletIndex !== -1) {
			this.wallets = [
				...this.wallets.slice(0, existingWalletIndex),
				standardWallet,
				...this.wallets.slice(existingWalletIndex + 1)
			];
		} else {
			this.wallets = [...this.wallets, standardWallet];
		}
	}

	/* Transactions */
	async signTransaction(
		transaction: AnyRawTransaction | Types.TransactionPayload,
		asFeePayer?: boolean,
		options?: InputGenerateTransactionOptions
	): Promise<AccountAuthenticator> {
		if (!this.walletCore) {
			throw AptosWalletAdapter.UNINITIALIZED_ERROR;
		}
		try {
			return await this.walletCore.signTransaction(transaction, asFeePayer, options);
		} catch (error: unknown) {
			if (this.onError) this.onError(error);
			return Promise.reject(error);
		}
	}

	async signMessage(message: SignMessagePayload): Promise<SignMessageResponse> {
		if (!this.walletCore) {
			throw AptosWalletAdapter.UNINITIALIZED_ERROR;
		}
		try {
			return await this.walletCore.signMessage(message);
		} catch (error: unknown) {
			if (this.onError) this.onError(error);
			return Promise.reject(error);
		}
	}

	async signMessageAndVerify(message: SignMessagePayload): Promise<boolean> {
		if (!this.walletCore) {
			throw AptosWalletAdapter.UNINITIALIZED_ERROR;
		}
		try {
			return await this.walletCore.signMessageAndVerify(message);
		} catch (error: unknown) {
			if (this.onError) this.onError(error);
			return Promise.reject(error);
		}
	}

	async submitTransaction(
		transaction: InputSubmitTransactionData
	): Promise<PendingTransactionResponse> {
		if (!this.walletCore) {
			throw AptosWalletAdapter.UNINITIALIZED_ERROR;
		}
		try {
			return await this.walletCore.submitTransaction(transaction);
		} catch (error: unknown) {
			if (this.onError) this.onError(error);
			return Promise.reject(error);
		}
	}

	
	async signAndSubmitTransaction(
		transactionInput: InputTransactionData
	): Promise<
    { hash: Types.HexEncodedBytes; output?: any } | PendingTransactionResponse
  > {
		if (!this.walletCore) {
			throw AptosWalletAdapter.UNINITIALIZED_ERROR;
		}
		try {
			return await this.walletCore.signAndSubmitTransaction(
				transactionInput
			);
		} catch (error: unknown) {
			if (this.onError) this.onError(error);
			return Promise.reject(error);
		}
	}
	
	

	eventsSetUp(walletCore: WalletCore) {
		walletCore?.on('connect', () => this.handleConnect());
		walletCore?.on('disconnect', () => this.handleDisconnect());
		walletCore?.on('accountChange', this.handleAccountChange);
		walletCore?.on('networkChange', this.handleAccountChange);
		walletCore?.on('readyStateChange', this.handleReadyStateChange);
		walletCore?.on('standardWalletsAdded', this.handleStandardWalletsAdded);
	}

	eventsCleanUp(walletCore: WalletCore) {
		walletCore?.off('connect',  this.handleConnect);
		walletCore?.off('disconnect', this.handleDisconnect);
		walletCore?.off('accountChange', this.handleAccountChange);
		walletCore?.off('networkChange', this.handleNetworkChange);
		walletCore?.off('readyStateChange', this.handleReadyStateChange);
		walletCore?.off('standardWalletsAdded', this.handleStandardWalletsAdded);
	}
}
