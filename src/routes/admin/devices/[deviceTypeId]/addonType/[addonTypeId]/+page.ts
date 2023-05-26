import { tAuthSafe } from "$lib/trpc-client/autoRedirect.js";
import { error } from "@sveltejs/kit";

export const load = async (event) =>
	tAuthSafe(event, async (trpc) => {
		event.depends("app:addonType:" + event.params.addonTypeId);

		const addonTypeId = parseInt(event.params.addonTypeId);
		if (isNaN(addonTypeId)) {
			throw error(400);
		}

		const addonType = await trpc.addons.get.query({ addonTypeId });

		if (addonType === null) throw error(404);

		return { addonType };
	});
