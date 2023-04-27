import prisma from "$lib/server/prisma/prisma";
import { z } from "zod";
import { normalRoute, teacherRoute } from "../middleware";
import { t } from "../t";

export const orders = t.router({
	listActive: t.procedure.use(normalRoute).query(async ({ ctx }) => {
		// show all active orders for teachers and admins, but only own orders for normal user
		if (ctx.user.isTeacher || ctx.user.isAdmin) {
			return await prisma.order.findMany({
				where: {
					OR: [{ isDelivered: true }, { isReserved: true }],
				},
				include: {
					Device: { select: { id: true, Type: true } },
					Addons: { select: { id: true, Type: true } },
				},
			});
		}

		return await prisma.order.findMany({
			where: {
				AND: [
					{ userId: ctx.user.id },
					{ OR: [{ isDelivered: true }, { isReserved: true }] },
				],
			},
			include: {
				Device: { select: { id: true, Type: true } },
				Addons: { select: { id: true, Type: true } },
			},
		});
	}),
	listInactive: t.procedure.use(normalRoute).query(async ({ ctx }) => {
		// show all inactive orders for teachers and admins, but only own orders for normal user

		if (ctx.user.isTeacher || ctx.user.isAdmin) {
			return await prisma.order.findMany({
				where: {
					isReturned: true,
				},
				include: {
					Device: { select: { id: true, Type: true } },
					Addons: { select: { id: true, Type: true } },
				},
			});
		}

		return await prisma.order.findMany({
			where: {
				userId: ctx.user.id,
				isReturned: true,
			},
			include: {
				Device: { select: { id: true, Type: true } },
				Addons: { select: { id: true, Type: true } },
			},
		});
	}),
	get: t.procedure
		.use(normalRoute)
		.input(z.object({ orderId: z.number() }))
		.query(async ({ input, ctx }) => {
			const order = await prisma.order.findUnique({
				where: { id: input.orderId },
				include: {
					Addons: { select: { id: true, Type: true } },
					Device: { select: { id: true, Type: true } },
					User: { select: { name: true, id: true } },
				},
			});

			if (order === null) return null;

			if (ctx.user.isTeacher || ctx.user.isAdmin) return order;

			if (order.User.id === ctx.user.id) return order;

			return null;
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
					NOT: {
						Orders: {
							some: {
								OR: [
									{ isDelivered: true },
									{ isReserved: true },
								],
							},
						},
					},
				},
			});
			if (device === null) return null;

			const addons = await prisma.addon.findMany({
				where: {
					addonTypeId: { in: input.addonTypes },
					Type: {
						CompatibleDevices: {
							some: { id: input.deviceTypeId },
						},
					},
					NOT: {
						Orders: {
							some: {
								OR: [
									{ isDelivered: true },
									{ isReserved: true },
								],
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
		.mutation(async ({ input }) => {
			const order = await prisma.order.findUnique({
				where: { id: input.orderId },
			});
			if (order === null)
				return {
					isError: true as const,
					message: "Order not found" as const,
				} as const;

			if (order.isReturned)
				return {
					isError: true as const,
					message:
						"Order is returned. Changes not permitted" as const,
				} as const;

			if (order.isDelivered && input.newState == "delivered")
				return {
					isError: true as const,
					message: "Order already delivered" as const,
				} as const;

			await prisma.order.update({
				where: { id: order.id },
				data: {
					isReserved: false,
					isDelivered: input.newState === "delivered",
					isReturned: input.newState === "returned",
				},
			});

			return {
				isError: false as const,
				message:
					`Order updated successfully. New state: ${input.newState}` as const,
			} as const;
		}),
});
