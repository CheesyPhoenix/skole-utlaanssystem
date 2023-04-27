<script lang="ts">
	import { page } from "$app/stores";

	export let href: string;
	export let relative: true | undefined = undefined;
</script>

<a
	href={relative ? $page.url.pathname + href : href}
	class="btn variant-filled-primary"
>
	<slot />
</a>
