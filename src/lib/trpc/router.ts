import { devices } from "./routes/devices";
import { auth } from "./routes/auth";
import { orders } from "./routes/orders";
import { t } from "./t";

export const router = t.router({
	devices,
	auth,
	orders,
});

export type Router = typeof router;
