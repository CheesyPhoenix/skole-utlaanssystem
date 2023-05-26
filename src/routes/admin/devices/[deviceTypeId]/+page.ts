import { tAuthSafe } from "$lib/trpc-client/autoRedirect";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) =>
	tAuthSafe(event, async (trpc) => {
		event.depends("app:devicetype:" + event.params.deviceTypeId);

		const deviceTypeId = parseInt(event.params.deviceTypeId);
		if (isNaN(deviceTypeId)) throw error(400);

		const device = await trpc.devices.adminGet.query({
			deviceTypeId: deviceTypeId,
		});
		if (device === null) throw error(404);

		return { device };
	});
