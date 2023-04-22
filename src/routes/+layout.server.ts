import { trpc } from "$lib/trpc-client/client";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
	event.depends("app:userType");
	return { userType: await trpc(event).auth.userType.query() };
};
