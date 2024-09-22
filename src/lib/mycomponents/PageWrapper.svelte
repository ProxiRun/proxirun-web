<script lang="ts">
	import { type Snippet } from 'svelte';
	import ConnectionRequired from './ConnectionRequired.svelte';

	import { wallet } from '$lib/store.svelte';

	import { getWalletContext } from '$lib/context';
	import SideMenuConnection from './SideMenuConnection.svelte';
	const walletContext = getWalletContext();

	//let is_coconnected = $derived( ayaya_wallet.connected);

	let {
		title,
		check_is_connected,
		children,
		controls
	}: { title: string; check_is_connected: boolean; children: Snippet; controls: Snippet | null } =
		$props();

	// Function to connect the wallet
	async function connectWallet() {
		await wallet.connect(); // Call the connect method
	}
</script>

<div
	class="grow p-6 lg:rounded-lg lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 lg:bg-zinc-900 lg:ring-white/10"
>
	<div class="mx-auto max-w-6xl">
		<div class="flex flex-row items-end justify-between gap-4">
			<div class="flex flex-wrap items-end justify-between gap-4">
				<h1 class="text-2xl/8 font-semibold sm:text-xl/8 text-white">
					{title}
				</h1>
			</div>
			<div class="max-w-[299px]">
				{#if controls}
					{@render controls()}
				{/if}
			</div>
		</div>

		{#if check_is_connected && !walletContext.connected}
			<!--<ConnectionRequired />-->
			<div class="flex justify-center items-center h-64">
				<div class="grid grid-rows-2">
					<!-- Your centered content -->
					<p>Connection is required to access this page</p>
					<div class="flex justify-center items-center">
						<SideMenuConnection />
					</div>
				</div>
			</div>
		{:else}
			{@render children()}
		{/if}
	</div>
</div>
