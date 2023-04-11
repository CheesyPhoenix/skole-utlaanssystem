import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, params }) => {
	cookies.delete("sessionKey");
	throw redirect(303, "/");
};
