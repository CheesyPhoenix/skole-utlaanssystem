import type { TRPCClientInit } from "trpc-sveltekit";
import { trpc as trpcClient } from "./client";
import { TRPCError } from "@trpc/server";
import { redirect } from "@sveltejs/kit";
import { goto } from "$app/navigation";
import { TRPCClientError } from "@trpc/client";

export async function tAuthSafe<T>(
	init: TRPCClientInit,
	func: (trpc: ReturnType<typeof trpcClient>) => Promise<T>
): Promise<T> {
	try {
		return await func(trpcClient(init));
	} catch (error) {
		if (error instanceof TRPCClientError) {
			if (error.message == "UNAUTHORIZED") {
				if (typeof window === "undefined") {
					throw redirect(307, "/login");
				}
				goto("/login");
			}
		}
		throw error;
	}
}
