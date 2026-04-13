import { writable } from 'svelte/store';
import { GetStats } from "../wailsjs/go/main/App";
import {EventsOn} from '../wailsjs/runtime'
import { main } from '../wailsjs/go/models';

const MAX_LENGTH = 20;

function graphArray<T = number>(maxLength = 10) {
    const array = writable(new Array<T>(maxLength));
    const push = (value: T) => {
        array.update(a => [...a, value].slice(-maxLength))
    }

    return { array, push }
}

export const cpuHistory = graphArray(MAX_LENGTH)
export const ramHistory = graphArray(MAX_LENGTH)

export function connectMonitor() {
    EventsOn("monitor:update-stats", (stats: main.Stats) => {
        cpuHistory.push(Math.round(stats.cpu))
        ramHistory.push(stats.ram)
    })
}

export function startMonitoring(ms = 1000) {
    const fn = async () => {
        const res = await GetStats();
        cpuHistory.push(Math.round(res.cpu))
        ramHistory.push(res.ram)
    }
    fn()
    const interval = setInterval(fn, ms);

    return () => clearInterval(interval);
}