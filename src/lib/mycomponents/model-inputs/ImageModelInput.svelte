<script lang="ts">
	import PageWrapper from '$lib/mycomponents/PageWrapper.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Table from '$lib/components/ui/table';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import Button from '$lib/components/ui/button/button.svelte';
	import { AspectRatio, type ImageModelProps } from '$lib/ModelProps/ImageModelProps';



	let { model_prop_input = $bindable() }: { model_prop_input: ImageModelProps } = $props();
</script>



<Card.Root class="bg-zync-900 text-white border-0">
    <Card.Header>
        <Card.Title>Model Inputs</Card.Title>
        <Card.Description
            >Provide the inputs needed for the worker to process your task</Card.Description
        >
    </Card.Header>
    <Card.Content class="grid grid-col gap-8">
		<div class="flex flex-row justify-between">
			<div class="grid gap-3">
				<Label for="name">Aspect Ratio</Label>
				<ToggleGroup.Root type="single" bind:value={model_prop_input.aspect_ratio} variant="outline" >
					<ToggleGroup.Item value={AspectRatio.Portrait}>Portrait</ToggleGroup.Item>
					<ToggleGroup.Item value={AspectRatio.Landscape}>Landscape</ToggleGroup.Item>
					<ToggleGroup.Item value={AspectRatio.Square}>Square</ToggleGroup.Item>
				</ToggleGroup.Root>
			</div>

			<div class="grid gap-3">
				<Label for="name">Config Scale</Label>
				<Input type="number" class="text-black" bind:value={model_prop_input.config_scale} />
			</div>

			<div class="grid gap-3">
				<Label for="name">Steps</Label>
				<Input type="number" class="text-black" bind:value={model_prop_input.nb_steps} />
			</div>
		</div>

        <div class="grid gap-6">
            <div class="grid gap-3">
                <Label for="name">Positive Prompt</Label>
                <Textarea
                    id="description"
                    class="text-black min-h-32"
					bind:value={model_prop_input.positive_prompt}
                />            </div>
            <div class="grid gap-3">
                <Label for="description">Negative Prompt</Label>
                <Textarea
                    id="description"
                    class="text-black min-h-32"
					bind:value={model_prop_input.negative_prompt}
                />
            </div>
            
        </div>
    </Card.Content>
</Card.Root>

