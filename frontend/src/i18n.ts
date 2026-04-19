const translations = {
    ru: { cpu: "Процессор", ram: "Память", disk: "Диск", close: "Закрыть", cpu_cores: "Ядер", cpu_mhz: "Частота", mhz: "мГц", gb: "ГБ" },
    en: { cpu: "Processor", ram: "Memory", disk: "Disk", close: "Close", cpu_cores: "Cores", cpu_mhz: "Speed", mhz: "MHz", gb: "GB" },
    sk: { cpu: "Procesor", ram: "Pamäť", disk: "Disk", close: "Zatvoriť", cpu_cores: "Jadrá", cpu_mhz: "Frekvencia", mhz: "MHz", gb: "GB" },

    // ии-шный перевод на другие языки
    es: { cpu: "Procesador", ram: "Memoria", disk: "Disco", close: "Cerrar", cpu_cores: "Núcleos", cpu_mhz: "Frecuencia", mhz: "MHz", gb: "GB" },       // испанский
    fr: { cpu: "Processeur", ram: "Mémoire", disk: "Disque", close: "Fermer", cpu_cores: "Cœurs", cpu_mhz: "Fréquence", mhz: "MHz", gb: "Go" },         // французский
    de: { cpu: "Prozessor", ram: "Arbeitsspeicher", disk: "Festplatte", close: "Schließen", cpu_cores: "Kerne", cpu_mhz: "Takt", mhz: "MHz", gb: "GB" },// немецкий
    pt: { cpu: "Processador", ram: "Memória", disk: "Disco", close: "Fechar", cpu_cores: "Núcleos", cpu_mhz: "Frequência", mhz: "MHz", gb: "GB" },      // португальский (PT/BR)
    it: { cpu: "Processore", ram: "Memoria", disk: "Disco", close: "Chiudi", cpu_cores: "Core", cpu_mhz: "Frequenza", mhz: "MHz", gb: "GB" },           // итальянский
    ja: { cpu: "プロセッサ", ram: "メモリ", disk: "ディスク", close: "閉じる", cpu_cores: "コア", cpu_mhz: "クロック", mhz: "MHz", gb: "GB" },                  // японский
    zh: { cpu: "处理器", ram: "内存", disk: "磁盘", close: "关闭", cpu_cores: "核心数", cpu_mhz: "频率", mhz: "MHz", gb: "GB" },                             // китайский (упр.)
    ko: { cpu: "프로세서", ram: "메모리", disk: "디스크", close: "닫기", cpu_cores: "코어", cpu_mhz: "클럭", mhz: "MHz", gb: "GB" },                          // корейский
    ar: { cpu: "المعالج", ram: "الذاكرة", disk: "القرص", close: "إغلاق", cpu_cores: "أنوية", cpu_mhz: "التردد", mhz: "ميجاهرتز", gb: "جيجابايت" },        // арабский
    nl: { cpu: "Processor", ram: "Geheugen", disk: "Schijf", close: "Sluiten", cpu_cores: "Kernen", cpu_mhz: "Kloksnelheid", mhz: "MHz", gb: "GB" },    // нидерландский
    sv: { cpu: "Processor", ram: "Minne", disk: "Disk", close: "Stäng", cpu_cores: "Kärnor", cpu_mhz: "Frekvens", mhz: "MHz", gb: "GB" },               // шведский
    tr: { cpu: "İşlemci", ram: "Bellek", disk: "Disk", close: "Kapat", cpu_cores: "Çekirdekler", cpu_mhz: "Frekans", mhz: "MHz", gb: "GB" },            // турецкий
};

type Lang = keyof typeof translations;
type Key = keyof (typeof translations)[Lang];
type Translation = (lang: Lang, key: Key) => (typeof translations)[Lang][Key];

const sysLang = navigator.language.split('-')[0]
export const locale = translations[sysLang] ? sysLang : 'en'

export const t = (key: Key) => {
    return translations[locale][key] as Translation || key;
}
