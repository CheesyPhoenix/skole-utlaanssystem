import { tAuthSafe } from "$lib/trpc-client/autoRedirect";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) =>
	tAuthSafe(event, async (trpc) => {
		const deviceTypeId = parseInt(event.params.deviceTypeId);

		if (isNaN(deviceTypeId)) throw error(400);

		const deviceType = await trpc.devices.get.query({
			deviceTypeId,
		});

		if (deviceType === null) throw error(404);

		return { deviceType };
	});
