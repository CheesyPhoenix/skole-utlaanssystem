import { trpc } from "$lib/trpc-client/client";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
	event.depends("app:user");
	return { user: await trpc(event).auth.user.query() };
};
