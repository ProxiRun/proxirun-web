<script lang="ts">
	import PageWrapper from '$lib/mycomponents/PageWrapper.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import Input from '$lib/components/ui/input/input.svelte';
	import type { TextModelProps } from '$lib/ModelProps/TextModelProps';

	let { model_prop_input = $bindable() }: { model_prop_input: TextModelProps } = $props();
</script>

<Card.Root class="bg-zync-900 text-white border-0">
	<Card.Header>
		<Card.Title>Model Inputs</Card.Title>
		<Card.Description
			>Provide the inputs needed for the worker to process your task</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-6">
			<div class="grid gap-3">
				<Label for="name">System Prompt</Label>
				<Textarea
					id="description"
					class="text-black min-h-32"
					bind:value={model_prop_input.system_prompt}
				/>
			</div>
			<div class="grid gap-3">
				<Label for="description">User Prompt</Label>
				<Textarea
					id="description"
					class="text-black min-h-32"
					bind:value={model_prop_input.user_prompt}
				/>
			</div>
		</div>
	</Card.Content>
</Card.Root>
