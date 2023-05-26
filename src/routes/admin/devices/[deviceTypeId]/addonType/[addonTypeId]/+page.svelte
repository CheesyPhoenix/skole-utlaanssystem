<script lang="ts">
	import { goto, invalidate } from "$app/navigation";
	import { page } from "$app/stores";
	import Icon from "$lib/components/Icon.svelte";
	import LinkButton from "$lib/components/LinkButton.svelte";
	import { tAuthSafe } from "$lib/trpc-client/autoRedirect.js";
	import { modalStore, toastStore } from "@skeletonlabs/skeleton";

	export let data;

	function deleteAddon(addonId: number) {
		tAuthSafe($page, async (trpc) => {
			const res = await trpc.addons.delete.mutate({ addonId });

			if (res === "Addon deleted") {
				toastStore.trigger({
					message: "Addon deleted successfully",
					background: "variant-filled-success",
				});

				await invalidate("app:addonType:" + data.addonType.id);
			} else {
				toastStore.trigger({
					message: "Could not delete addon",
					background: "variant-filled-error",
				});
			}
		});
	}

	function deleteAddonPrompt(addonId: number) {
		modalStore.trigger({
			type: "confirm",
			title: "Delete Addon",
			body: `Are you sure you want to delete addon <code>#${addonId}</code>?`,
			buttonTextConfirm: "Delete Addon",
			modalClasses: "[&>footer>.variant-filled]:variant-filled-error",
			response: (r) => r && deleteAddon(addonId),
		});
	}

	function addAddon() {
		tAuthSafe($page, async (trpc) => {
			const res = await trpc.addons.create.mutate({
				addonTypeId: data.addonType.id,
			});

			if (res === null)
				toastStore.trigger({
					message: "Could not create addon",
					background: "variant-filled-error",
				});
			else await invalidate("app:addonType:" + data.addonType.id);
		});
	}

	function deleteAddonType() {
		tAuthSafe($page, async (trpc) => {
			const res = await trpc.addons.deleteType.mutate({
				addonTypeId: data.addonType.id,
			});

			if (res === "AddonType deleted") {
				toastStore.trigger({
					message: "Addon Type deleted successfully",
					background: "variant-filled-success",
				});

				await goto("../");
			} else {
				toastStore.trigger({
					message: "Could not delete addon",
					background: "variant-filled-error",
				});
			}
		});
	}

	function deleteAddonTypePrompt() {
		modalStore.trigger({
			type: "confirm",
			title: "Delete Addon Type",
			body: `Are you sure you want to delete addon type <code>${data.addonType.name} #${data.addonType.id}</code>?`,
			buttonTextConfirm: "Delete Addon Type",
			modalClasses: "[&>footer>.variant-filled]:variant-filled-error",
			response: (r) => r && deleteAddonType(),
		});
	}
</script>

<LinkButton href="/../../" relative>Go back</LinkButton>

<h2 class="mb-4 mt-4">
	{data.addonType.name}
	<button
		class="btn variant-filled-error float-right font-normal"
		on:click={deleteAddonTypePrompt}>Delete Addon Type</button
	>
</h2>

{#each data.addonType.Addons as addon}
	<p class="card p-4 mb-2 block">
		{data.addonType.name} <span>#{addon.id}</span>
		<button
			class="float-right"
			on:click={() => deleteAddonPrompt(addon.id)}
		>
			<Icon type="trash-can" />
		</button>
	</p>
{/each}

<button class="btn variant-filled-primary ml-1 mr-1 mt-2" on:click={addAddon}
	>+ Add</button
>
