<script lang="ts">
	import { goto } from '$app/navigation';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { getWalletContext } from '$lib/context';
	import { AuctionStatus } from '$lib/ContractTypes/ContractEnums';
	import FundsManagementPopup from '$lib/mycomponents/FundsManagementPopup.svelte';
	import PageWrapper from '$lib/mycomponents/PageWrapper.svelte';
	import RequestStatusPill from '$lib/mycomponents/RequestStatusPill.svelte';
	import { onMount } from 'svelte';

	import ChevronRight from '~icons/lucide/chevron-right';

	import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

	import { AUCTION_ABI } from '$lib/auction_abi';
	import { createSurfClient } from '@thalalabs/surf';
	import { aptos_price_to_decimal, normalize_address } from '$lib/aptos_utils';
	import { auction_entry_from_raw, type AuctionEntry, type AuctionEntryRaw, type WorkRequest } from '$lib/ContractTypes/StateTypes';
	import { ddmmyy_date_time_from_micro, hhmmss_date_time_from_micro } from '$lib/DateTimeUtils';

	const config = new AptosConfig({ network: Network.TESTNET });
	const aptos = new Aptos(config);

	const client = createSurfClient(aptos);

	const walletContext = getWalletContext();


	let auction_entries: AuctionEntry[] = $state([])
	let all_ids: number[] = $state([]);
	let all_tasks: string[] = $state([]);

	let nb_requests_successful = $state(0);
	let total_spend = $state(0.0);
	let balance = $state(0.0);

	$effect(async () => {
		if (!walletContext.connected) {
			return;
		}

		// query db to get all auction ids from this address
		let norm_address = normalize_address(walletContext.walletCore?.account?.address!)
		// checking just for this address issue and check if it works
		//norm_address = "0x" + norm_address.slice(3)

		const db_res = await fetch(`/api/user-requests?address=${norm_address}`);
		const all_ids_raw: {request_id: number, task_type: string}[] = (await db_res.json()).reverse();

		const temp_all_ids: number[] = [];
		const temp_all_tasks: string[] = [];

		all_ids_raw.forEach((val) => {
			temp_all_ids.push(val.request_id)
			temp_all_tasks.push(val.task_type)
		})
		all_ids = temp_all_ids;
		all_tasks = temp_all_tasks;

		// create a batch query on contract to get all auctions data
		const [temp]: [AuctionEntryRaw[]] = await client.useABI(AUCTION_ABI).view.get_batch_auction({
			functionArguments: [all_ids],
			typeArguments: []
			//ledgerVersion: '562606728', // ledger_version is optional
		});

		const temp_auctions: AuctionEntry[] = [];
		temp.forEach((e) => temp_auctions.push(
			auction_entry_from_raw(e)
		));


		auction_entries = temp_auctions;
		let summed = 0;
		let summed_spend = 0.0;
		temp_auctions.forEach((auction) => {
			if (auction.status == AuctionStatus.Success) {
				summed += 1;
				summed_spend += auction.winner?.price!;
			}
		})

		nb_requests_successful = summed;
		total_spend = summed_spend;

		const [user_balance] = await client.useABI(AUCTION_ABI).view.get_user_balance({
			functionArguments: [walletContext.walletCore?.account?.address!],
			typeArguments: []
			//ledgerVersion: '562606728', // ledger_version is optional
		});
		balance = Number(user_balance.available);


	});
</script>

{#snippet controls()}
	<FundsManagementPopup />
{/snippet}

<PageWrapper title="Overview" check_is_connected={true} {controls}>
	<div class="mt-4 grid gap-8 sm:grid-cols-4 xl:grid-cols-4">
		<div>
			<hr role="presentation" class="w-full border-t border-zinc-950/10 border-white/10" />
			<div class="mt-6 text-lg/6 font-medium sm:text-sm/6">Work Requests</div>
			<div class="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{all_ids.length}</div>
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
			<div class="mt-6 text-lg/6 font-medium sm:text-sm/6">Successful Requests</div>
			<div class="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{nb_requests_successful}</div>
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
			<div class="mt-6 text-lg/6 font-medium sm:text-sm/6">Total Spend (APT)</div>
			<div class="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{aptos_price_to_decimal(total_spend)}</div>
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
			<div class="mt-6 text-lg/6 font-medium sm:text-sm/6">Funds Available (APT)</div>
			<div class="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{aptos_price_to_decimal(balance)}</div>
			<div class="mt-3 text-sm/6 sm:text-xs/6">
				<span
					class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-pink-400/15 text-pink-700 group-data-[hover]:bg-pink-400/25 bg-pink-400/10 text-pink-400 group-data-[hover]:bg-pink-400/20"
					>-0.5%</span
				>
				<span class="text-zinc-500">from last week</span>
			</div>
		</div>
	</div>
	<div class="w-full border-white/10 mt-8">
		<Card.Root class="text-white bg-zinc-900 border-0 p-0 m-0">
			<Card.Header class="px-0 py-4">
				<Card.Title>Request</Card.Title>
				<Card.Description>Previous work requests you created</Card.Description>
			</Card.Header>
			<Card.Content class="p-0">
				<Table.Root>
					<Table.Header class="p-0">
						<Table.Row class="hover:bg-zinc-800">
							<Table.Head class="p-0">Submission Time</Table.Head>
							<Table.Head class="hidden sm:table-cell ">Type</Table.Head>
							<Table.Head class="hidden sm:table-cell ">Status</Table.Head>
							<Table.Head class="hidden sm:table-cell ">Price Offered</Table.Head>
							<Table.Head class="hidden md:table-cell ">Price Paid</Table.Head>
							<Table.Head class="text-right">Show Output</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each auction_entries as entry, id}
							<Table.Row class="px-0 py-2 hover:bg-zinc-800">
								<Table.Cell class="px-0">
									<div class="font-medium">{ddmmyy_date_time_from_micro(entry.work_request.submission_time)}</div>
									<div class="text-muted-foreground hidden text-sm md:inline">{hhmmss_date_time_from_micro(entry.work_request.submission_time)}</div>
								</Table.Cell>
								<Table.Cell class="hidden sm:table-cell">{all_tasks[id]}<!--{entry.type}--></Table.Cell>

								<Table.Cell class="hidden sm:table-cell">
									<RequestStatusPill status={entry.status} />
									<!--<Badge class="text-xs" variant="secondary">Fulfilled</Badge>-->
								</Table.Cell>
								<Table.Cell class="hidden md:table-cell">{aptos_price_to_decimal(entry.work_request.max_price)}</Table.Cell>
								<Table.Cell class="hidden md:table-cell">
									{#if entry.winner}
										{aptos_price_to_decimal(entry.winner.price)}
									{:else}
										-
									{/if}
								</Table.Cell>

								<Table.Cell class="text-right">
									<ChevronRight
										class="hover:cursor-pointer float-right"
										onclick={() => goto(`/overview/${all_ids[id]}`)}
									/>
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</Card.Content>
		</Card.Root>
	</div>
</PageWrapper>
