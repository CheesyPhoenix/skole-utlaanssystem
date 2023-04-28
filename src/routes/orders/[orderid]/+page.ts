import { tAuthSafe } from "$lib/trpc-client/autoRedirect";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) =>
	tAuthSafe(event, async (trpc) => {
		event.depends("app:order");

		const orderId = parseInt(event.params.orderid);
		if (isNaN(orderId)) throw error(400);

		const order = await trpc.orders.get.query({ orderId });
		if (order === null) throw error(404);

		return { order };
	});
