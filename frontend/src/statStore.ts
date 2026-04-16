import { writable } from 'svelte/store';
import {EventsOn} from '../wailsjs/runtime'
import { main } from '../wailsjs/go/models';

const MAX_LENGTH = 20;

function graphArray<T = number>(maxLength = 10) {
    const {subscribe, update} = writable(new Array<T>(maxLength));
    const push = (value: T) => {
        update(a => [...a, value].slice(-maxLength))
    }

    return { subscribe, push }
}

export const cpuHistory = graphArray(MAX_LENGTH)
export const ramHistory = graphArray(MAX_LENGTH)

export function connectMonitor() {
    EventsOn("monitor:update-stats", (stats: main.Stats) => {
        cpuHistory.push(Math.round(stats.cpu))
        ramHistory.push(stats.ram)
    })
}