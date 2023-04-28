<script lang="ts">
	import { invalidate } from "$app/navigation";
	import { page } from "$app/stores";
	import { UserType } from "$lib/UserType";
	import LinkButton from "$lib/components/LinkButton.svelte";
	import { tAuthSafe } from "$lib/trpc-client/autoRedirect";
	import { ListBox, ListBoxItem, popup } from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";

	export let data: PageData;

	function updateStatus(to: "DELIVERED" | "RETURNED") {
		tAuthSafe($page, async (trpc) => {
			const res = await trpc.orders.updateOrder.mutate({
				orderId: data.order.id,
				newState: to === "DELIVERED" ? "delivered" : "returned",
			});

			if (res.isError) console.error(res.message);
			else await invalidate("app:order");
		});
	}
</script>

<div>
	<LinkButton href="/../" relative>Go back</LinkButton>

	<h2 class="mt-4">
		Order #{data.order.id}
		<span class="float-right">
			{#if data.user.type >= UserType.TEACHER && !data.order.isReturned}
				<button
					class="btn variant-filled-secondary"
					use:popup={{
						event: "focus-click",
						target: "order-status",
						placement: "bottom",
						closeQuery: ".listbox-item",
					}}
				>
					{data.order.isDelivered
						? "DELIVERED"
						: data.order.isReserved
						? "RESERVED"
						: data.order.isReturned
						? "RETURNED"
						: "STATUS MISSING"}
				</button>

				<div
					class="card w-max shadow-2xl block z-10 text-lg variant-glass-secondary"
					data-popup="order-status"
				>
					<ListBox rounded="rounded-none">
						{#if data.order.isReserved}
							<ListBoxItem
								group={undefined}
								name="RETURNED"
								value="RETURNED"
								class="duration-200"
								on:click={() => updateStatus("DELIVERED")}
							>
								DELIVERED
							</ListBoxItem>
						{/if}
						<ListBoxItem
							group={undefined}
							name="RETURNED"
							value="RETURNED"
							class="duration-200"
							on:click={() => updateStatus("RETURNED")}
						>
							RETURNED
						</ListBoxItem>
					</ListBox>
				</div>
			{:else}
				<span class="opacity-70"
					>{data.order.isDelivered
						? "DELIVERED"
						: data.order.isReserved
						? "RESERVED"
						: data.order.isReturned
						? "RETURNED"
						: "STATUS MISSING"}</span
				>
			{/if}
		</span>
	</h2>

	<div class="card p-4 mt-6">
		<h3>
			{data.order.Device.Type.name}
			<span class="opacity-70">ID: {data.order.Device.id}</span>
		</h3>

		<ul class="list mt-2">
			{#each data.order.Addons as addon}
				<li class="card !pl-4 !pr-4">
					<span class="flex-auto">{addon.Type.name}</span>
					<span class="opacity-70 float-right">ID: {addon.id}</span>
				</li>
			{:else}
				<li class="card">No addons</li>
			{/each}
		</ul>
	</div>
</div>
