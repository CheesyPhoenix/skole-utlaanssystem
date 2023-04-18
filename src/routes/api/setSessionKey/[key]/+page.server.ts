import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, params, url }) => {
	cookies.set("sessionKey", params.key, { httpOnly: true, path: "/" });

	const callback = url.searchParams.get("callback");

	throw redirect(307, url.origin + (callback !== null ? callback : ""));
};
