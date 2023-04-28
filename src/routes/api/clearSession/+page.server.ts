import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, url }) => {
	cookies.set("sessionKey", "Logged out", {
		httpOnly: true,
		path: "/",
		sameSite: "strict",
	});
};
