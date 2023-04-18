import prisma from "$lib/server/prisma";
import type { RequestEvent } from "@sveltejs/kit";
import type { inferAsyncReturnType } from "@trpc/server";

// we're not using the event parameter is this example,
// hence the eslint-disable rule
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createContext(req: RequestEvent) {
	const key = req.cookies.get("sessionKey");
	if (key === undefined) return { userId: null };

	const session = await prisma.session.findUnique({ where: { key: key } });
	if (session === null) return { userId: null };

	//session expired?
	if (session.expire.getTime() < Date.now()) return { userId: null };

	return { userId: session.userId };
}

export type Context = inferAsyncReturnType<typeof createContext>;
