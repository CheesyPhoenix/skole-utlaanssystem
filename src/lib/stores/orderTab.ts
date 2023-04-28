import { writable, type Writable } from "svelte/store";

export const orderTab: Writable<"ACTIVE" | "INACTIVE"> = writable("ACTIVE");
