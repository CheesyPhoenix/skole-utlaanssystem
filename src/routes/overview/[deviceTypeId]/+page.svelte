<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import LinkButton from "$lib/components/LinkButton.svelte";
	import { tAuthSafe } from "$lib/trpc-client/autoRedirect";
	import { ListBox, ListBoxItem } from "@skeletonlabs/skeleton";
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

<LinkButton href="/../" relative class="mb-4">Go back</LinkButton>

<br />

<h1 class="text-xl font-bold mb-2 inline-block">{data.deviceType.name}</h1>

<button
	class="btn variant-filled-secondary inline-block float-right"
	on:click={orderDevice}
	>Place order for {data.deviceType.name} with {addonsSelected.length} addon{addonsSelected.length ===
	1
		? ""
		: "s"}</button
>

<hr class="w-full mb-4" />

{#each data.deviceType.CompatibleAddons as addon}
	<button
		class="btn p-2 block {addonsSelected.includes(addon.id)
			? 'variant-filled-primary'
			: 'variant-ghost-primary'} mb-2 rounded-lg w-full text-left"
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
