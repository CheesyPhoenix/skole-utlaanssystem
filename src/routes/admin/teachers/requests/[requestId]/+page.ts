import { tAuthSafe } from "$lib/trpc-client/autoRedirect";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) =>
	tAuthSafe(event, async (trpc) => {
		event.depends("app:teacherRequest");

		const requestId = parseInt(event.params.requestId);
		if (isNaN(requestId)) throw error(400);

		const request = await trpc.users.getTeacherRequest.query({
			requestId: requestId,
		});
		if (request === null) throw error(404);

		return { request };
	});
