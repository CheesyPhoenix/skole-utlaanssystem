import { tAuthSafe } from "$lib/trpc-client/autoRedirect";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) =>
	await tAuthSafe(event, async (trpc) => {
		return { user: await trpc.users.get.query() };
	});
