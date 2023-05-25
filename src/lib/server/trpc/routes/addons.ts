import { z } from "zod";
import { adminRoute } from "../middleware";
import { t } from "../t";
import prisma from "$lib/server/prisma/prisma";

// TODO: Endpoint for checking if addonType name is availible
export const addons = t.router({
	createAddonType: t.procedure
		.use(adminRoute)
		.input(
			z.object({ name: z.string().nonempty(), deviceTypeId: z.number() })
		)
		.mutation(async ({ input }) => {
			const deviceType = await prisma.deviceType.findUnique({
				where: { id: input.deviceTypeId },
			});
			if (deviceType === null) return null;

			const addon = await prisma.addonType.create({
				data: {
					name: input.name,
					CompatibleDevices: { connect: { id: deviceType.id } },
					Addons: { create: {} },
				},
			});

			return addon;
		}),
});
