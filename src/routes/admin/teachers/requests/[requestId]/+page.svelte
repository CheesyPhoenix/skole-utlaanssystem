<script lang="ts">
	import { modalStore, toastStore } from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";
	import { page } from "$app/stores";
	import { tAuthSafe } from "$lib/trpc-client/autoRedirect";
	import LinkButton from "$lib/components/LinkButton.svelte";

	export let data: PageData;

	async function deleteRequest() {
		tAuthSafe($page, async (trpc) => {
			const res = await trpc.auth.deleteTeacherRequest.mutate({
				requestId: data.request.id,
			});
			toastStore.trigger({
				message: res,
				background:
					"variant-filled-" +
					(res === "Request deleted" ? "success" : "error"),
				autohide: false,
			});
		});
	}

	function deleteRequestPrompt() {
		modalStore.trigger({
			type: "confirm",
			title: "Delete request",
			body: "Are you sure you want to delete this request?",
			buttonTextConfirm: "Delete request",
			modalClasses: "[&>footer>.variant-filled]:variant-filled-error",
			response: (r) => r && deleteRequest(),
		});
	}

	function approveRequest() {
		tAuthSafe($page, async (trpc) => {
			const res = await trpc.auth.approveTeacherRequest.mutate({
				requestId: data.request.id,
			});
			toastStore.trigger({
				message: res,
				background:
					"variant-filled-" +
					(res === "Request approved" ? "success" : "error"),
				autohide: false,
			});
		});
	}

	function approvePrompt() {
		modalStore.trigger({
			type: "confirm",
			title: "Approve request",
			body: "Are you sure you want to approve this request?",
			buttonTextConfirm: "Approve request",
			modalClasses: "[&>footer>.variant-filled]:variant-filled-primary",
			response: (r) => r && approveRequest(),
		});
	}
</script>

<LinkButton href="/../../" relative>Go back</LinkButton>

<div class="card p-4 mt-6">
	<h3 class="mb-2">
		{data.request.name}
		<span class="opacity-70 float-right">#{data.request.id}</span>
	</h3>
	<button class="btn variant-filled-primary" on:click={approvePrompt}
		>Approve</button
	>
	<button class="btn variant-filled-error" on:click={deleteRequestPrompt}
		>Delete request</button
	>
</div>
