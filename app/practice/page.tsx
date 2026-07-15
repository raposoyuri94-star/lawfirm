"use client";

import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";

type Lang = "pt" | "en";

interface PracticeArea {
  title: string;
  text: string;
}

interface Dictionary {
  title: string;
  eyebrow: string;
  navHome: string;
  navPractice: string;
  navResults: string;
  navAbout: string;
  navTeam: string;
  navCta: string;
  pageTag: string;
  description: string;
  areas: PracticeArea[];
  back: string;
  ctaLabel: string;
}

const translations: Record<Lang, Dictionary> = {
  pt: {
    title: "Áreas de Atuação",
    eyebrow: "Especialidades jurídicas",
    navHome: "Início",
    navPractice: "Áreas de Atuação",
    navResults: "Resultados",
    navAbout: "Sobre",
    navTeam: "Equipe",
    navCta: "Agendar Consulta",
    pageTag: "Especialidades jurídicas",
    description:
      "Atuamos em serviços jurídicos estratégicos com foco em resultados, proteção patrimonial e apoio em momentos decisivos.",
    areas: [
      { title: "Litígios Empresariais", text: "Defesa e negociação em disputas corporativas e comerciais." },
      { title: "Transações Imobiliárias", text: "Assessoria completa em compra, venda e contratos imobiliários." },
      { title: "Direito de Família", text: "Acompanhamento sensível em casos de divórcio, guarda e sucessões." },
      { title: "Direitos Sucessórios", text: "Estratégias para proteger património e gerir heranças." },
      { title: "Direito Administrativo", text: "Estratégias para proteger património e gerir heranças." },
    ],
    back: "Voltar para a página inicial",
    ctaLabel: "Agendar uma Consulta",
  },
  en: {
    title: "Practice Areas",
    eyebrow: "Legal specialties",
    navHome: "Home",
    navPractice: "Practice Areas",
    navResults: "Results",
    navAbout: "About",
    navTeam: "Our Team",
    navCta: "Book a Consultation",
    pageTag: "Legal specialties",
    description:
      "We provide strategic legal services focused on results, asset protection, and support in critical moments.",
    areas: [
      { title: "Corporate Litigation", text: "Defense and negotiation in commercial and corporate disputes." },
      { title: "Real Estate Transactions", text: "Full support for property purchases, sales, and contracts." },
      { title: "Family Law", text: "Sensitive guidance in divorce, custody, and succession cases." },
      { title: "Succession Rights", text: "Strategies to protect assets and manage inheritances." },
      {title: "Administrative Law", text: "Legal guidance on administrative procedures, regulatory compliance, and representation before public authorities."}
    ],
    back: "Back to Home",
    ctaLabel: "Book a Consultation",
  },
};

const AREA_ICONS = [
  <svg key="briefcase" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>,
  <svg key="home" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l9-7 9 7" />
    <path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" />
  </svg>,
  <svg key="family" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="7" r="3" />
    <circle cx="17" cy="8" r="2.4" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <path d="M15 14.2c2.6.3 4.5 2.5 4.5 5.3" />
  </svg>,
  <svg key="scroll" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h9l3 3v15H6z" />
    <path d="M15 3v3h3" />
    <path d="M9 12h6M9 16h6" />
  </svg>,
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const supportsIntersection = typeof window !== "undefined" && "IntersectionObserver" in window;
  const [inView, setInView] = useState(() => !supportsIntersection);

  useEffect(() => {
    if (!supportsIntersection) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [supportsIntersection]);

  return [ref, inView] as const;
}

export default function PracticePage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("pt");
  const dict = translations[lang];

  const [heroRef, heroInView] = useInView<HTMLElement>();
  const [gridRef, gridInView] = useInView<HTMLDivElement>();
  const [ctaRef, ctaInView] = useInView<HTMLElement>();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="page">
      <Navbar
        lang={lang}
        setLang={setLang}
        labels={{
          navHome: dict.navHome,
          navPractice: dict.navPractice,
          navResults: dict.navResults,
          navAbout: dict.navAbout,
          navTeam: dict.navTeam,
          navCta: dict.navCta,
          pageTag: dict.pageTag,
        }}
      />

      <main className="page-main wrap">
        <section ref={heroRef} className={`hero-panel reveal ${heroInView ? "is-visible" : ""}`}>
          <div className="hero-panel__glow" aria-hidden="true" />
          <span className="eyebrow">{dict.eyebrow}</span>
          <h1>{dict.title}</h1>
          <p className="lead">{dict.description}</p>
        </section>

        <section
          ref={gridRef}
          className={`practice-grid reveal-stagger ${gridInView ? "is-visible" : ""}`}
          aria-label={dict.title}
        >
          {dict.areas.map((area, index) => (
            <article key={area.title} className="practice-card">
              <div className="practice-card__tab" aria-hidden="true" />
              <div className="practice-card__body">
                <div className="practice-card__top">
                  <div className="practice-card__icon">{AREA_ICONS[index % AREA_ICONS.length]}</div>
                  <span className="practice-card__index">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h2>{area.title}</h2>
                <p>{area.text}</p>
                <div className="practice-card__underline" aria-hidden="true" />
              </div>
            </article>
          ))}
        </section>

        <section ref={ctaRef} className={`cta-panel reveal ${ctaInView ? "is-visible" : ""}`}>
          <div className="cta-panel__glow" aria-hidden="true" />
          <div className="cta-panel__text">
            <p className="eyebrow eyebrow--light">{dict.pageTag}</p>
            <h2>{dict.ctaLabel}</h2>
          </div>
          <div className="cta-panel__actions">
            <button type="button" className="btn-primary" onClick={() => router.push("/#contact")}>{dict.ctaLabel}</button>
            <button type="button" className="btn-ghost" onClick={() => router.push("/")}> 
              <span className="btn-ghost__arrow" aria-hidden="true">←</span>
              {dict.back}
            </button>
          </div>
        </section>
      </main>

      <style jsx>{`
        :global(:root) {
          --ink-900: #241813;
          --ink-800: #2f2019;
          --ink-700: #3e2c21;
          --brass-500: #c9a227;
          --brass-400: #dec873;
          --paper-100: #edebe7;
          --paper-000: #f8f7f5;
          --slate-700: #3a3632;
          --slate-500: #756e66;
          --slate-300: #aba59c;
          --line: #ddd7cf;
        }

        .page {
          min-height: 100vh;
          background: linear-gradient(180deg, var(--paper-000), var(--paper-100));
        }

        .wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }

        .page-main {
          padding-top: 40px;
        }

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.8s cubic-bezier(0.22, 0.61, 0.36, 1),
            transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-stagger > :global(*) {
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1),
            transform 0.7s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .reveal-stagger.is-visible > :global(*) {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-stagger.is-visible > :global(*:nth-child(1)) {
          transition-delay: 0.05s;
        }
        .reveal-stagger.is-visible > :global(*:nth-child(2)) {
          transition-delay: 0.15s;
        }
        .reveal-stagger.is-visible > :global(*:nth-child(3)) {
          transition-delay: 0.25s;
        }
        .reveal-stagger.is-visible > :global(*:nth-child(4)) {
          transition-delay: 0.35s;
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal,
          .reveal-stagger > :global(*) {
            transition: none;
            opacity: 1;
            transform: none;
          }
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--brass-500);
        }
        .eyebrow::before {
          content: "";
          width: 22px;
          height: 1px;
          background: var(--brass-500);
          display: inline-block;
        }
        .eyebrow--light {
          color: var(--brass-400);
        }

        .hero-panel {
          position: relative;
          overflow: hidden;
          background: linear-gradient(160deg, var(--ink-800), var(--ink-900) 75%);
          border-radius: 28px;
          padding: 56px 48px;
          color: #fff;
        }
        .hero-panel__glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(480px 260px at 90% 0%, rgba(201, 162, 39, 0.16), transparent 70%);
          pointer-events: none;
        }
        .hero-panel h1 {
          position: relative;
          margin: 14px 0 0;
          font-size: clamp(2rem, 3.4vw, 2.8rem);
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.01em;
        }
        .hero-panel .lead {
          position: relative;
          margin: 18px 0 0;
          max-width: 62ch;
          line-height: 1.85;
          color: var(--slate-300);
        }

        .practice-grid {
          display: grid;
          gap: 22px;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          margin: 40px 0 48px;
        }

        .practice-card {
          position: relative;
          padding-top: 18px;
        }
        .practice-card__tab {
          position: absolute;
          top: 0;
          left: 20px;
          width: 46%;
          height: 18px;
          background: var(--paper-100);
          border: 1px solid var(--line);
          border-bottom: none;
          border-radius: 12px 12px 0 0;
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .practice-card__body {
          position: relative;
          height: 100%;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 4px 20px 20px 20px;
          padding: 26px 24px 28px;
          box-shadow: 0 18px 40px -30px rgba(36, 24, 19, 0.24);
          transition:
            transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1),
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }
        .practice-card:hover .practice-card__body {
          transform: translateY(-8px);
          box-shadow: 0 28px 54px -26px rgba(36, 24, 19, 0.32);
          border-color: var(--brass-500);
        }
        .practice-card:hover .practice-card__tab {
          background: var(--brass-400);
          border-color: var(--brass-500);
        }

        .practice-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .practice-card__icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(201, 162, 39, 0.12);
          border: 1px solid rgba(201, 162, 39, 0.3);
          color: var(--brass-500);
          transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
        }
        .practice-card__icon :global(svg) {
          width: 20px;
          height: 20px;
        }
        .practice-card:hover .practice-card__icon {
          background: var(--ink-900);
          color: var(--brass-400);
          transform: rotate(-6deg) scale(1.05);
        }
        .practice-card__index {
          font-family: "IBM Plex Mono", ui-monospace, monospace;
          font-size: 12px;
          font-weight: 600;
          color: var(--slate-300);
        }

        .practice-card h2 {
          margin: 0 0 10px;
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--ink-900);
        }
        .practice-card p {
          margin: 0;
          line-height: 1.8;
          color: var(--slate-500);
          font-size: 14.5px;
        }
        .practice-card__underline {
          margin-top: 18px;
          height: 2px;
          width: 32px;
          background: var(--brass-500);
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .practice-card:hover .practice-card__underline {
          width: 64px;
        }

        .cta-panel {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          background: linear-gradient(155deg, var(--ink-800), var(--ink-900));
          border-radius: 28px;
          padding: 40px 44px;
        }
        .cta-panel__glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(420px 220px at 10% 110%, rgba(201, 162, 39, 0.18), transparent 70%);
          pointer-events: none;
        }
        .cta-panel__text,
        .cta-panel__actions {
          position: relative;
        }
        .cta-panel h2 {
          margin: 8px 0 0;
          color: #fff;
          font-size: 1.5rem;
          font-weight: 600;
        }
        .cta-panel__actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 26px;
          border-radius: 999px;
          border: none;
          background: var(--brass-500);
          color: var(--ink-900);
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .btn-primary:hover {
          background: var(--brass-400);
          transform: translateY(-2px);
        }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 22px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: transparent;
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .btn-ghost:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }
        .btn-ghost__arrow {
          display: inline-block;
          transition: transform 0.2s ease;
        }
        .btn-ghost:hover .btn-ghost__arrow {
          transform: translateX(-4px);
        }

        @media (max-width: 720px) {
          .hero-panel,
          .cta-panel {
            padding: 32px 26px;
          }
          .cta-panel {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
