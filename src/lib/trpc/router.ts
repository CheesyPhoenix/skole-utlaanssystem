import { docs } from "./routes/docs";
import { t } from "./t";

export const router = t.router({
	docs,
});

export type Router = typeof router;
