import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, url }) => {
	cookies.delete("sessionKey");

	const callback = url.searchParams.get("callback");
	throw redirect(307, url.origin + (callback !== null ? callback : ""));
};
