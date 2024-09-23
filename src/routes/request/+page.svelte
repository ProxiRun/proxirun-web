<script lang="ts">
	import PageWrapper from '$lib/mycomponents/PageWrapper.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	import { toast } from 'svelte-sonner';


	import TextModelInput from '$lib/mycomponents/model-inputs/TextModelInput.svelte';
	import UnimplementedModelInput from '$lib/mycomponents/model-inputs/UnimplementedModelInput.svelte';
	import ImageModelInput from '$lib/mycomponents/model-inputs/ImageModelInput.svelte';

	import { AVAILABLE_MODELS, TaskType, TaskTypeUtils } from '$lib/mycomponents/task_types';
	import { TextModelPropsUtils, type TextModelProps } from '$lib/ModelProps/TextModelProps';
	import { ImageModelPropsUtils, type ImageModelProps } from '$lib/ModelProps/ImageModelProps';

	import { getWalletContext } from '$lib/context';
	import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

	import { AUCTION_ABI } from '$lib/auction_abi';
	import { createSurfClient } from '@thalalabs/surf';
	import { decimal_to_aptos_price, normalize_address } from '$lib/aptos_utils';
	import { OnNewWorkRequest } from '$lib/ContractTypes/Events';
	import { CONTRACT_ADDRESS, CONTRACT_MODULE } from '$lib/constants';
	import { goto } from '$app/navigation';


	//let task_id = $state(0);
	let model_id = $state(0);

	let task_selected = $state(TaskType.TextGeneration);
	let available_models = $derived.by(() => AVAILABLE_MODELS[task_selected]);

	let model_selected = $derived.by(() => AVAILABLE_MODELS[task_selected][model_id]);

	let model_input_prop: TextModelProps | ImageModelProps = $state(TextModelPropsUtils.default());

	let price = $state(0.01);

	//$inspect(model_input_prop);
	//$inspect(price);

	const walletContext = getWalletContext();

	const config = new AptosConfig({ network: Network.TESTNET });
	const aptos = new Aptos(config);
	const client = createSurfClient(aptos);

	async function submit_request() {
		const response = await walletContext.signAndSubmitTransaction({
			//sender: walletContext.account?.address,
			data: {
				//type: "entry_function_payload",
				function:
					`${CONTRACT_ADDRESS}::${CONTRACT_MODULE}::create_work_request`,
				typeArguments: [],
				functionArguments: [decimal_to_aptos_price(price)]
			}
		});

		try {
			const respo = await aptos.waitForTransaction({ transactionHash: response.hash });

			let target_event: OnNewWorkRequest;

			for (let i = 0; i < respo.events.length; i++) {
				if (
					respo.events[i].type ===
					`${CONTRACT_ADDRESS}::${CONTRACT_MODULE}::OnNewWorkRequest`
				) {
					target_event = OnNewWorkRequest.from_raw(respo.events[i].data);
					break;
				}
			}

			// send payload to server
			const normalized_address = normalize_address(target_event.requester);

			const upload_data = {
				request_id: target_event.request_id,
				requester: normalized_address,
				task_type: TaskTypeUtils.to_string(task_selected),
				model: model_selected,
				data: JSON.stringify(model_input_prop)
			};
			
			const response_db = await fetch('/api/upload-payload', {
				method: 'POST',
				body: JSON.stringify(upload_data),
				headers: {
					'content-type': 'application/json'
				}
			});

			toast.success('Your Request has gone to auction', {
					description: 'Waiting for bids from providers',
					action: {
						label: 'Show',
						onClick: () => goto(`/overview/${target_event.request_id}`)
					}
				})
			
		} catch (error) {
			console.error(error);
		}
	}
</script>

<PageWrapper title="New Request" check_is_connected={true}>
	<div class="grid grid-cols-3 lg:grid-cols-4 gap-8 pt-8">
		<div class="col-span-2 lg:col-span-3">
			{#if task_selected === 'Text Generation'}
				<TextModelInput bind:model_prop_input={model_input_prop} />
			{:else if task_selected === 'Image Generation'}
				<ImageModelInput bind:model_prop_input={model_input_prop} />
			{:else}
				<UnimplementedModelInput />
			{/if}
		</div>

		<div class="col-span-1">
			<Card.Root class="bg-zync-900 text-white border-0">
				<Card.Header>
					<Card.Title>Task Settings</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="grid gap-6">
						<div class="grid gap-3">
							<Label for="status">Type</Label>
							<Select.Root
								selected={task_selected}
								onSelectedChange={(v) => {
									// check if changed task type?
									task_selected = v?.value;
									if (task_selected == TaskType.TextGeneration) {
										model_input_prop = TextModelPropsUtils.default();
									} else {
										model_input_prop = ImageModelPropsUtils.default();
									}

									//model_id = 0;
								}}
								class="text-black"
							>
								<Select.Trigger id="status" aria-label="Select status" class="text-black">
									<Select.Value placeholder="Select a task type" />
								</Select.Trigger>
								<Select.Content class="text-black">
									{#each TaskTypeUtils.to_list() as task_type, task_id}
										<Select.Item
											class="text-black"
											value={task_type}
											label={TaskTypeUtils.to_string(task_type)}
											disabled={task_type == TaskType.VoiceGeneration}
										/>
									{/each}
								</Select.Content>
							</Select.Root>
						</div>
						<div class="grid gap-3">
							<Label for="model">Model</Label>
							<Select.Root
								selected={model_selected}
								onSelectedChange={(v) => {
									//update_model(v.value);
									model_id = v?.value;
								}}
							>
								<Select.Trigger id="model" aria-label="Select model" class="text-black">
									<Select.Value placeholder="Select a model to use" />
								</Select.Trigger>
								<Select.Content class="text-black">
									{#each available_models as model, id}
										<Select.Item value={id} label={model} />
									{/each}
								</Select.Content>
							</Select.Root>
						</div>
						<div class="grid gap-3">
							<Label for="stock-3" class="">Price (APT)</Label>
							<Input id="stock-3" type="number" bind:value={price} class="text-black" />
						</div>
						<div class="grid gap-3">
							<Button class="text-black" variant="outline" onclick={() => submit_request()}
								>Request Execution</Button
							>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</PageWrapper>
