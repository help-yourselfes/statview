import { derived, writable } from 'svelte/store';
import { EventsOn } from '../wailsjs/runtime'
import { GetInfo } from '../wailsjs/go/main/App'
import { main } from '../wailsjs/go/models';

const MAX_LENGTH = 60;

function graphArray<T = number>(maxLength = 10) {
    const { subscribe, update } = writable(new Array<T>(maxLength));
    const push = (value: T) => {
        update(a => [...a, value].slice(-maxLength))
    }

    return { subscribe, push }
}

export const cpuHistory = graphArray(MAX_LENGTH)
export const ramHistory = graphArray(MAX_LENGTH)
export const diskHistory = graphArray(MAX_LENGTH)

export const info = writable<main.Info>()
export const maxRam = derived(info, (info) => info?.['ram-max'])

export const started = writable(false)

export async function setup() {
    connectMonitor()
    await updateInfo()
    started.set(true)
}

const updateInfo = () =>
    GetInfo().then(value => { 
        console.log(value)
        info.set(value) })

export function connectMonitor() {
    EventsOn("monitor:update-stats", (stats: main.Stats) => {
        cpuHistory.push(Math.round(stats.cpu))
        ramHistory.push(stats.ram)
        diskHistory.push(Math.round(stats.disk))
    })
}