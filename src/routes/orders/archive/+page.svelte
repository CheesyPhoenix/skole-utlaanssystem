<script lang="ts">
	import { UserType } from "$lib/UserType";
	import LinkButton from "$lib/components/LinkButton.svelte";
	import OrderList from "../OrderList.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<h1 class="text-lg mb-4">
	{data.user.type === UserType.NORMAL
		? "My inactive orders"
		: "All active orders"}
</h1>
<LinkButton href="/../" relative>View active orders</LinkButton>

<OrderList {data} />
