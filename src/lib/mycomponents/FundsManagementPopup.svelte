<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import * as Dialog from '$lib/components/ui/dialog';

	import { getWalletContext } from '$lib/context';
	import type { WalletName } from '@aptos-labs/wallet-adapter-core';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Label } from '$lib/components/ui/label';

	import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { decimal_to_aptos_price } from '$lib/aptos_utils';
	import { CONTRACT_ADDRESS } from '$lib/constants';


	const walletContext = getWalletContext();
	let is_open = $state(false);

	async function connect(name: WalletName) {
		await walletContext.connect(name);
	}

	const config = new AptosConfig({ network: Network.TESTNET });
	const aptos = new Aptos(config);

	let amount = $state(0.0);

	async function deposit() {
		let tr_amount = decimal_to_aptos_price(amount);

		const response = await walletContext.signAndSubmitTransaction({
			//sender: walletContext.account?.address,
			data: {
				//type: "entry_function_payload",
				function: `${CONTRACT_ADDRESS}::my_auction::deposit`,
				typeArguments: [],
				functionArguments: [tr_amount]
			}
		});

		try {
    		const respo = await aptos.waitForTransaction({ transactionHash: response.hash });

			toast.success('Your funds have been deposited', {
					description: 'You can now use your new funds to create requests',
					action: {
						label: 'Go',
						onClick: () => goto(`/request`)
					}
				});

  		} catch (error) {
			console.error(error);
		}

	}

	async function withdraw() {}
</script>

<div class="w-full px-8">
	{#if walletContext.connected}
		<Button
			class="w-full text-black"
			variant="outline"
			onclick={() => {
				is_open = true;
			}}>Manage Funds</Button
		>
	{/if}

	<Dialog.Root closeOnOutsideClick={true} bind:open={is_open}>
		<!--<AlertDialog.Trigger class="bg-green-800 w-full py-2 rounded-xl font-semibold">Connect</AlertDialog.Trigger>-->
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Manage your Funds</Dialog.Title>
				<Dialog.Description>

					<Label for="amount">Amount to deposit (APT)</Label>
					<Input name="amount" type="number" class="text-black" bind:value={amount} />

				</Dialog.Description>
			</Dialog.Header>
			<Dialog.Footer>
				<Button
				class="w-full text-black"
				variant="outline"
				onclick={() => {
					deposit()
				}}>Deposit</Button
			>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>



</div>
