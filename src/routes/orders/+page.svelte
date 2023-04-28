<script lang="ts">
	import OrderList from "./OrderList.svelte";
	import type { PageData } from "./$types";
	import { Tab, TabGroup } from "@skeletonlabs/skeleton";
	import { orderTab } from "$lib/stores/orderTab";
	import { UserType } from "$lib/UserType";

	export let data: PageData;
</script>

<h1 class="text-lg mb-4">
	{data.user.type === UserType.NORMAL
		? "My active orders"
		: "All active orders"}
</h1>

<TabGroup>
	<Tab bind:group={$orderTab} value={"ACTIVE"} name="Active">Active</Tab>
	<Tab bind:group={$orderTab} value={"INACTIVE"} name="Inactive">Inactive</Tab
	>

	<svelte:fragment slot="panel">
		<OrderList
			orders={$orderTab === "ACTIVE"
				? data.activeOrders
				: data.inactiveOrders}
		/>
	</svelte:fragment>
</TabGroup>
