import { tAuthSafe } from "$lib/trpc-client/autoRedirect";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) =>
	tAuthSafe(event, async (trpc) => {
		return { orders: await trpc.orders.listInactive.query() };
	});
