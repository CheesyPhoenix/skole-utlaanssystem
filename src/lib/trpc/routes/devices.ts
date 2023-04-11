import prisma from "$lib/prisma";
import { t } from "$lib/trpc/t";
import { normalRoute } from "../middleware";

export const devices = t.router({
	list: t.procedure.use(normalRoute).query(async () => {
		return await prisma.device.findMany();
	}),
});
