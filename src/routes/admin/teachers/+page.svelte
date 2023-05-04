<script lang="ts">
	import { page } from "$app/stores";
	import LinkButton from "$lib/components/LinkButton.svelte";
	import { adminTeacherTab } from "$lib/stores/adminTeachersTab";
	import type { PageData } from "./$types";
	import { Tab, TabGroup } from "@skeletonlabs/skeleton";

	export let data: PageData;

	let tab: "REQUESTS" | "TEACHERS" = "REQUESTS";
</script>

<LinkButton href="/../" relative>Go back</LinkButton>

<h2 class="mb-4 mt-4">Teachers</h2>

<TabGroup>
	<Tab bind:group={$adminTeacherTab} value={"REQUESTS"} name="Requests"
		>Requests</Tab
	>
	<Tab bind:group={$adminTeacherTab} value={"TEACHERS"} name="Teachers"
		>Teachers</Tab
	>

	<svelte:fragment slot="panel">
		{#if tab === "TEACHERS"}
			{#each data.teachers as teacher}
				<a
					href={$page.url.pathname + "/" + teacher.id}
					class="card card-hover p-4 mb-2 block"
					>{teacher.name} <span>#{teacher.id}</span></a
				>
			{/each}
		{:else}
			{#each data.teacherRequests as teacherRequest}
				<a
					href={$page.url.pathname + "/requests/" + teacherRequest.id}
					class="card card-hover p-4 mb-2 block"
					>{teacherRequest.name}
					<span>#{teacherRequest.id}</span></a
				>
			{/each}
		{/if}
	</svelte:fragment>
</TabGroup>
