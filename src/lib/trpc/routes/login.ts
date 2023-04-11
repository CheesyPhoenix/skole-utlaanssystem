import { z } from "zod";
import { t } from "../t";

export const login = t.router({
	login: t.procedure
		.input(
			z.object({
				username: z.string().nonempty(),
				password: z.string().nonempty(),
			})
		)
		.query(({ input }) => {
			// TODO
		}),
});
