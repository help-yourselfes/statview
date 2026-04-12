import { writable } from 'svelte/store';
import { GetStats } from "../wailsjs/go/main/App";

const MAX_LENGTH = 20;

export const cpu = writable(new Array(MAX_LENGTH).fill(0));
function updateCpu(value: number) {
    cpu.update(arr => [...arr, value].slice(-MAX_LENGTH))
}

export const ram = writable(new Array(MAX_LENGTH).fill(0));
function updateRam(value: number) {
    ram.update(arr => [...arr, value].slice(-MAX_LENGTH))
}


export function startMonitoring(ms = 1000) {
    const interval = setInterval(async () => {
        const res = await GetStats();
        updateCpu(Math.round(res.cpu))
        updateRam(res.ram)
    }, ms);

    return () => clearInterval(interval);
}