import prisma from "$lib/server/prisma/prisma";
import { t } from "$lib/server/trpc/t";
import { z } from "zod";
import { adminRoute, normalRoute } from "../middleware";

export const devices = t.router({
	list: t.procedure.use(normalRoute).query(async () => {
		return await prisma.deviceType.findMany({
			where: {
				NOT: {
					Devices: {
						every: {
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
				},
			},
			include: {
				Devices: {
					where: {
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
					select: { _count: true },
				},
			},
		});
	}),
	get: t.procedure
		.use(normalRoute)
		.input(z.object({ deviceTypeId: z.number() }))
		.query(async ({ input }) => {
			return await prisma.deviceType.findUnique({
				where: { id: input.deviceTypeId },
				include: {
					Devices: {
						select: { _count: true },
						where: {
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
					},
					CompatibleAddons: {
						where: {
							NOT: {
								Addons: {
									every: {
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
							},
						},
						include: {
							Addons: {
								select: { _count: true },
								where: {
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
							},
						},
					},
				},
			});
		}),
	adminGet: t.procedure
		.use(adminRoute)
		.input(z.object({ deviceTypeId: z.number() }))
		.query(async ({ input }) => {
			return await prisma.deviceType.findUnique({
				where: { id: input.deviceTypeId },
				include: {
					Devices: {},
					CompatibleAddons: {
						include: {
							Addons: {},
						},
					},
				},
			});
		}),
	deleteDevice: t.procedure
		.use(adminRoute)
		.input(z.object({ deviceId: z.number() }))
		.mutation(async ({ input }) => {
			await prisma.device.delete({ where: { id: input.deviceId } });
			return "Device deleted" as const;
		}),
});
