<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getWalletContext } from '$lib/context';
	import { browser } from '$app/environment';
	import { AptosWalletAdapter } from '$lib/wallet.svelte';
	import { Network } from '@aptos-labs/ts-sdk';
	import { PetraWallet } from 'petra-plugin-wallet-adapter';

	const { children }: { children: Snippet } = $props();

	//const wallet = new AptosWalletAdapter(true);
	const wallet = getWalletContext();

	if (browser) {
		const petraWallet = new PetraWallet()
		wallet.initialize({
			plugins: [
				petraWallet
			],
			optInWallets: [
				
			],
			dappConfig: {
				network: Network.TESTNET,
				aptosConnectDappId: 'aptos-connect'
			}
		});
	}
</script>

{@render children()}
