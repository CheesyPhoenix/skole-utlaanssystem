<script>
	import { page } from "$app/stores";
</script>

<main class="m-2">
	<h1 class="text-xl font-bold mb-2">Admin</h1>

	<a href="{$page.url.pathname}/equipment">Manage Equipment</a>
	<a href="{$page.url.pathname}/teachers">Manage Teachers</a>
</main>
