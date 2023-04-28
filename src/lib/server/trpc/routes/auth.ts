import { z } from "zod";
import { t } from "../t";
import prisma from "$lib/server/prisma/prisma";
import bcrypt from "bcrypt";
import { genNewSession } from "$lib/server/utils/genSession";
import { adminRoute } from "../middleware";
import { UserType } from "$lib/UserType";

export const auth = t.router({
	login: t.procedure
		.input(
			z.object({
				username: z.string().nonempty(),
				password: z.string().nonempty(),
			})
		)
		.query(async ({ input }) => {
			const user = await prisma.user.findUnique({
				where: { name: input.username },
			});

			if (
				user === null ||
				!bcrypt.compareSync(input.password, user.passwordHash)
			)
				return {
					success: false,
					message: "Username or password doesn't exist",
				} as const;

			return await genNewSession(user.id);
		}),
	register: t.procedure
		.input(
			z.object({
				username: z.string().nonempty(),
				password: z.string().nonempty(),
				userType: z.enum(["TEACHER", "STUDENT"]),
			})
		)
		.mutation(async ({ input }) => {
			const existingUser =
				(await prisma.user.findUnique({
					where: { name: input.username },
				})) ??
				(await prisma.teacherRequest.findUnique({
					where: { name: input.username },
				}));

			if (existingUser !== null)
				return {
					success: false,
					message: "Username taken",
				} as const;

			if (input.userType === "STUDENT") {
				const user = await prisma.user.create({
					data: {
						name: input.username,
						passwordHash: bcrypt.hashSync(input.password, 10),
					},
				});

				return await genNewSession(user.id);
			}

			const user = await prisma.teacherRequest.create({
				data: {
					name: input.username,
					passwordHash: bcrypt.hashSync(input.password, 10),
				},
			});

			return {
				success: true,
				message: "Teacher request created successfully",
			} as const;
		}),
	createAdmin: t.procedure
		.use(adminRoute)
		.input(
			z.object({
				username: z.string().nonempty(),
				password: z.string().nonempty(),
			})
		)
		.mutation(async ({ input }) => {
			const existingUser = await prisma.user.findUnique({
				where: { name: input.username },
			});

			if (existingUser !== null)
				return {
					success: false,
					message: "Username taken",
				} as const;

			await prisma.user.create({
				data: {
					name: input.username,
					passwordHash: bcrypt.hashSync(input.password, 10),
				},
			});

			return {
				success: true,
				message: "Admin created successfully",
			} as const;
		}),
	user: t.procedure.query(async ({ ctx }) => {
		if (ctx.userId === null)
			return { type: UserType.UNAUTHENTICATED } as const;

		const user = await prisma.user.findUnique({
			where: { id: ctx.userId },
		});
		if (user === null) return { type: UserType.UNAUTHENTICATED } as const;

		if (user.isAdmin)
			return { type: UserType.ADMIN, name: user.name } as const;
		if (user.isTeacher)
			return { type: UserType.TEACHER, name: user.name } as const;
		return { type: UserType.STUDENT, name: user.name } as const;
	}),
});
