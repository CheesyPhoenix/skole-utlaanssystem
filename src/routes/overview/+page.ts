import { tAuthSafe } from "$lib/trpc/autoRedirect";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) => {
	return await tAuthSafe(event, async (trpc) => {
		return { devices: trpc.devices.list.query() };
	});
};
