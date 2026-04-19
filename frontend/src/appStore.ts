import { derived, writable } from "svelte/store";
import { cpuHistory, diskHistory, ramHistory } from "./statStore";

export const activeGraphType = writable<graphType>("cpu")

export const activeGraph = derived(activeGraphType, (type, set) => {
    const stores = {
        cpu: cpuHistory,
        ram: ramHistory,
        disk: diskHistory
    }
    return stores[type].subscribe(set)
}, [] as number[])

export const graphColor = (type: graphType): ThemeColor => {
    switch (type) {
        case "cpu": return 'green'
        case "ram": return 'red'
        case "disk": return 'cyan'
    }
}

export const activeColor = derived(activeGraphType, (type) => graphColor(type))