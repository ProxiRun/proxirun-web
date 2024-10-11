<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	import BrainCog from '~icons/lucide/brain-cog';
	import VenetianMask from '~icons/lucide/venetian-mask';
	import Wallpaper from '~icons/lucide/wallpaper';

	import { toast } from 'svelte-sonner';



	let subscription_email = $state("");
	async function subscribe() {
		const response = await fetch('/api/subscribe', {
			method: 'POST',
			body: JSON.stringify({email: subscription_email}),
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

<div class="py-16 mx-auto max-w-6xl overflow-y-clip">
	<div class="grid grid-flow-row gap-14">
		<div class="w-full text-zinc-200">
			<div class="max-w-3xl">
				<h1
					class="font-display text-7xl font-medium tracking-tight text-zinc-200 [text-wrap:balance]"
				>
					ProxiRun
				</h1>
				<h2 class="font-display text-3xl font-medium text-zinc-200 [text-wrap:balance] pb-4">
					The Decentralized Compute Marketplace
				</h2>
				<p class="text-xl text-zinc-400">
					Unlock the Power of Global Compute for Machine Learning & Zero Knowledge Workloads
				</p>
			</div>
		</div>

		<div class="w-full pt-16">
			<div class="max-w-2xl pb-8">
				<div class="max-w-2xl">
					<h2>
						<span
							class="block font-display tracking-tight [text-wrap:balance] text-4xl font-medium text-zinc-200"
							>Harnessing technology for a brighter future</span
						>
					</h2>
					<div class="pt-6 text-xl text-zinc-400">
						<p>
							"We believe technology is the answer to the world’s greatest challenges. It’s also the
							cause, so we find ourselves in bit of a catch 22 situation."
						</p>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-3 gap-8 ">
				<div class="flex">
					<article
						class=" flex w-full flex-col rounded-3xl ring-neutral-950/5 transition hover:bg-zinc-800 sm:p-8"
					>
						<span class="flex flex-row gap-x-2 text-sm text-zinc-200 items-center">
							<Wallpaper class="h-8 w-8" />
							<span class="font-display text-2xl font-semibold text-zinc-200">Generative AI</span>
						</span>
						<p class="p-4 text-base text-zinc-400">
							Offload intensive ML training tasks to a global network of compute providers, reducing
							cost and increasing efficiency.
						</p>
					</article>
				</div>
				<div class="flex">
					<article
						class="relative flex w-full flex-col rounded-3xl ring-neutral-950/5 transition hover:bg-zinc-800 sm:p-8"
					>
						<span class="flex flex-row gap-x-2 text-sm text-zinc-200 items-center">
							<VenetianMask class="h-8 w-8" />
							<span class="font-display text-2xl font-semibold text-zinc-200"
								>Zero-Knowledge Proofs</span
							>
						</span>
						<p class="p-4 text-base text-zinc-400">
							Need high assurance cryptographic proof calculations? Leverage the ProxiRun network to
							get it done fast and securely.
						</p>
					</article>
				</div>
				<div class="flex" style="opacity: 1; transform: none;">
					<article
						class="relative flex w-full flex-col rounded-3xl ring-neutral-950/5 transition hover:bg-zinc-800 sm:p-8"
					>
						<span class="flex flex-row gap-x-2 text-sm text-zinc-200 items-center">
							<BrainCog class="h-8 w-8" />
							<span class="font-display text-2xl font-semibold text-zinc-200"
								>General Computation</span
							>
						</span>
						<p class="p-4 text-base text-zinc-400">
							Offload intensive ML training tasks to a global network of compute providers, reducing
							cost and increasing efficiency.
						</p>
					</article>
				</div>
			</div>
		</div>

		<div class="">
			<div class="">
				<div class="max-w-2xl" style="">
					<h2>
						<span class=" block font-display text-base font-semibold text-zinc-200">Services</span
						><span class="sr-only"> - </span><span
							class="block font-display tracking-tight [text-wrap:balance] text-4xl font-medium sm:text-5xl text-zinc-200"
							>We help you identify, explore and respond to new opportunities.</span
						>
					</h2>
					<div class="p-6 text-xl text-zinc-400">
						<p>
							As long as those opportunities involve giving us money to re-purpose old projects — we
							can come up with an endless number of those.
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="">
			<ul role="list" class="text-base text-zinc-400">
				<li class="">
					<div>
						<div class="text-zinc-400 pt-10">
							<strong class="font-semibold text-zinc-200">Machine Learning Model Training</strong> Offload
							intensive ML training tasks to a global network of compute providers, reducing cost and
							increasing efficiency.
						</div>
					</div>
				</li>
				<li class="">
					<div>
						<div class="text-zinc-400">
							<strong class="font-semibold text-zinc-200"
								>Zero Knowledge Proof Verification
							</strong> Need high assurance cryptographic proof calculations? Leverage the ProxiRun network
							to get it done fast and securely.
						</div>
					</div>
				</li>
				<li class="">
					<div>
						<div class="text-zinc-400">
							<strong class="font-semibold text-zinc-200"
								>Decentralized Compute for AI Research
							</strong> Need high assurance cryptographic proof calculations? Leverage the ProxiRun network
							to get it done fast and securely.
						</div>
					</div>
				</li>
			</ul>
		</div>

		<div class="">
			<div class="">
				<div class="rounded-[5em] bg-neutral-950 p-20 py-20">
					<div class="">
						<div class="max-w-xl">
							<h2
								class="font-display text-3xl font-medium text-white [text-wrap:balance] pb-8"
							>
								Stay Connected
							</h2>
							<div class="">
								<p class="font-display text-base font-semibold text-white">
									Sign up for our newsletter to get the latest updates on decentralized compute, ML
									advancements, and ZK innovations.
								</p>
							</div>
							<div class=" border-t border-white/10 pt-10 flex flex-row gap-8 justify-end">
								<Input placeholder="Enter your email" class="text-black" bind:value={subscription_email}></Input>
								<Button variant="outline" class="text-black" onclick={subscribe}>Subscribe</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
