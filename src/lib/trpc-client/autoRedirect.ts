import type { TRPCClientInit } from "trpc-sveltekit";
import { trpc as trpcClient } from "./client";
import { redirect } from "@sveltejs/kit";
import { goto, invalidate } from "$app/navigation";
import { TRPCClientError } from "@trpc/client";
import { modalStore, toastStore } from "@skeletonlabs/skeleton";

export async function tAuthSafe<T>(
	init: TRPCClientInit & { url: { pathname: string } },
	func: (trpc: ReturnType<typeof trpcClient>) => Promise<T>
): Promise<T> {
	try {
		return await func(trpcClient(init));
	} catch (error) {
		if (error instanceof TRPCClientError) {
			if (error.message == "UNAUTHORIZED") {
				if (typeof window === "undefined") {
					throw redirect(
						307,
						"/auth/login?callback=" + init.url.pathname
					);
				}

				await invalidate("app:user");
				modalStore.clear();
				toastStore.trigger({
					message:
						"Your session expired, or you do not have access to this resource",
					background: "variant-filled-warning",
				});
				await goto("/auth/login?callback=" + init.url.pathname);
			}
		}
		throw error;
	}
}
