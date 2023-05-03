<script lang="ts">
	import { modalStore, toastStore } from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";
	import { page } from "$app/stores";
	import { tAuthSafe } from "$lib/trpc-client/autoRedirect";

	export let data: PageData;

	async function deleteTeacher() {
		tAuthSafe($page, async (trpc) => {
			const res = await trpc.auth.deleteTeacher.mutate({
				teacherId: data.teacher.id,
			});
			toastStore.trigger({
				message: res,
				background:
					"variant-filled-" +
					(res === "Teacher deleted" ? "success" : "error"),
				autohide: false,
			});
		});
	}

	function deleteTeacherPrompt() {
		modalStore.trigger({
			type: "confirm",
			title: "Delete teacher",
			body: "Are you sure you want to delete this teacher?",
			buttonTextConfirm: "Delete teacher",
			modalClasses: "[&>footer>.variant-filled]:variant-filled-error",
			response: (r) => r && deleteTeacher(),
		});
	}
</script>

<div class="card p-4 mt-2">
	<h3 class="mb-2">
		{data.teacher.name}<span class="opacity-70 float-right"
			>#{data.teacher.id}</span
		>
	</h3>
	<button class="btn variant-filled-error" on:click={deleteTeacherPrompt}
		>Delete teacher</button
	>
</div>
