import prisma from "$lib/server/prisma";
import { t } from "$lib/trpc/t";
import { adminRoute, normalRoute } from "../middleware";

export const users = t.router({
	list: t.procedure.use(adminRoute).query(async () => {
		return await prisma.user.findMany({
			select: { passwordHash: false },
		});
	}),
	get: t.procedure.use(normalRoute).query(async ({ ctx }) => {
		const user = ctx.user;
		return {
			id: user.id,
			isTeacher: user.isTeacher,
			isAdmin: user.isAdmin,
			name: user.name,
		};
	}),
	teachers: t.procedure.use(adminRoute).query(async () => {
		return await prisma.user.findMany({
			where: { isTeacher: true },
		});
	}),
});
