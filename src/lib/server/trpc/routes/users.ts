import prisma from "$lib/server/prisma";
import { t } from "$lib/server/trpc/t";
import { z } from "zod";
import { adminRoute, normalRoute } from "../middleware";
import bcrypt from "bcrypt";

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
		return await prisma.user.findMany({ where: { isTeacher: true } });
	}),
	changePass: t.procedure
		.use(normalRoute)
		.input(z.object({ newPassword: z.string().nonempty() }))
		.mutation(async ({ ctx, input }) => {
			const user = ctx.user;

			await prisma.user.update({
				where: { id: user.id },
				data: { passwordHash: bcrypt.hashSync(input.newPassword, 10) },
			});

			return {
				success: true,
				message: "Password changed successfully",
			} as const;
		}),
});
