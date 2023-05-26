import { devices } from "./routes/devices";
import { auth } from "./routes/auth";
import { orders } from "./routes/orders";
import { users } from "./routes/users";
import { t } from "./t";
import { addons } from "./routes/addons";

export const router = t.router({
	devices,
	auth,
	orders,
	users,
	addons,
});

export type Router = typeof router;
