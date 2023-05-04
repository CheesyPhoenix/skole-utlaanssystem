<script lang="ts">
	import { modalStore, toastStore } from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";
	import { page } from "$app/stores";
	import { tAuthSafe } from "$lib/trpc-client/autoRedirect";

	export let data: PageData;

	async function deleteDevice() {
		tAuthSafe($page, async (trpc) => {
			const res = await trpc.devices.deleteDevice.mutate({
				deviceId: data.deviceId,
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

	function deleteDevicePrompt() {
		modalStore.trigger({
			type: "confirm",
			title: "Delete device",
			body: "Are you sure you want to delete this device?",
			buttonTextConfirm: "Delete device",
			modalClasses: "[&>footer>.variant-filled]:variant-filled-error",
			response: (r) => r && deleteDevice(),
		});
	}
</script>

<div class="card p-4 mt-2">
	<h3 class="mb-2">
		{data.device.name}
		<span class="opacity-70 float-right">#{data.deviceId}</span>
	</h3>

	<button class="btn variant-filled-error" on:click={deleteDevicePrompt}
		>Delete device</button
	>
</div>
