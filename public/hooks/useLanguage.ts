"use client";
import { useSyncExternalStore } from "react";
type Lang = "pt" | "en";
const languageEvent = "ena-language-change";
let memoryLanguage: Lang = "pt";
function subscribe(listener: () => void) {
    window.addEventListener("storage", listener);
    window.addEventListener(languageEvent, listener);
    return () => {
        window.removeEventListener("storage", listener);
        window.removeEventListener(languageEvent, listener);
    };
}
function getSnapshot(): Lang {
    try {
        const saved = localStorage.getItem("language");
        return saved === "en" || saved === "pt" ? saved : memoryLanguage;
    }
    catch {
        return memoryLanguage;
    }
}
function getServerSnapshot(): Lang { return "pt"; }
export function useLanguage() {
    const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const setLang = (newLang: Lang) => {
        memoryLanguage = newLang;
        try {
            localStorage.setItem("language", newLang);
        }
        catch { /* Preserve switching when storage is unavailable. */ }
        window.dispatchEvent(new Event(languageEvent));
    };
    return { lang, setLang };
}
