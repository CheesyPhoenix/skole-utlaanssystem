import { writable, type Writable } from "svelte/store";

export const deviceTypeTab: Writable<"DEVICES" | "ADDONS"> =
	writable("DEVICES");
