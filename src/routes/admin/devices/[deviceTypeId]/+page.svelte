<script lang="ts">
	import { invalidate } from "$app/navigation";
	import { page } from "$app/stores";
	import LinkButton from "$lib/components/LinkButton.svelte";
	import { tAuthSafe } from "$lib/trpc-client/autoRedirect";
	import {
		Tab,
		TabGroup,
		modalStore,
		toastStore,
	} from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";
	import Icon from "$lib/components/Icon.svelte";
	import { deviceTypeTab } from "$lib/stores/deviceTypeTab";

	export let data: PageData;

	async function addDevice() {
		await tAuthSafe($page, async (trpc) => {
			await trpc.devices.add.mutate({
				deviceType: data.device.id,
			});
		});

		await invalidate("app:devices");
	}

	async function deleteDevice(deviceId: number) {
		tAuthSafe($page, async (trpc) => {
			const res = await trpc.devices.deleteDevice.mutate({
				deviceId,
			});
			toastStore.trigger({
				message: res,
				background:
					"variant-filled-" +
					(res === "Device deleted" ? "success" : "error"),
				autohide: false,
			});
		});
	}

	function deleteDevicePrompt(deviceId: number) {
		modalStore.trigger({
			type: "confirm",
			title: "Delete device",
			body: `Are you sure you want to delete device <code>#${deviceId}</code>?`,
			buttonTextConfirm: "Delete device",
			modalClasses: "[&>footer>.variant-filled]:variant-filled-error",
			response: (r) => r && deleteDevice(deviceId),
		});
	}

	async function addAddon(name: string) {
		await tAuthSafe($page, async (trpc) => {
			const res = await trpc.addons.createAddonType.mutate({
				name,
				deviceTypeId: data.device.id,
			});
			if (typeof res === "string") {
				toastStore.trigger({
					message: res,
					background: "variant-filled-error",
				});
			} else {
				await invalidate("app:devicetype:" + data.device.id);
			}
		});
	}

	function addAddonPromt() {
		modalStore.trigger({
			type: "prompt",
			title: "Enter name",
			body: `Enter name of new addon`,
			buttonTextConfirm: "Create addon",
			modalClasses: "",
			response: (r) => {
				console.log(r);
				if (r !== false) addAddon(r);
			},
		});
	}
</script>

<LinkButton href="/../" relative>Go back</LinkButton>

<h2 class="mb-4 mt-4">{data.device.name}</h2>

<TabGroup>
	<Tab bind:group={$deviceTypeTab} value="DEVICES" name="Devices">Devices</Tab
	>
	<Tab bind:group={$deviceTypeTab} value="ADDONS" name="Addons">Addons</Tab>

	<svelte:fragment slot="panel">
		{#if $deviceTypeTab === "DEVICES"}
			{#each data.device.Devices as device}
				<p class="card p-4 mb-2 block">
					{data.device.name} <span>#{device.id}</span>
					<button
						class="float-right"
						on:click={() => deleteDevicePrompt(device.id)}
					>
						<Icon type="trash-can" />
					</button>
				</p>
			{/each}

			<button
				class="btn variant-filled-primary ml-1 mr-1 mt-2"
				on:click={addDevice}>+ Add</button
			>
		{:else}
			{#each data.device.CompatibleAddons as addon}
				<a
					href={$page.url.pathname + "/addonType/" + addon.id}
					class="card card-hover p-4 mb-2 block">{addon.name}</a
				>
			{/each}

			<button
				class="btn variant-filled-primary ml-1 mr-1 mt-2"
				on:click={addAddonPromt}>+ Add</button
			>
		{/if}
	</svelte:fragment>
</TabGroup>
