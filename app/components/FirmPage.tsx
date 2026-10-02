"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../public/hooks/useLanguage";
import Navbar, { Brand, routes } from "./Navbar";
import { copy, members, practices, type Locale, type PageKind } from "./site-content";
gsap.registerPlugin(ScrollTrigger);
const architecture = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85";
export default function FirmPage({ page }: {
    page: PageKind;
}) {
    const { lang, setLang } = useLanguage();
    const root = useRef<HTMLDivElement>(null);
    const t = copy[lang];
    useEffect(() => { document.documentElement.lang = lang; }, [lang]);
    useEffect(() => {
        const element = root.current;
        if (!element) return;
        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
            const select = gsap.utils.selector(element);
            gsap.timeline({ defaults: { ease: "power2.out", duration: .8 } })
                .from(select(".hero-caption, .hero-title, .hero-copy, .hero-actions"),
                    { y: 24, opacity: 0, stagger: .12, clearProps: "transform,opacity" });

            // Scale leaves room for the photo to move without exposing its edges.
            gsap.fromTo(select(".hero-image"), { scale: 1.14, yPercent: -4 }, {
                yPercent: 4, ease: "none",
                scrollTrigger: { trigger: element.querySelector(".hero"), start: "top top", end: "bottom top", scrub: 1 }
            });
            select(".intro-section, .section-heading, .feature-copy, .contact-grid").forEach((section: HTMLElement) => {
                gsap.from(section, {
                    y: 28, opacity: 0, duration: .8, ease: "power2.out", clearProps: "transform,opacity",
                    scrollTrigger: { trigger: section, start: "top 90%", once: true }
                });
            });
            // Each row has its own trigger, including rows stacked on mobile.
            select(".team-member, .practice-item, .principles-grid article, .outcomes-grid article, .steps article").forEach((item: HTMLElement) => {
                gsap.from(item, {
                    y: 22, opacity: 0, duration: .7, ease: "power2.out", clearProps: "transform,opacity",
                    scrollTrigger: { trigger: item, start: "top 94%", once: true }
                });
            });
            select(".feature-image img").forEach((photo: HTMLElement) => {
                gsap.fromTo(photo, { scale: 1.12, yPercent: -3 }, {
                    yPercent: 3, ease: "none",
                    scrollTrigger: { trigger: photo.parentElement, start: "top bottom", end: "bottom top", scrub: 1 }
                });
            });
            gsap.from(select(".approach-line"), {
                scaleX: 0, transformOrigin: "left center", ease: "none",
                scrollTrigger: { trigger: element.querySelector(".approach"), start: "top 85%", end: "top 40%", scrub: .6 }
            });
        }, element);
        const refresh = () => ScrollTrigger.refresh();
        element.addEventListener("load", refresh, true);
        element.addEventListener("toggle", refresh, true);
        let active = true;
        void document.fonts.ready.then(() => { if (active) refresh(); });
        refresh();
        return () => {
            active = false;
            element.removeEventListener("load", refresh, true);
            element.removeEventListener("toggle", refresh, true);
            media.revert();
        };
    }, [page, lang]);
    const heading = page === "home" ? t.intro : page === "practice" ? t.practiceTitle : page === "team" ? t.teamTitle : page === "about" ? t.aboutTitle : t.resultsTitle;
    const lead = page === "home" ? t.lead : page === "practice" ? t.practiceLead : page === "team" ? t.teamLead : page === "about" ? t.aboutLead : t.resultsLead;
    const whatsapp = `https://wa.me/258844906000?text=${encodeURIComponent(t.message)}`;
    return <div ref={root} className={`site page-${page}`}>
    <a className="skip-link" href="#main">{t.skip}</a><Navbar lang={lang} setLang={setLang}/><main id="main">
    <section className={`hero ${page === "home" ? "hero-home" : "hero-inner"}`}>
    <div className="hero-photo"><Image className="hero-image" src={architecture} alt={lang === "pt" ? "Linhas arquitetónicas de um edifício contemporâneo" : "Architectural lines of a contemporary building"} fill priority sizes="(max-width: 760px) 100vw, 58vw"/><div className="photo-overlay"/></div>
    <div className="hero-content"><p className="hero-caption">{t.location}</p><h1 className="hero-title">{heading}</h1><p className="hero-copy">{lead}</p><div className="hero-actions"><a className="button button-brass" href="#contact">{t.consult}</a>{page === "home" && <Link className="text-link hero-secondary" href="/practice">{t.explore}</Link>}</div></div>
    <div className="hero-bottom"><span>ENA Advogados & Consultores</span><a href="#overview">{t.scroll}</a></div></section>
    <div className="trust-strip"><span>{lang === "pt" ? "Conhecimento local. Visão estratégica." : "Local knowledge. Strategic thinking."}</span><span>{lang === "pt" ? "Pessoas e empresas" : "People and businesses"}</span><span>Moçambique</span></div>
    {page === "home" && <><section className="intro-section container" id="overview"><div><p className="section-label">{t.nav[3]}</p><h2>{t.promise}</h2></div><div className="intro-text"><p>{t.promiseText}</p><Link className="text-link" href="/about">{t.aboutLink}</Link></div></section><PracticeSection lang={lang} preview/><section className="firm-feature container"><div className="feature-image"><Image src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85" alt={lang === "pt" ? "Espaço de trabalho luminoso" : "A light-filled workspace"} fill sizes="(max-width: 760px) 100vw, 50vw"/></div><div className="feature-copy"><p className="section-label">{t.nav[4]}</p><h2>{t.teamTitle}</h2><p>{t.teamLead}</p><Link className="text-link" href="/team">{t.teamLink}</Link></div></section></>}
    {page === "practice" && <PracticeSection lang={lang}/>}
    {page === "team" && <section className="team-section container" id="overview"><div className="section-heading"><p className="section-label">{t.nav[4]}</p><p>{t.teamLead}</p></div><div className="team-grid">{members.map(member => <article className="team-member" key={member.name}><div className={`member-portrait ${member.image ? "" : "monogram-portrait"}`}>{member.image ? <Image src={member.image} alt={member.name} fill sizes="(max-width: 760px) 100vw, 33vw"/> : <span aria-hidden="true">{member.initials}</span>}</div><div className="member-info"><h2>{member.name}</h2><p>{member[lang]}</p><a href="mailto:enkutumula@enaadvogados.co.mz" aria-label={`${t.email}: ${member.name}`}>{t.email}</a></div></article>)}</div></section>}
    {page === "about" && <section className="about-section container" id="overview"><div className="section-heading"><h2>{t.promise}</h2><p>{t.promiseText}</p></div><div className="principles-grid">{t.principles.map((title, i) => <article key={title}><h3>{title}</h3><p>{t.principleText[i]}</p></article>)}</div></section>}
    {page === "results" && <section className="results-section container" id="overview"><div className="section-heading"><h2>{t.approach}</h2><p>{t.resultsLead}</p></div><div className="outcomes-grid">{t.outcomes.map((title, i) => <article key={title}><h3>{title}</h3><p>{t.outcomeText[i]}</p></article>)}</div><p className="results-note">{t.resultsNote}</p></section>}
    <section className="approach container"><div className="section-heading"><p className="section-label">{t.approach}</p><h2>{t.promise}</h2></div><div className="approach-line"/><div className="steps">{t.steps.map((step, i) => <article key={step}><span className="step-number">0{i + 1}</span><h3>{step}</h3><p>{t.stepText[i]}</p></article>)}</div></section>
    <section className="contact-section" id="contact"><div className="container contact-grid"><div><p className="section-label">{t.nav[3]} / {lang === "pt" ? "Contacto" : "Contact"}</p><h2>{t.contactTitle}</h2><p className="contact-lead">{t.contactText}</p><a className="button button-brass" href={whatsapp} target="_blank" rel="noopener noreferrer">{t.whatsapp}</a></div><div className="contact-details"><div><p>{t.email}</p><a href="mailto:enkutumula@enaadvogados.co.mz">enkutumula@enaadvogados.co.mz</a></div><div><p>{t.phone}</p><a href="tel:+258844906000">+258 84 490 6000</a></div><div className="contact-location"><span className="location-dot"/>Moçambique <span>PT / EN</span></div></div></div></section>
    </main><footer className="site-footer container"><div className="footer-top"><Brand /><nav aria-label={lang === "pt" ? "Navegação de rodapé" : "Footer navigation"}>{routes.slice(1).map((route, i) => <Link key={route} href={route}>{t.nav[i + 1]}</Link>)}</nav><a className="back-top" href="#main" aria-label={lang === "pt" ? "Voltar ao topo" : "Back to top"}>{lang === "pt" ? "Voltar ao topo" : "Back to top"}</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ENA. {t.rights}</span><span>Advogados & Consultores</span></div></footer></div>;
}
function PracticeSection({ lang, preview = false }: {
    lang: Locale;
    preview?: boolean;
}) {
    const t = copy[lang];
    return <section className={`practice-section ${preview ? "practice-preview" : ""}`} id={preview ? "expertise" : "overview"}><div className="container"><div className="section-heading"><div><p className="section-label">{t.nav[1]}</p><h2>{t.practiceTitle}</h2></div>{preview ? <Link className="text-link" href="/practice">{t.allPractice}</Link> : <p>{t.practiceLead}</p>}</div><div className="practice-list">{practices.slice(0, preview ? 4 : undefined).map(practice => <details className="practice-item" key={practice.en}><summary><h3>{practice[lang]}</h3><span className="practice-plus" aria-hidden="true">+</span></summary><p>{lang === "pt" ? practice.textPt : practice.textEn}</p><a className="text-link" href="#contact">{t.consult}</a></details>)}</div></div></section>;
}
