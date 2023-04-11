import { trpc } from "$lib/trpc/client";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) => {
	const devices = await trpc(event).devices.list.query();

	return { devices };
};
