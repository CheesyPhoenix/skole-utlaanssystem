<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import LinkButton from "$lib/components/LinkButton.svelte";
	import { tAuthSafe } from "$lib/trpc-client/autoRedirect";
	import type { PageData } from "./$types";

	export let data: PageData;

	let addonsSelected: number[] = [];

	let errorMessage: string | undefined = undefined;

	async function orderDevice() {
		await tAuthSafe($page, async (trpc) => {
			const order = await trpc.orders.order.mutate({
				deviceTypeId: data.deviceType.id,
				addonTypes: addonsSelected,
			});

			if (order === null)
				errorMessage =
					"Something went wrong. Might not have found device...";
			else await goto($page.url.origin + "/orders/" + order.id);
		});
	}
</script>

<main class="m-2 max-w-2xl pt-2">
	<LinkButton href="/../" relative class="mb-4">Go back</LinkButton>

	<br />

	<h1 class="text-xl font-bold mb-2 inline-block">{data.deviceType.name}</h1>

	<button
		class="bg-blue-700 hover:bg-blue-600 active:bg-blue-800 p-2 mb-4 rounded-lg inline-block float-right duration-200"
		on:click={orderDevice}
		>Place order for {data.deviceType.name} with {addonsSelected.length} addon{addonsSelected.length ===
		1
			? ""
			: "s"}</button
	>

	<hr class="w-full mb-4" />

	{#each data.deviceType.CompatibleAddons as addon}
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
			>{addon.name}
			<span class="float-right opacity-70">{addon.Addons.length}</span
			></button
		>
	{/each}
</main>
