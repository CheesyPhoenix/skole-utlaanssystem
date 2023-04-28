import { tAuthSafe } from "$lib/trpc-client/autoRedirect";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) =>
	tAuthSafe(event, async (trpc) => {
		event.depends("app:teacher");

		const teacherId = parseInt(event.params.teacherId);
		if (isNaN(teacherId)) throw error(400);

		const teacher = await trpc.users.getTeacher.query({ teacherId });
		if (teacher === null) throw error(404);

		return { teacher };
	});
