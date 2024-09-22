<script lang="ts">
	import { AuctionStatus, AuctionStatusUtils } from '$lib/ContractTypes/ContractEnums';

	let { status }: { status: AuctionStatus } = $props();

	/*
    let pill_color = $derived.by(() => {
            switch (status) {
                case SubmissionStatus.InAuction:{
                    return "blue-800";
                }
                case SubmissionStatus.Processing: {
                    return "blue-800";

                }
                case SubmissionStatus.Success:{
                    return "blue-800";

                }
                case SubmissionStatus.Fail:{
                    return "blue-800";
                }
                default:
                    return "purple-800";
            }
        }
    );
    */

	let pill_color = $state('');
	$effect(() => {
		switch (status) {
			case AuctionStatus.InAuction:
				pill_color = 'bg-blue-800';
				break;
			case AuctionStatus.Processing:
				pill_color = 'bg-yellow-800';
				break;
			case AuctionStatus.Success:
				pill_color = 'bg-green-800';
				break;
			case AuctionStatus.Fail:
				pill_color = 'bg-red-800';
				break;
			default:
				pill_color = 'bg-purple-800';
				break;
		}
	});
</script>

<!--<div class="border-2 border-zinc-800 bg-zinc-800 rounded-lg p-2">-->
<div class="p-2">
	<span class="flex items-center justify-center">
		<div class="flex p-1 h-1 {pill_color} rounded-full"></div>
		<div class="flex-1 pl-4">{AuctionStatusUtils.to_string(status)}</div>
	</span>
</div>