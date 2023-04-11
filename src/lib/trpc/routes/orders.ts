import prisma from "$lib/prisma";
import { z } from "zod";
import { normalRoute, teacherRoute } from "../middleware";
import { t } from "../t";

export const orders = t.router({
	list: t.procedure.use(teacherRoute).query(async () => {
		return await prisma.order.findMany({ include: { device: true } });
	}),
	get: t.procedure
		.use(teacherRoute)
		.input(z.object({ orderId: z.number() }))
		.query(async ({ input }) => {
			return await prisma.order.findUnique({
				where: { id: input.orderId },
				include: {
					addons: true,
					device: true,
					user: { select: { name: true, id: true } },
				},
			});
		}),
	order: t.procedure
		.use(normalRoute)
		.input(z.object({ deviceId: z.number(), addons: z.array(z.number()) }))
		.mutation(async ({ ctx, input }) => {
			const device = await prisma.device.findUnique({
				where: { id: input.deviceId },
			});
			if (device === null) return null;

			const addons = await prisma.addon.findMany({
				where: {
					deviceId: device.id,
					AND: { id: { in: input.addons } },
				},
			});

			if (addons.length != input.addons.length) return null;

			const order = await prisma.order.create({
				data: {
					userId: ctx.user.id,
					deviceId: device.id,
					addons: { connect: addons },
				},
			});

			return order;
		}),
	updateOrder: t.procedure
		.use(teacherRoute)
		.input(
			z.object({
				orderId: z.number(),
				newState: z.enum(["delivered", "returned"]),
			})
		)
		.mutation(() => {
			//TODO
		}),
});
