import prisma from "$lib/prisma";
import { t } from "$lib/trpc/t";
import { z } from "zod";
import { normalRoute } from "../middleware";

export const devices = t.router({
	list: t.procedure.use(normalRoute).query(async () => {
		return await prisma.device.findMany();
	}),
	get: t.procedure
		.use(normalRoute)
		.input(z.object({ deviceId: z.number() }))
		.query(async ({ input }) => {
			return await prisma.device.findUnique({
				where: { id: input.deviceId },
				include: { addons: true },
			});
		}),
});
