<script>
	import SideMenuConnection from './SideMenuConnection.svelte';
	import SideMenuNavElement from './SideMenuNavElement.svelte';

	import Component from '~icons/lucide/component';

	import { routes } from '$lib/routes';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
</script>

<div class="flex h-full min-h-0 flex-col">
	<div
		class="flex flex-col border-b border-zinc-950/5 p-4 border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5s"
	>
		<Button
			onclick={() => goto('/')}
			class="items-left bg-zinc-950 justify-start hover:bg-zinc-950 pl-2"
		>
			<div class="flex flex-row items-center gap-4 p-2 hover:cursor-pointer" role="button">
				<Component />
				<h2 class="font-semibold text-lg">ProxiRun</h2>
			</div>
		</Button>
	</div>

	<div class="w-full border-t border-zinc-950/10 border-white/10"></div>
	<div class="flex flex-1 flex-col overflow-y-auto mt-8 gap-8">
		<div class="w-full">
			<SideMenuConnection />
		</div>

		<div
			class="flex flex-1 flex-col overflow-y-auto p-4 [&>[data-slot=section]+[data-slot=section]]:mt-8"
		>
			<div class="flex flex-col gap-0.5">
				{#each routes as route, id}
					{#if id == 4}
						<div class="p-4"><Separator /></div>
					{/if}
					<SideMenuNavElement label={route.label} target={route.target}>
						<svelte:component this={route.icon} />
					</SideMenuNavElement>
				{/each}
			</div>
		</div>
	</div>
</div>
