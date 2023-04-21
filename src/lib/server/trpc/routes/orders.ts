import prisma from "$lib/server/prisma/prisma";
import { z } from "zod";
import { normalRoute, teacherRoute } from "../middleware";
import { t } from "../t";

export const orders = t.router({
	list: t.procedure.use(teacherRoute).query(async () => {
		return await prisma.order.findMany({ include: { Device: true } });
	}),
	get: t.procedure
		.use(teacherRoute)
		.input(z.object({ orderId: z.number() }))
		.query(async ({ input }) => {
			return await prisma.order.findUnique({
				where: { id: input.orderId },
				include: {
					Addons: true,
					Device: true,
					User: { select: { name: true, id: true } },
				},
			});
		}),
	order: t.procedure
		.use(normalRoute)
		.input(
			z.object({
				deviceTypeId: z.number(),
				addonTypes: z.array(z.number()),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const device = await prisma.device.findFirst({
				where: {
					deviceTypeId: input.deviceTypeId,
					AND: {
						NOT: {
							Orders: {
								some: {
									isReserved: true,
									OR: { isDelivered: true },
								},
							},
						},
					},
				},
			});
			if (device === null) return null;

			const addons = await prisma.addon.findMany({
				where: {
					addonTypeId: { in: input.addonTypes },
					AND: {
						Type: {
							CompatibleDevices: {
								some: { id: input.deviceTypeId },
							},
						},
					},
				},
				distinct: ["addonTypeId"],
			});

			if (addons.length !== input.addonTypes.length) return null;

			const order = await prisma.order.create({
				data: {
					User: { connect: { id: ctx.user.id } },
					Device: { connect: { id: device.id } },
					Addons: {
						connect: addons.map((x) => {
							return { id: x.id };
						}),
					},
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
