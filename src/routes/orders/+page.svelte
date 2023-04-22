<script lang="ts">
	import OrderList from "./OrderList.svelte";
	import type { PageData } from "./$types";
	import LinkButton from "$lib/components/LinkButton.svelte";

	export let data: PageData;
</script>

<h1 class="text-lg mb-4">
	{data.userType === "NORMAL" ? "My active orders" : "All active orders"}
</h1>
<LinkButton href="/archive" relative>View inactive orders</LinkButton>

<OrderList {data} />
