<script lang="ts">
	import Chart from 'chart.js/auto';

	import PageWrapper from '$lib/mycomponents/PageWrapper.svelte';
	import { onMount } from 'svelte';

	let canvas;

	onMount(() => {
		const ctx = canvas.getContext('2d');

		const DATA_COUNT = 7;
		const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

		const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
		const data = {
			labels: labels,
			datasets: [
				{
					label: 'Dataset 1',
					data: [1, 2, 3, 4, 5, 6, 7]
					//borderColor: Utils.CHART_COLORS.red,
					//backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
				}
			]
		};

		const config = {
			type: 'line',
			data: data,
			options: {
				responsive: true,
				plugins: {
					legend: {
						display: false,
						position: 'top'
					},
					title: {
						display: false,
						text: 'Chart.js Line Chart'
					}
				}
			}
		};

		new Chart(ctx, config);
	});
</script>

<PageWrapper title="Stats">
    <div class="mt-4 grid gap-8 sm:grid-cols-3 xl:grid-cols-3">
        <div>
            <hr role="presentation" class="w-full border-t border-zinc-950/10 border-white/10" />
            <div class="mt-6 text-lg/6 font-medium sm:text-sm/6">Users</div>
            <div class="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">12</div>
            <div class="mt-3 text-sm/6 sm:text-xs/6">
                <span
                    class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-pink-400/15 text-pink-700 group-data-[hover]:bg-pink-400/25 bg-pink-400/10 text-pink-400 group-data-[hover]:bg-pink-400/20"
                    >-0.5%</span
                >
                <span class="text-zinc-500">from last week</span>
            </div>
        </div>

        <div>
            <hr role="presentation" class="w-full border-t border-zinc-950/10 border-white/10" />
            <div class="mt-6 text-lg/6 font-medium sm:text-sm/6">Providers</div>
            <div class="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">12</div>
            <div class="mt-3 text-sm/6 sm:text-xs/6">
                <span
                    class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-pink-400/15 text-pink-700 group-data-[hover]:bg-pink-400/25 bg-pink-400/10 text-pink-400 group-data-[hover]:bg-pink-400/20"
                    >-0.5%</span
                >
                <span class="text-zinc-500">from last week</span>
            </div>
        </div>

        <div>
            <hr role="presentation" class="w-full border-t border-zinc-950/10 border-white/10" />
            <div class="mt-6 text-lg/6 font-medium sm:text-sm/6">Providers Revenue</div>
            <div class="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">$455</div>
            <div class="mt-3 text-sm/6 sm:text-xs/6">
                <span
                    class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-pink-400/15 text-pink-700 group-data-[hover]:bg-pink-400/25 bg-pink-400/10 text-pink-400 group-data-[hover]:bg-pink-400/20"
                    >-0.5%</span
                >
                <span class="text-zinc-500">from last week</span>
            </div>
        </div>
        <div>
            <hr role="presentation" class="w-full border-t border-zinc-950/10 border-white/10" />
            <div class="mt-6 text-lg/6 font-medium sm:text-sm/6">Work Requests Submitted</div>
            <div class="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">42</div>
            <div class="mt-3 text-sm/6 sm:text-xs/6">
                <span
                    class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-pink-400/15 text-pink-700 group-data-[hover]:bg-pink-400/25 bg-pink-400/10 text-pink-400 group-data-[hover]:bg-pink-400/20"
                    >-0.5%</span
                >
                <span class="text-zinc-500">from last week</span>
            </div>
        </div>
        <div>
            <hr role="presentation" class="w-full border-t border-zinc-950/10 border-white/10" />
            <div class="mt-6 text-lg/6 font-medium sm:text-sm/6">Successful Auctions</div>
            <div class="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">36</div>
            <div class="mt-3 text-sm/6 sm:text-xs/6">
                <span
                    class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-pink-400/15 text-pink-700 group-data-[hover]:bg-pink-400/25 bg-pink-400/10 text-pink-400 group-data-[hover]:bg-pink-400/20"
                    >-0.5%</span
                >
                <span class="text-zinc-500">from last week</span>
            </div>
        </div>
        <div>
            <hr role="presentation" class="w-full border-t border-zinc-950/10 border-white/10" />
            <div class="mt-6 text-lg/6 font-medium sm:text-sm/6">Failed Auctions</div>
            <div class="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">6</div>
            <div class="mt-3 text-sm/6 sm:text-xs/6">
                <span
                    class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-green-400/15 text-green-700 group-data-[hover]:bg-pink-400/25 bg-green-400/10 text-green-400 group-data-[hover]:bg-pink-400/20"
                    >0.5%</span
                >
                <span class="text-zinc-500">from last week</span>
            </div>
        </div>
    </div>
    <div class="w-full border-t border-zinc-950/10 border-white/10 mt-8 py-8">
        <div class="w-full">
            <div class="flex flex-row">
                <div class="flex-1">
                    <canvas bind:this={canvas}></canvas>
                </div>
                <div class="p-4"></div>
                <div class="min-w-[299px] p-8 border-2 border-red-800">Controls</div>
            </div>
        </div>
    </div>
</PageWrapper>

<!--
<div
	class="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 lg:bg-zinc-900 lg:ring-white/10 max-h-screen"
>
	<div class="mx-auto max-w-6xl">
		<div class="flex flex-wrap items-end justify-between gap-4">
			<div class="flex flex-wrap items-end justify-between gap-4">
				<h1 class="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 text-white">
					Protocol Stats
				</h1>
			</div>
			<div>Dropdown to select window for stats (Last Week / Last Month)</div>
		</div>
		<div class="mt-4 grid gap-8 sm:grid-cols-3 xl:grid-cols-3">
			<div>
				<hr role="presentation" class="w-full border-t border-zinc-950/10 border-white/10" />
				<div class="mt-6 text-lg/6 font-medium sm:text-sm/6">Users</div>
				<div class="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">12</div>
				<div class="mt-3 text-sm/6 sm:text-xs/6">
					<span
						class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-pink-400/15 text-pink-700 group-data-[hover]:bg-pink-400/25 bg-pink-400/10 text-pink-400 group-data-[hover]:bg-pink-400/20"
						>-0.5%</span
					>
					<span class="text-zinc-500">from last week</span>
				</div>
			</div>

			<div>
				<hr role="presentation" class="w-full border-t border-zinc-950/10 border-white/10" />
				<div class="mt-6 text-lg/6 font-medium sm:text-sm/6">Providers</div>
				<div class="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">12</div>
				<div class="mt-3 text-sm/6 sm:text-xs/6">
					<span
						class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-pink-400/15 text-pink-700 group-data-[hover]:bg-pink-400/25 bg-pink-400/10 text-pink-400 group-data-[hover]:bg-pink-400/20"
						>-0.5%</span
					>
					<span class="text-zinc-500">from last week</span>
				</div>
			</div>

			<div>
				<hr role="presentation" class="w-full border-t border-zinc-950/10 border-white/10" />
				<div class="mt-6 text-lg/6 font-medium sm:text-sm/6">Providers Revenue</div>
				<div class="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">$455</div>
				<div class="mt-3 text-sm/6 sm:text-xs/6">
					<span
						class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-pink-400/15 text-pink-700 group-data-[hover]:bg-pink-400/25 bg-pink-400/10 text-pink-400 group-data-[hover]:bg-pink-400/20"
						>-0.5%</span
					>
					<span class="text-zinc-500">from last week</span>
				</div>
			</div>
			<div>
				<hr role="presentation" class="w-full border-t border-zinc-950/10 border-white/10" />
				<div class="mt-6 text-lg/6 font-medium sm:text-sm/6">Work Requests Submitted</div>
				<div class="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">42</div>
				<div class="mt-3 text-sm/6 sm:text-xs/6">
					<span
						class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-pink-400/15 text-pink-700 group-data-[hover]:bg-pink-400/25 bg-pink-400/10 text-pink-400 group-data-[hover]:bg-pink-400/20"
						>-0.5%</span
					>
					<span class="text-zinc-500">from last week</span>
				</div>
			</div>
			<div>
				<hr role="presentation" class="w-full border-t border-zinc-950/10 border-white/10" />
				<div class="mt-6 text-lg/6 font-medium sm:text-sm/6">Successful Auctions</div>
				<div class="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">36</div>
				<div class="mt-3 text-sm/6 sm:text-xs/6">
					<span
						class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-pink-400/15 text-pink-700 group-data-[hover]:bg-pink-400/25 bg-pink-400/10 text-pink-400 group-data-[hover]:bg-pink-400/20"
						>-0.5%</span
					>
					<span class="text-zinc-500">from last week</span>
				</div>
			</div>
			<div>
				<hr role="presentation" class="w-full border-t border-zinc-950/10 border-white/10" />
				<div class="mt-6 text-lg/6 font-medium sm:text-sm/6">Failed Auctions</div>
				<div class="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">6</div>
				<div class="mt-3 text-sm/6 sm:text-xs/6">
					<span
						class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-green-400/15 text-green-700 group-data-[hover]:bg-pink-400/25 bg-green-400/10 text-green-400 group-data-[hover]:bg-pink-400/20"
						>0.5%</span
					>
					<span class="text-zinc-500">from last week</span>
				</div>
			</div>
		</div>
		<div class="w-full border-t border-zinc-950/10 border-white/10 mt-8 py-8">
			<div class="w-full">
				<div class="flex flex-row">
					<div class="flex-1">
						<canvas bind:this={canvas}></canvas>
					</div>
					<div class="p-4"></div>
					<div class="min-w-[299px] p-8 border-2 border-red-800">Controls</div>
				</div>
			</div>
		</div>
	</div>
</div>
-->