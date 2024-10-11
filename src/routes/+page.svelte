<script lang="ts">
	import BrainCog from '~icons/lucide/brain-cog';
	import VenetianMask from '~icons/lucide/venetian-mask';
	import Wallpaper from '~icons/lucide/wallpaper';

	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { Brain, Image, Menu, Github, Twitter } from 'lucide-svelte';
	import {
		Sheet,
		SheetContent,
		SheetDescription,
		SheetHeader,
		SheetTitle,
		SheetTrigger
	} from '$lib/components/ui/sheet';

	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let subscription_email = $state('');
	async function subscribe() {
		const response = await fetch('/api/subscribe', {
			method: 'POST',
			body: JSON.stringify({ email: subscription_email }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const resp_success: boolean = await response.json();
		// clear content

		// pop up
		if (resp_success) {
			toast.success('Subscription successful', {
				description: "Thank you for subscribing, we'll be in touch!"
			});
		} else {
			toast.error('Something went wrong', {
				description: 'Please try again later'
			});
		}
	}
</script>

<main class="flex-grow">
	<section class="bg-background py-20">
		<div class="container mx-auto text-center">
			<h1 class="text-6xl font-bold mb-6 text-black">ProxiRun</h1>
			<h2 class="text-4xl font-bold mb-6 text-black">Decentralized Marketplace for AI Compute</h2>
			<p class="text-xl mb-8 text-zinc-600">
				Harness the power of distributed computing for ML tasks on the Aptos blockchain
			</p>
			<div class="flex justify-center space-x-4">
				<Button size="lg" href="/request">Get Started</Button>
				<Button variant="outline" size="lg" class="text-black" href="https://github.com/ProxiRun"
					>Learn More</Button
				>
			</div>
		</div>
	</section>

	<section id="features" class="py-20 bg-secondary">
		<div class="container mx-auto">
			<h2 class="text-3xl font-bold text-center mb-12 text-black">Features</h2>
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				<div class="bg-background p-6 rounded-lg shadow-md">
					<Brain class="h-12 w-12 mb-4 text-primary" />
					<h3 class="text-xl font-semibold mb-2 text-black">Large Language Models</h3>
					<p class="text-zinc-600">
						Access state-of-the-art language models for various NLP tasks.
					</p>
				</div>
				<div class="bg-background p-6 rounded-lg shadow-md">
					<Image class="h-12 w-12 mb-4 text-primary" />
					<h3 class="text-xl font-semibold mb-2 text-black">Image Generation</h3>
					<p class="text-zinc-600">
						Create stunning visuals with advanced image generation models.
					</p>
				</div>
				<div class="bg-background p-6 rounded-lg shadow-md">
					<svg
						class="h-12 w-12 mb-4 text-primary"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M20 12V8H4v4M20 16v-4H4v4M4 20h16" />
					</svg>
					<h3 class="text-xl font-semibold mb-2 text-black">Decentralized Network</h3>
					<p class="text-zinc-600">Enjoy 100% uptime with our distributed worker network.</p>
				</div>
			</div>
		</div>
	</section>

	<section id="how-it-works" class="py-20">
		<div class="container mx-auto">
			<h2 class="text-3xl font-bold text-center mb-12">How It Works</h2>
			<div class="grid md:grid-cols-4 gap-8">
				<div class="text-center">
					<div
						class="bg-secondary text-secondary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
					>
						1
					</div>
					<h3 class="text-xl font-semibold mb-2">Create a Request</h3>
					<p>Submit your ML task to our decentralized marketplace.</p>
				</div>
				<div class="text-center">
					<div
						class="bg-secondary text-secondary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
					>
						2
					</div>
					<h3 class="text-xl font-semibold mb-2">Workers Bid</h3>
					<p>Multiple workers compete to offer the best price for your task.</p>
				</div>
				<div class="text-center">
					<div
						class="bg-secondary text-secondary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
					>
						3
					</div>
					<h3 class="text-xl font-semibold mb-2">Task Execution</h3>
					<p>The winning worker processes your request efficiently.</p>
				</div>
                <div class="text-center">
					<div
						class="bg-secondary text-secondary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
					>
						4
					</div>
					<h3 class="text-xl font-semibold mb-2">Output Ready</h3>
					<p>Your results are available for immediate use or download.</p>
				</div>
			</div>
		</div>
	</section>

	<section id="email-subscribe" class="py-20 bg-secondary">
		<div class="container mx-auto">
			<h2 class="text-3xl font-bold text-center mb-12 text-black">Stay Connected</h2>
			<div class="text-center pb-8">
				<p class="font-display text-base font-semibold text-zinc-600">
					Sign up for our newsletter to get the latest updates on decentralized compute, ML
					advancements, and ZK innovations.
				</p>
			</div>
			<div class="text-center">
				<div class="flex flex-row gap-8 justify-center">
					<Input
						placeholder="Enter your email"
						class="text-black max-w-[364px]"
						bind:value={subscription_email}
					></Input>
					<Button variant="outline" class="text-black" onclick={subscribe}>Subscribe</Button>
				</div>
			</div>
		</div>
	</section>
</main>

