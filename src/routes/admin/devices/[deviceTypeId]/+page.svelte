<script lang="ts">
	import { invalidate } from "$app/navigation";
	import { page } from "$app/stores";
	import LinkButton from "$lib/components/LinkButton.svelte";
	import { tAuthSafe } from "$lib/trpc-client/autoRedirect";
	import type { PageData } from "./$types";

	export let data: PageData;

	async function addDevice() {
		await tAuthSafe($page, async (trpc) => {
			await trpc.devices.add.mutate({
				deviceType: data.device.id,
			});
		});

		await invalidate("app:devices");
	}
</script>

<LinkButton href="/../" relative>Go back</LinkButton>

<h2 class="mb-4 mt-4">{data.device.name}</h2>

{#each data.device.Devices as device}
	<a
		href={$page.url.pathname + "/" + device.id}
		class="card card-hover p-4 mb-2 block"
		>{data.device.name} <span>#{device.id}</span></a
	>
{/each}

<button class="btn variant-filled-primary ml-1 mr-1" on:click={addDevice}
	>+ Add</button
>
