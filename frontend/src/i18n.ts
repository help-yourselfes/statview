import { writable, derived } from 'svelte/store';

const translations = {
    ru: { cpu: "Процессор", ram: "Память", disk: "Диск", close: "Закрыть" },
    en: { cpu: "Processor", ram: "Memory", disk: "Disk", close: "Close" }
};

export const locale = writable('ru');

type Lang = keyof typeof translations;
type Key = keyof (typeof translations)[Lang];
type Translation = (lang: Lang, key: Key) => (typeof translations)[Lang][Key];

export const t = derived(locale, ($locale) => (key: Key) => {
    return translations[$locale][key] as Translation || key;
});