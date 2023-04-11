import { TRPCError } from "@trpc/server";
import { t } from "./t";
import prisma from "$lib/prisma";

export const normalRoute = t.middleware(async ({ ctx, next }) => {
	if (ctx.userId === null) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}

	const user = await prisma.user.findUnique({ where: { id: ctx.userId } });

	if (user === null) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}

	return next({
		ctx: {
			user,
		},
	});
});
export const teacherRoute = t.middleware(async ({ ctx, next }) => {
	if (ctx.userId === null) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}

	const user = await prisma.user.findUnique({ where: { id: ctx.userId } });

	if (user === null || user.isTeacher === false) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}

	return next({
		ctx: {
			user,
		},
	});
});

export const adminRoute = t.middleware(async ({ ctx, next }) => {
	if (ctx.userId === null) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}

	const user = await prisma.user.findUnique({
		where: { id: ctx.userId },
	});

	if (user === null || user.isAdmin === false) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}

	return next({
		ctx: {
			user,
		},
	});
});
