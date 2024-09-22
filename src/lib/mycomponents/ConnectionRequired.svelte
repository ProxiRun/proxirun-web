<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	import { onDestroy } from 'svelte';

    import {wallet} from "$lib/store.svelte";



	// Function to connect the wallet
	async function connectWallet() {
        /*
		await my_wallet.connect(); // Call the connect method
		// Update the store with the new state
		wallet.set(my_wallet);
        */
        await wallet.connect();
	}

</script>

<div class="flex justify-center items-center h-64">
	<!-- Your centered content -->
	<div class="grid grid-rows-2 gap-8">
		<p>Connection is required to access this page</p>
		<Button variant="outline" class="text-black text-xl" onclick={connectWallet}>Connect</Button>
	</div>
</div>
