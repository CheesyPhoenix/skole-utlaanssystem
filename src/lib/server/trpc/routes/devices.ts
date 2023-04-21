import prisma from "$lib/server/prisma";
import { t } from "$lib/server/trpc/t";
import { z } from "zod";
import { normalRoute } from "../middleware";

export const devices = t.router({
	list: t.procedure.use(normalRoute).query(async () => {
		return await prisma.device.findMany({
			where: {
				NOT: {
					Orders: {
						some: { isReserved: true, OR: { isDelivered: true } },
					},
				},
			},
		});
	}),
	get: t.procedure
		.use(normalRoute)
		.input(z.object({ deviceId: z.number() }))
		.query(async ({ input }) => {
			return await prisma.device.findUnique({
				where: { id: input.deviceId },
				include: { Addons: true },
			});
		}),
});