import prisma from "$lib/server/prisma/prisma";
import { randomBytes } from "crypto";

/**
 * Generates a new session for a user
 * @param userId The id of the user
 * @returns The new session
 */
export async function genNewSession(userId: number): Promise<string> {
	const now = new Date();
	await prisma.session.deleteMany({ where: { expire: { lt: now } } });

	let key = randomBytes(32).toString("hex");

	while ((await prisma.session.findUnique({ where: { key: key } })) != null) {
		console.log("key taken");

		key = randomBytes(32).toString("hex");
	}

	const expire = new Date();
	expire.setUTCMinutes(expire.getUTCMinutes() + 60);

	await prisma.session.create({ data: { key, userId, expire } });

	return key;
}
