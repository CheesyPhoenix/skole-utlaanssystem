<script lang="ts">
	import LinkButton from "$lib/components/LinkButton.svelte";
	import { tAuthSafe } from "$lib/trpc-client/autoRedirect";
	import { modalStore, toastStore } from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";
	import ChangePassword from "./ChangePassword.svelte";
	import { UserType } from "$lib/UserType";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";

	export let data: PageData;

	async function deleteAccount() {
		tAuthSafe($page, async (trpc) => {
			const res = await trpc.auth.deleteMe.mutate();
			toastStore.trigger({
				message: res,
				background:
					"variant-filled-" +
					(res === "Account deleted" ? "success" : "error"),
				autohide: false,
			});
			if (res === "Account deleted") await goto("/api/clearSession");
		});
	}

	function deleteAccountPromt() {
		modalStore.trigger({
			type: "confirm",
			title: "Delete account",
			body: "Are you sure you want to delete your account?",
			buttonTextConfirm: "Delete account",
			modalClasses: "[&>footer>.variant-filled]:variant-filled-error",
			response: (r) => r && deleteAccount(),
		});
	}
</script>

<h1>Account</h1>

{#if data.user.type === UserType.UNAUTHENTICATED}
	<p>You are not logged in</p>
{:else}
	<div class="card p-4 mt-2">
		<h3 class="mb-2">
			{data.user.name}
			<span class="opacity-70 float-right"
				>{UserType[data.user.type]}</span
			>
		</h3>

		<LinkButton href="/api/clearSession">Logout</LinkButton>

		<button
			class="btn variant-filled-warning ml-1 mr-1"
			on:click={() =>
				modalStore.trigger({
					type: "component",
					component: { ref: ChangePassword },
				})}>Change Password</button
		>

		<button class="btn variant-filled-error" on:click={deleteAccountPromt}
			>Delete my account</button
		>
	</div>
{/if}
