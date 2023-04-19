<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { tAuthSafe } from "$lib/trpc/autoRedirect";
	import type { PageData } from "./$types";

	export let data: PageData;

	let addonsSelected: number[] = [];

	let errorMessage: string | undefined = undefined;

	async function orderDevice() {
		await tAuthSafe($page, async (trpc) => {
			const order = await trpc.orders.order.mutate({
				deviceId: data.id,
				addons: addonsSelected,
			});

			if (order === null)
				errorMessage =
					"Something went wrong. Might not have found device...";
			else await goto($page.url.origin + "/orders/" + order.id);
		});
	}
</script>

<a href="./" class="block m-2">Oh sh*t, go back</a>

<main class="m-2 max-w-2xl pt-2">
	<h1 class="text-xl font-bold mb-2 inline-block">{data.name}</h1>

	<button
		class="bg-blue-700 hover:bg-blue-600 active:bg-blue-800 p-2 mb-4 rounded-lg inline-block float-right duration-200"
		on:click={orderDevice}
		>Place order for {data.name} with {addonsSelected.length} addons</button
	>

	<hr class="w-full mb-4" />

	{#each data.Addons as addon}
		<button
			class="block p-2 {addonsSelected.includes(addon.id)
				? 'bg-slate-500 hover:bg-slate-400 active:bg-slate-700'
				: 'bg-slate-700 hover:bg-slate-600 active:bg-slate-800'} mb-2 rounded-lg duration-200 w-full text-left"
			on:click={() =>
				addonsSelected.includes(addon.id)
					? (addonsSelected = addonsSelected.filter(
							(x) => x !== addon.id
					  ))
					: (addonsSelected = [...addonsSelected, addon.id])}
			>{addon.name}</button
		>
	{/each}
</main>
