"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { copy, type Locale } from "./site-content";
export const routes = ["/", "/practice", "/results", "/about", "/team"];
export function Brand() {
    return <Link href="/" className="brand" aria-label="ENA. Home"><span className="brand-mark">ena<span>.</span></span><span className="brand-caption">Advogados<br />& Consultores</span></Link>;
}
export default function Navbar({ lang, setLang }: {
    lang: Locale;
    setLang: (lang: Locale) => void;
}) {
    const [open, setOpen] = useState(false);
    const panel = useRef<HTMLDivElement>(null);
    const toggle = useRef<HTMLButtonElement>(null);
    const pathname = usePathname();
    const t = copy[lang];
    useEffect(() => {
        if (!open || !panel.current)
            return;
        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.from(panel.current, { height: 0, opacity: 0, duration: .35, ease: "power2.out", clearProps: "all" });
        });
        const escape = (event: KeyboardEvent) => { if (event.key === "Escape") {
            setOpen(false);
            toggle.current?.focus();
        } };
        document.addEventListener("keydown", escape);
        return () => { media.revert(); document.removeEventListener("keydown", escape); };
    }, [open]);
    return <header className="site-header"><div className="header-inner"><Brand />
    <nav className="desktop-nav" aria-label={lang === "pt" ? "Navegação principal" : "Main navigation"}>{routes.map((route, i) => <Link key={route} href={route} aria-current={pathname === route ? "page" : undefined}>{t.nav[i]}</Link>)}</nav>
    <div className="header-actions"><div className="language" role="group" aria-label={lang === "pt" ? "Idioma" : "Language"}>{(["pt", "en"] as const).map(locale => <button type="button" key={locale} aria-pressed={lang === locale} onClick={() => { setLang(locale); setOpen(false); }}>{locale.toUpperCase()}</button>)}</div><Link className="header-contact" href="#contact">{lang === "pt" ? "Fale connosco" : "Get in touch"}</Link><button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls={open ? "mobile-navigation" : undefined} aria-label={open ? t.close : t.menu} onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button></div></div>
    {open && <div id="mobile-navigation" className="mobile-nav" ref={panel}><nav aria-label={lang === "pt" ? "Navegação móvel" : "Mobile navigation"}>{routes.map((route, i) => <Link href={route} key={route} aria-current={pathname === route ? "page" : undefined} onClick={() => setOpen(false)}>{t.nav[i]}</Link>)}<a href="#contact" onClick={() => setOpen(false)}>{t.consult}</a></nav></div>}
    </header>;
}
