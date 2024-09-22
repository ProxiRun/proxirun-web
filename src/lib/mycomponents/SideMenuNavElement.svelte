<script lang="ts">
    import { page } from "$app/stores";
    import type { Snippet } from 'svelte';


    //let {label, target, icon}: {label: string, target:string, icon:Snippet} = $props();
    let {label, target, children}: {label: string, target:string, children:Snippet} = $props();

    let is_active = $derived(target === $page.url.pathname);

</script>

<span class="relative ">
    {#if is_active}
    <span
        class="absolute inset-y-2 -left-4 w-0.5 rounded-full  bg-white"
        style="transform: none; transform-origin: 50% 50% 0px;"
    ></span>
    {/if}

    <a
        class="hover:bg-zinc-800 rounded-lg flex items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-lg  sm:py-2 sm:text-sm/5 data-[slot=icon]:*:size-6 data-[slot=icon]:*:shrink-0 data-[slot=icon]:*:fill-zinc-500 sm:data-[slot=icon]:*:size-5 data-[slot=icon]:last:*:ml-auto data-[slot=icon]:last:*:size-5 sm:data-[slot=icon]:last:*:size-4 data-[slot=avatar]:*:-m-0.5 data-[slot=avatar]:*:size-7 data-[slot=avatar]:*:[--ring-opacity:10%] sm:data-[slot=avatar]:*:size-6 data-[hover]:bg-zinc-950/5 data-[slot=icon]:*:data-[hover]:fill-zinc-950 data-[active]:bg-zinc-950/5 data-[slot=icon]:*:data-[active]:fill-zinc-950 data-[slot=icon]:*:data-[current]:fill-zinc-950 text-white data-[slot=icon]:*:fill-zinc-400 data-[hover]:bg-white/5 data-[slot=icon]:*:data-[hover]:fill-white data-[active]:bg-white/5 data-[slot=icon]:*:data-[active]:fill-white data-[slot=icon]:*:data-[current]:fill-white keychainify-checked"
        type="button"
        data-headlessui-state
        href={target}
    >
    <span class="{is_active ? '' : 'text-gray-400'}  text-lg" >
        {@render children()}

    </span>
        <span
            class="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
            aria-hidden="true"
        ></span>
        <span class="truncate text-base font-normal	">{label}</span>
    </a></span>