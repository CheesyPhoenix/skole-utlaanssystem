import { devices } from "./routes/devices";
import { auth } from "./routes/login";
import { orders } from "./routes/orders";
import { users } from "./routes/users";
import { t } from "./t";

export const router = t.router({
	devices,
	login: auth,
	orders,
	users,
});

export type Router = typeof router;
