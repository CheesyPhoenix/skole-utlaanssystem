<script lang="ts">
	import type { PageData } from "./$types";

	export let orders: PageData["activeOrders"] | PageData["inactiveOrders"];
</script>

<div class="m-4">
	{#each orders as order}
		<a href="/orders/{order.id}" class="card card-hover block p-4 mb-2">
			<div>
				<p class="opacity-70">
					#{order.id} - {order.User.name}
					<span class="opacity-70 float-right"
						>{order.isDelivered
							? "DELIVERED"
							: order.isReserved
							? "RESERVED"
							: order.isReturned
							? "RETURNED"
							: "STATUS MISSING"}</span
					>
				</p>
				<p class="font-semibold">
					{order.Device.Type.name}
				</p>
				<ul class="ml-2">
					{#each order.Addons as addon}
						<li class="opacity-70 list-disc list-inside">
							{addon.Type.name}
						</li>
					{/each}
				</ul>
			</div>
		</a>
	{:else}
		<p>No orders found</p>
	{/each}
</div>
