<script lang="ts">
	import LinkButton from "$lib/components/LinkButton.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main class="m-4 pt-2 max-w-2xl">
	<LinkButton href="/../" relative>Go back</LinkButton>

	<h1 class="text-xl mt-4 font-semibold">
		Order #{data.order.id}
		<span class="float-right relative">
			<span class="opacity-70"
				>{data.order.isDelivered
					? "DELIVERED"
					: data.order.isReserved
					? "RESERVED"
					: data.order.isReturned
					? "RETURNED"
					: "STATUS MISSING"}</span
			>
			{#if !data.order.isReturned}
				<div
					class="absolute rounded-lg bg-slate-700 drop-shadow-lg p-2 w-full text-base opacity-100 bg-opacity-100 z-10"
				>
					{#if data.order.isReserved}
						<p class="opacity-70 hover:underline cursor-pointer">
							DELIVERED
						</p>
					{/if}
					<p class="opacity-70 hover:underline cursor-pointer">
						RETURNED
					</p>
				</div>
			{/if}
		</span>
	</h1>

	<h2 class="mt-2 text-lg">
		{data.order.Device.Type.name}
		<span class="opacity-70">ID: {data.order.Device.id}</span>
	</h2>

	<ul class="mt-2">
		{#each data.order.Addons as addon}
			<li
				class="list-disc list-inside p-1 pl-2 pr-2 bg-slate-700 rounded-lg mb-2"
			>
				{addon.Type.name}
				<span class="opacity-70 float-right">ID: {addon.id}</span>
			</li>
		{:else}
			<li class="list-disc list-inside">No addons</li>
		{/each}
	</ul>
</main>
