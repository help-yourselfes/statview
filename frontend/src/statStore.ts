import { derived, get, readable, writable } from 'svelte/store';
import { EventsEmit, EventsOn, LogError } from '../wailsjs/runtime'
import { main } from '../wailsjs/go/models';
import { GetInfo } from '../wailsjs/go/main/App';

const MAX_LENGTH = 30;

function graphArray<T = number>(maxLength = 10) {
    const { subscribe, update } = writable(new Array<T>(maxLength));
    const current = derived({ subscribe }, (array) => array.at(-1))
    const push = (value: T) => {
        update(a => [...a, value].slice(-maxLength))
    }

    return { subscribe, current, push }
}


export const cpuHistory = graphArray(MAX_LENGTH)
export const ramHistory = ramArray(MAX_LENGTH)
export const diskHistory = graphArray(MAX_LENGTH)

export const info = writable<main.Info>()
export const maxRam = derived(info, (info) => info?.['ram-max'])

function ramArray(maxLength = 10) {
    const { push: _push, subscribe } = graphArray(maxLength)
    const _cur = writable(0)
    const current = derived(_cur, (v) => v)

    const push = (value: number) => {
        _cur.set(value)
        _push(value / get(maxRam) * 100) // convert to %
    }
    return { current, push, subscribe }
}
export const started = writable(false)  

export async function setup() {
    try {
        info.set(await GetInfo())
        connectMonitor()
        started.set(true)
    } catch (e) {
        LogError(e)
    }
}
export function connectMonitor() {
    EventsOn("monitor:update-stats", (stats: main.Stats) => {
        cpuHistory.push(Math.round(stats.cpu))
        ramHistory.push(stats.ram)
        diskHistory.push(Math.round(stats.disk))
    })
    EventsEmit("monitor:connected")
}