<script lang="ts">
	export let href: string;
</script>

<a {href} class="p-2 bg-slate-600 rounded-xl">
	<slot />
</a>
