import { writable, derived } from 'svelte/store';

const translations = {
    ru: { cpu: "Процессор", ram: "Память", disk: "Диск", close: "Закрыть" },
    en: { cpu: "Processor", ram: "Memory", disk: "Disk", close: "Close" }
};

export const locale = writable('ru');

export const t = derived(locale, ($locale) => (key: string) => {
    return translations[$locale][key] || key;
});