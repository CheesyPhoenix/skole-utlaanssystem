<script lang="ts">
	import { page } from "$app/stores";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<div class="m-4 max-w-2xl">
	{#each data.orders as order}
		<a
			href="{$page.url.pathname}/{order.id}"
			class="block p-2 bg-slate-700 mb-2 rounded-lg hover:bg-slate-600 active:bg-slate-800 duration-200"
		>
			<div>
				<p>
					{order.Device.Type.name}
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
