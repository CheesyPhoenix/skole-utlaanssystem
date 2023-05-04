import { writable, type Writable } from "svelte/store";

export const adminTeacherTab: Writable<"REQUESTS" | "TEACHERS"> =
	writable("REQUESTS");
