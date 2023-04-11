import prisma from "$lib/prisma";
import { t } from "$lib/trpc/t";

export const docs = t.router({
	list: t.procedure.query(async () => {
		return await prisma.doc.findMany();
	}),
});
