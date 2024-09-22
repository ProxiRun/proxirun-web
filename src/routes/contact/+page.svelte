<script lang="ts">
	import PageWrapper from '$lib/mycomponents/PageWrapper.svelte';

	import * as Card from '$lib/components/ui/card/';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';

	import { toast } from 'svelte-sonner';

	let contact_data = $state({
		name: '',
		email: '',
		topic: '',
		message: ''
	});

	async function send() {
		// send message
		const response = await fetch('/api/contact', {
			method: 'POST',
			body: JSON.stringify(contact_data),
			headers: {
				'content-type': 'application/json'
			}
		});

		const resp_success: boolean = await response.json();
		// clear content

		// pop up
		if (resp_success) {
			toast.success('Your message has been sent', {
				description: "Thank you for reaching out, we'll be in touch!"
			});
		} else {
			toast.error('Something went wrong', {
				description: 'Please try again later'
			});
		}
	}
</script>

<PageWrapper title="Contact" check_is_connected={false} controls={null}>
	<Card.Root class="p-0 border-0 pt-8 bg-zinc-900">
		<!--
		<Card.Header class="p-0">
			<Card.Title >Product Details</Card.Title>
			<Card.Description>Lipsum dolor sit amet, consectetur adipiscing elit</Card.Description>
		</Card.Header>
	-->
		<Card.Content class="p-0 bg-zinc-900">
			<div class="grid gap-6">
				<div class="grid gap-3">
					<Label for="name" class="text-white">Name</Label>
					<Input id="name" type="text" class="w-full" bind:value={contact_data.name} />
				</div>
				<div class="grid gap-3">
					<Label for="name" class="text-white">Email</Label>
					<Input id="name" type="text" class="w-full" bind:value={contact_data.email} />
				</div>
				<div class="grid gap-3">
					<Label for="name" class="text-white">Topic</Label>
					<Input id="name" type="text" class="w-full" bind:value={contact_data.topic} />
				</div>
				<div class="grid gap-3">
					<Label for="description" class="text-white">Message</Label>
					<Textarea id="description" class="min-h-32" bind:value={contact_data.message} />
				</div>
				<div class="grid gap-3 justify-end">
					<Button variant="outline" class="w-64" onclick={() => send()}>Send</Button>
				</div>
			</div>
		</Card.Content>
	</Card.Root>
</PageWrapper>
