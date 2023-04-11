import { devices } from "./routes/devices";
import { t } from "./t";

export const router = t.router({
	devices,
});

export type Router = typeof router;
