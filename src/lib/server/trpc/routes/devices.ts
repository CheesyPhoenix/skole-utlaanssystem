import prisma from "$lib/server/prisma/prisma";
import { t } from "$lib/server/trpc/t";
import { z } from "zod";
import { normalRoute } from "../middleware";

export const devices = t.router({
	list: t.procedure.use(normalRoute).query(async () => {
		return await prisma.deviceType.findMany({
			where: {
				NOT: {
					Devices: {
						every: {
							Orders: {
								some: {
									isReserved: true,
									OR: { isDelivered: true },
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
									isReserved: true,
									OR: { isDelivered: true },
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
										isReserved: true,
										OR: { isDelivered: true },
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
												isReserved: true,
												OR: { isDelivered: true },
											},
										},
									},
								},
							},
						},
						include: {
							Addons: { select: { _count: true } },
						},
					},
				},
			});
		}),
});
