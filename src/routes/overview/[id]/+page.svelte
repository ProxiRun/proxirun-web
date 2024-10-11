<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { Badge } from '$lib/components/ui/badge';

	import DollarSign from '~icons/lucide/dollar-sign';
	import Clock from '~icons/lucide/clock';
	import Check from '~icons/lucide/check';
	import MonitorCheck from '~icons/lucide/monitor-check';
	import SquareUser from '~icons/lucide/square-user';
	import TicketX from '~icons/lucide/ticket-x';

	import PageWrapper from '$lib/mycomponents/PageWrapper.svelte';
	import type { AuctionEntry } from '$lib/ContractTypes/StateTypes.js';
	import { AuctionStatus, AuctionStatusUtils } from '$lib/ContractTypes/ContractEnums.js';
	import { aptos_price_to_decimal } from '$lib/aptos_utils';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ORCHESTRATOR_URL } from '$lib/constants';

	function formatted_datetime_from_micro(timestamp: number): string {
		const temp = new Date(timestamp / 1000);
		return `${temp.getDate().toString().padStart(2, '0')}/${(temp.getMonth() + 1).toString().padStart(2, '0')}/${temp.getFullYear()} ${temp.getHours().toString().padStart(2, '0')}:${temp.getMinutes().toString().padStart(2, '0')}:${temp.getSeconds().toString().padStart(2, '0')}`;
	}

	//let {id} = $props();

	let data = $props(); // data injected from the load function
	const {
		id,
		auction_data,
		payload_data
	}: { id: string; auction_data: AuctionEntry | null; payload_data: any } = data.data;
	//$inspect(payload_data);

	let text_output = $state(null);

	async function download_completion() {
		switch (payload_data.task_type) {
			case 'Text Generation':
				let res = await fetch(`${ORCHESTRATOR_URL}/output/${id}`);
				text_output = (await res.json()).content;
				break;
			case 'Image Generation':
			case 'Voice Generation':
				let res_file = await fetch(`${ORCHESTRATOR_URL}/output/${id}`);
				const blob = await res_file.blob();
				const url = URL.createObjectURL(blob);
				window.open(url);
				break;
			default:
				console.error('Unsupported task type: ' + payload_data.task_type);
		}
	}
</script>

<PageWrapper title="Request Overview" check_is_connected={false} controls={null}>
	{#if auction_data}
		<div class="flex flex-col gap-8">
			<div class="grid grid-cols-4 gap-8">
				<div class="col-span-3">
					<Card.Root class="bg-zinc-900 text-white border-zinc-800 p-0">
						<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
							<Card.Title class="text-sm font-medium">Requester</Card.Title>
							<SquareUser class="text-muted-foreground h-4 w-4" />
						</Card.Header>
						<Card.Content>
							<div class="text-xl font-semibold">{auction_data.work_request.requester}</div>
						</Card.Content>
					</Card.Root>
				</div>
				<div class="cols-span-1">
					<Card.Root class="bg-zinc-900 text-white border-zinc-800 p-0">
						<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
							<Card.Title class="text-sm font-medium">Request Id</Card.Title>
							<Clock class="text-muted-foreground h-4 w-4" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">{id}</div>
						</Card.Content>
					</Card.Root>
				</div>
			</div>
			<div class="grid grid-cols-4 gap-8">
				<Card.Root class="bg-zinc-900 text-white border-zinc-800 p-0">
					<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
						<Card.Title class="text-sm font-medium">Submission Time</Card.Title>
						<Clock class="text-muted-foreground h-4 w-4" />
					</Card.Header>
					<Card.Content>
						<div class="text-2xl font-bold">
							{formatted_datetime_from_micro(auction_data.work_request.submission_time)}
						</div>
					</Card.Content>
				</Card.Root>
				<Card.Root class="bg-zinc-900 text-white border-zinc-800 p-0">
					<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
						<Card.Title class="text-sm font-medium">Budget</Card.Title>
						<DollarSign class="text-muted-foreground h-4 w-4" />
					</Card.Header>
					<Card.Content>
						<div class="text-2xl font-bold">
							{aptos_price_to_decimal(auction_data.work_request.max_price)} APT
						</div>
					</Card.Content>
				</Card.Root>
				<Card.Root class="bg-zinc-900 text-white border-zinc-800 p-0">
					<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
						<Card.Title class="text-sm font-medium">Cost</Card.Title>
						<DollarSign class="text-muted-foreground h-4 w-4" />
					</Card.Header>
					<Card.Content>
						{#if auction_data.winner}
							<div class="text-2xl font-bold">
								{aptos_price_to_decimal(auction_data.winner.price)} APT
							</div>
						{:else}
							<div class="text-2xl font-bold">- APT</div>
						{/if}
					</Card.Content>
				</Card.Root>
				<Card.Root class="p-0 bg-zinc-900 text-white border-zinc-800 p-0">
					<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
						<Card.Title class="text-sm font-medium">Status</Card.Title>
						<MonitorCheck class="text-muted-foreground h-4 w-4" />
					</Card.Header>
					<Card.Content>
						<div class="text-2xl font-bold">
							{AuctionStatusUtils.to_string(auction_data.status)}
						</div>
					</Card.Content>
				</Card.Root>
			</div>
			<div>
				<Card.Root class="p-0 bg-zinc-900 text-white border-zinc-800 p-0">
					<Card.Header class="px-7">
						<Card.Title>Payload</Card.Title>
						<Card.Description>Payload submitted by the requester</Card.Description>
					</Card.Header>
					<Card.Content>
						{payload_data.data}
					</Card.Content>
				</Card.Root>
			</div>

			{#if auction_data.status === AuctionStatus.Success}
				<div>
					<Card.Root class="p-0 bg-zinc-900 text-white border-zinc-800 p-0">
						<Card.Header class="px-7">
							<Card.Title>Generated Response</Card.Title>
							<Card.Description>The response provided by the worker</Card.Description>
						</Card.Header>
						<Card.Content>
							{#if text_output == null}
								<Button class="text-black " variant="outline" onclick={() => download_completion()}
									>Download</Button
								>
							{:else}
								<p>{text_output}</p>
							{/if}
						</Card.Content>
					</Card.Root>
				</div>
			{/if}

			<div>
				<Card.Root class="p-0 bg-zinc-900 text-white border-zinc-800 p-0">
					<Card.Header class="px-7">
						<Card.Title>Bids</Card.Title>
						<Card.Description>All bids submitted for this work request</Card.Description>
					</Card.Header>
					<Card.Content>
						<Table.Root>
							<Table.Header>
								<Table.Row>
									<Table.Head>Bidder</Table.Head>
									<Table.Head class="hidden sm:table-cell">Price</Table.Head>
									<Table.Head class="hidden sm:table-cell text-right">Auction Winner</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{#each auction_data.bids as bid}
									<Table.Row class="">
										<Table.Cell>
											{bid.bidder}
										</Table.Cell>
										<Table.Cell class="hidden sm:table-cell"
											>{aptos_price_to_decimal(bid.price)}</Table.Cell
										>

										<Table.Cell class="text-right"
											>{#if bid.bidder === auction_data.winner?.bidder && bid.price === auction_data.winner?.price}<Check
													class="float-right"
												/>{/if}</Table.Cell
										>
									</Table.Row>
								{/each}
							</Table.Body>
						</Table.Root>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	{:else}
		<div class="mx-auto max-w-[512px] pt-48">
			<Card.Root class="bg-zinc-900 text-white border-zinc-800 p-0">
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-xl font-semibold">Invalid Id</Card.Title>
					<TicketX class="text-muted-foreground h-8 w-8" />
				</Card.Header>
				<Card.Content>
					<div class="text-medium">No data associated with this id</div>
				</Card.Content>
			</Card.Root>
		</div>
	{/if}
</PageWrapper>
