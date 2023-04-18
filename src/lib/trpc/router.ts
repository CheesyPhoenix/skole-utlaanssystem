import { devices } from "./routes/devices";
import { auth } from "./routes/login";
import { orders } from "./routes/orders";
import { t } from "./t";

export const router = t.router({
	devices,
	login: auth,
	orders,
});

export type Router = typeof router;
