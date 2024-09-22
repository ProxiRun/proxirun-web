<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import * as Dialog from '$lib/components/ui/dialog';


	import { getWalletContext } from '$lib/context';
	import type { WalletName } from '@aptos-labs/wallet-adapter-core';

	const walletContext = getWalletContext();
	let is_open = $state(false);
	
	async function connect(name: WalletName) {
		await walletContext.connect(name);
	}
</script>

<div class="w-full px-8">
	{#if walletContext.connected}
		<Button class="w-full k"  onclick={() => {is_open = false; walletContext.disconnect()}}>Disconnect</Button>
	{:else}
		<Button class="w-full text-black" variant="outline" onclick={() => {is_open = true}}>Connect</Button>

		<Dialog.Root closeOnOutsideClick={true} bind:open={is_open} >
			<!--<AlertDialog.Trigger class="bg-green-800 w-full py-2 rounded-xl font-semibold">Connect</AlertDialog.Trigger>-->
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Choose a Wallet to connect to</Dialog.Title>
					<Dialog.Description>
						<div class="grid grid-cols-2 gap-4 pt-4">
							{#each walletContext.wallets as wallet}
								<Button
									onclick={() => connect(wallet.name)}
									variant="outline"
									class=" space-x-4"
								>
									<div style="pointer-events: none;">
										<img src={wallet.icon} alt={wallet.name} class="h-5 w-5" />
									</div>
									<div style="pointer-events: none;">
										{#if wallet.name === 'Continue with Google'}
											Connect to Google
										{:else}
											Connect to {wallet.name}
										{/if}
									</div>
								</Button>
							{/each}
						</div>
					</Dialog.Description>
				</Dialog.Header>
				<Dialog.Footer>
					<Button class="w-full text-black" variant="outline" onclick={() => {is_open = false}}>Cancel</Button>				
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	{/if}
</div>
