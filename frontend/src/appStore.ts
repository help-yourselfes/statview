import { writable } from "svelte/store";

export const activeGraph = writable<graphType>("cpu")