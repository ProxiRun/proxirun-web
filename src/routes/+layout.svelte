<script>
	import SideMenu from '$lib/mycomponents/SideMenu.svelte';
	import { Toaster } from '$lib/components/ui/sonner';

	import '../app.css';

	import { onNavigate } from '$app/navigation';
	import Provider from '$lib/mycomponents/Provider.svelte';
	import { onMount } from 'svelte';
	import { AptosWalletAdapter } from '$lib/wallet.svelte';
	import { setWalletContext } from '$lib/context';


	const wallet = new AptosWalletAdapter(true);
	setWalletContext(wallet);
	

	function delayNavigation() {
		return new Promise((res) => setTimeout(res, 100));
	}

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

</script>

<svelte:head>
	<title>ProxiRun</title>
	<meta name="description" content="Decentralized Compute Marketplace on Aptos" />
	<meta name="robots" content="noindex nofollow" />
	<html lang="en"></html>
</svelte:head>


<Toaster />

<Provider>
	<div class="flex text-white">
		<div class="flex-1 h-screen max-w-[259px] h-full flex-col bg-zinc-950">
			<SideMenu />
		</div>
		<div class="flex-1 h-screen max-h-screen flex-expand h-full bg-zinc-900 overflow-y-auto">
			<slot />
		</div>
	</div>
</Provider>

<style>
	/*
@keyframes fade-in {
	from {
		opacity: 0;
	}
}

@keyframes fade-out {
	to {
		opacity: 0;
	}
}

@keyframes slide-from-right {
	from {
		transform: translateX(30px);
	}
}

@keyframes slide-to-left {
	to {
		transform: translateX(-30px);
	}
}

:root::view-transition-old(root) {
	animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out, 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
}

:root::view-transition-new(root) {
	animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in, 300ms cubic-bezier(0.4, 0, 0.2, 1) both
			slide-from-right;
}

:root {
    background-color: black;
}
*/
</style>
