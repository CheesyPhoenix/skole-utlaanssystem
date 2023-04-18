import { devices } from "./routes/devices";
import { login } from "./routes/login";
import { orders } from "./routes/orders";
import { users } from "./routes/users";
import { t } from "./t";

export const router = t.router({
	devices,
	login,
	orders,
	users,
});

export type Router = typeof router;
