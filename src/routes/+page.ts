import { trpc } from "$lib/trpc/client";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) => {
	const docs = await trpc(event).docs.list.query();
	return { docs };
};
