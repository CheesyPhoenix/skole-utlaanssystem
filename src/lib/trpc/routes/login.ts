import { z } from "zod";
import { t } from "../t";
import prisma from "$lib/server/prisma";
import bcrypt from "bcrypt";
import { genNewSession } from "$lib/server/genSession";
import { adminRoute } from "../middleware";

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
				return "Username or password doesn't exits" as const;

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
			const existingUser = await prisma.user.findUnique({
				where: { name: input.username },
			});

			if (existingUser !== null) return "Username taken" as const;

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

			return "Teacher request created";
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
			// TODO
		}),
});
