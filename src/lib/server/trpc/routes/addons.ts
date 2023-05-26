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
			if (deviceType === null) return "DeviceType not found" as const;

			if (!(await isNameAvailible(input.name)))
				return "AddonType name already taken" as const;

			const addon = await prisma.addonType.create({
				data: {
					name: input.name,
					CompatibleDevice: { connect: { id: deviceType.id } },
					Addons: { create: {} },
				},
			});

			return addon;
		}),
	isNameAvailible: t.procedure
		.use(adminRoute)
		.input(z.object({ name: z.string() }))
		.query(async ({ input }) => {
			return isNameAvailible(input.name);
		}),
	get: t.procedure
		.use(adminRoute)
		.input(z.object({ addonTypeId: z.number() }))
		.query(async ({ input }) => {
			return await prisma.addonType.findUnique({
				where: { id: input.addonTypeId },
				include: { Addons: true },
			});
		}),
	deleteType: t.procedure
		.use(adminRoute)
		.input(z.object({ addonTypeId: z.number() }))
		.mutation(async ({ input }) => {
			const addonType = await prisma.addonType.findUnique({
				where: { id: input.addonTypeId },
			});

			if (addonType === null) return null;

			await prisma.addonType.delete({ where: { id: input.addonTypeId } });

			return "AddonType deleted" as const;
		}),
	delete: t.procedure
		.use(adminRoute)
		.input(z.object({ addonId: z.number() }))
		.mutation(async ({ input }) => {
			const addon = await prisma.addon.findUnique({
				where: { id: input.addonId },
			});

			if (addon === null) return null;

			await prisma.addon.delete({ where: { id: input.addonId } });

			return "Addon deleted" as const;
		}),
	create: t.procedure
		.use(adminRoute)
		.input(z.object({ addonTypeId: z.number() }))
		.mutation(async ({ input }) => {
			const addonType = await prisma.addonType.findUnique({
				where: { id: input.addonTypeId },
			});

			if (addonType === null) return null;

			const addon = await prisma.addon.create({
				data: { Type: { connect: { id: input.addonTypeId } } },
			});

			return addon;
		}),
});

async function isNameAvailible(name: string) {
	const addonType = await prisma.addonType.findUnique({
		where: { name },
	});

	return addonType === null;
}
