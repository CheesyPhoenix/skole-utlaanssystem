<script lang="ts">
	import { page } from "$app/stores";

	export let href: string;
	export let relative: true | undefined = undefined;
</script>

<a
	href={relative ? $page.url.pathname + href : href}
	class="p-2 bg-slate-600 rounded-xl"
>
	<slot />
</a>
