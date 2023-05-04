import { tAuthSafe } from "$lib/trpc-client/autoRedirect";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) =>
	tAuthSafe(event, async (trpc) => {
		event.depends("app:device");

		const deviceId = parseInt(event.params.deviceId);
		if (isNaN(deviceId)) throw error(400);

		const device = await trpc.devices.get.query({
			deviceTypeId: deviceId,
		});
		if (device === null) throw error(404);

		return { device };
	});
