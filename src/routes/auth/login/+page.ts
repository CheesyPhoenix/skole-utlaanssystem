import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url }) => {
	return { callback: url.searchParams.get("callback") };
};
