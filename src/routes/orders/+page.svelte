<script lang="ts">
	import OrderList from "./OrderList.svelte";
	import type { PageData } from "./$types";
	import LinkButton from "$lib/components/LinkButton.svelte";
	import { Tab, TabGroup } from "@skeletonlabs/skeleton";
	import { writable, type Writable } from "svelte/store";

	export let data: PageData;

	const tabSet: Writable<number> = writable(0);
</script>

<h1>
	{data.user.type === "NORMAL" ? "My active orders" : "All active orders"}
</h1>

<TabGroup>
	<Tab bind:group={$tabSet} value={0} name="Active">Active</Tab>
	<Tab bind:group={$tabSet} value={1} name="Inactive">Inactive</Tab>

	<svelte:fragment slot="panel">
		<OrderList {data} />
	</svelte:fragment>
</TabGroup>
