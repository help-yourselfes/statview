const translations = {
    ru: { cpu: "Процессор", ram: "Память", disk: "Диск", close: "Закрыть", cpu_cores: "Ядер", cpu_mhz: "Частота", mhz: "мГц", gb: "ГБ" },
    en: { cpu: "Processor", ram: "Memory", disk: "Disk", close: "Close", cpu_cores: "Cores", cpu_mhz: "Speed", mhz: "MHz", gb: "GB" }
};


type Lang = keyof typeof translations;
type Key = keyof (typeof translations)[Lang];
type Translation = (lang: Lang, key: Key) => (typeof translations)[Lang][Key];

const sysLang = navigator.language.split('-')[0]
export const locale = translations[sysLang] ? sysLang : 'en'

export const t = (key: Key) => {
    return translations[locale][key] as Translation || key;
}
