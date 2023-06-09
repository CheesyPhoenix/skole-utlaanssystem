<script lang="ts">
	// Your selected Skeleton theme:
	import "@skeletonlabs/skeleton/themes/theme-skeleton.css";
	// This contains the bulk of Skeletons required styles:
	import "@skeletonlabs/skeleton/styles/all.css";
	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import "../app.postcss";
	import {
		AppBar,
		AppRail,
		AppRailTile,
		AppShell,
		Avatar,
		Modal,
		storePopup,
		Toast,
	} from "@skeletonlabs/skeleton";

	// floatingUI
	import {
		computePosition,
		autoUpdate,
		flip,
		shift,
		offset,
		arrow,
	} from "@floating-ui/dom";

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	//--

	import { page } from "$app/stores";
	import { writable, type Writable } from "svelte/store";
	import type { LayoutData } from "./$types";
	import Icon from "$lib/components/Icon.svelte";
	import type { ComponentProps } from "svelte";
	import { scale, slide } from "svelte/transition";
	import { UserType } from "$lib/UserType";

	export let data: LayoutData;

	$: locations = [
		{
			label: "Home",
			icon: "home",
			pathname: "/",
			authLevel: UserType.STUDENT,
		},
		{
			label: "Devices",
			icon: "electronic-chip",
			pathname: "/overview",
			authLevel: UserType.STUDENT,
		},
		{
			label: data.user.type === UserType.STUDENT ? "My Orders" : "Orders",
			icon: "shopping-bag",
			pathname: "/orders",
			authLevel: UserType.STUDENT,
		},
		{
			label: "Admin",
			icon: "twitter-checkmark",
			pathname: "/admin",
			authLevel: UserType.ADMIN,
		},
	] as {
		pathname: string;
		icon: ComponentProps<Icon>["type"];
		label: string;
		authLevel: typeof data.user.type;
	}[];

	const storeRail: Writable<number> = writable(
		locations
			? locations.findIndex((x) => x.pathname === $page.url.pathname)
			: 0
	);

	$: storeRail.set(
		locations.findIndex((x) => x.pathname === $page.url.pathname)
	);
</script>

<Modal />
<Toast position="br" />

<AppShell slotSidebarLeft="">
	<svelte:fragment slot="header">
		<AppBar shadow="shadow-lg">
			<svelte:fragment slot="lead">
				<a href="/">
					<img src="/favicon.svg" alt="logo" class="h-12" />
				</a>
			</svelte:fragment>
			<h2 class="ml-2">Utlånssystem</h2>
			<svelte:fragment slot="trail">
				{#if data.user.type !== UserType.UNAUTHENTICATED}
					<a href="/account" in:scale out:scale>
						<Avatar
							initials={data.user.name}
							border="border-4 border-surface-300-600-token hover:!border-primary-500 {$page
								.url.pathname === '/account' &&
								'!border-primary-500'}"
							cursor="cursor-pointer"
							width="w-12"
						/>
					</a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		{#if data.user.type !== UserType.UNAUTHENTICATED}
			<div
				in:slide={{ axis: "x" }}
				out:slide={{ axis: "x" }}
				class="h-full"
			>
				<AppRail selected={storeRail}>
					{#each locations as location, i}
						{#if location.authLevel <= data.user.type}
							<AppRailTile
								label={location.label}
								tag="a"
								href={location.pathname}
								value={i}
								class="duration-200"
							>
								<Icon type={location.icon} />
							</AppRailTile>
						{/if}
					{/each}
				</AppRail>
			</div>
		{/if}
	</svelte:fragment>
	<!-- Router Slot -->
	<main class="p-4 mt-8 mb-8 max-w-6xl m-auto">
		<slot />
	</main>
	<!-- ---- / ---- -->
</AppShell>
