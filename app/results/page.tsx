"use client";

import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";

type Lang = "pt" | "en";

interface ResultItem {
  title: string;
  text: string;
  featured?: boolean;
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
  items: ResultItem[];
  back: string;
  ctaLabel: string;
}

const translations: Record<Lang, Dictionary> = {
  pt: {
    title: "Resultados",
    eyebrow: "Casos e conquistas",
    navHome: "Início",
    navPractice: "Áreas de Atuação",
    navResults: "Resultados",
    navAbout: "Sobre",
    navTeam: "Equipe",
    navCta: "Agendar Consulta",
    pageTag: "Casos e conquistas",
    description:
      "Nossa experiência se traduz em decisões favoráveis, acordos eficientes e clientes satisfeitos. Veja algumas das formas como entregamos resultados relevantes.",
    items: [
      { title: "95% de satisfação", text: "A esmagadora maioria dos nossos clientes recomenda o escritório a terceiros.", featured: true },
      { title: "Resolução eficaz", text: "Acordos sólidos em litígios corporativos complexos." },
      { title: "Presença nacional", text: "Atuação em várias capitais e tribunais de Moçambique." },
      { title: "Direito de família", text: "Acompanhamento sensível em divórcio e guarda." },
    ],
    back: "Voltar para a página inicial",
    ctaLabel: "Agendar uma Consulta",
  },
  en: {
    title: "Results",
    eyebrow: "Case outcomes",
    navHome: "Home",
    navPractice: "Practice Areas",
    navResults: "Results",
    navAbout: "About",
    navTeam: "Our Team",
    navCta: "Book a Consultation",
    pageTag: "Case outcomes",
    description:
      "Our experience means favorable decisions, efficient settlements, and satisfied clients. These are some of the ways we deliver meaningful results.",
    items: [
      { title: "95% satisfaction", text: "The vast majority of our clients recommend the firm to others.", featured: true },
      { title: "Effective resolution", text: "Strong settlements in complex corporate disputes." },
      { title: "National reach", text: "We work across courts throughout Mozambique." },
      { title: "Family law", text: "Sensitive guidance in divorce and custody cases." },
    ],
    back: "Back to Home",
    ctaLabel: "Book a Consultation",
  },
};
function useInView<T extends HTMLElement>() {

  const ref = useRef<T>(null);

  const [inView, setInView] = useState(true);


  useEffect(() => {

    const element = ref.current;

    if (!element) return;


    const observer = new IntersectionObserver(

      ([entry]) => {

        if (entry.isIntersecting) {

          setInView(true);

          observer.disconnect();

        }

      },

      {
        threshold: 0.15,
      }

    );


    observer.observe(element);


    return () => observer.disconnect();


  }, []);


  return [ref, inView] as const;

}


export default function ResultsPage() {
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
          className={`seal-grid reveal-stagger ${gridInView ? "is-visible" : ""}`}
          aria-label={dict.title}
        >
          {dict.items.map((item, index) => (
            <article
              key={item.title}
              className={`seal-card ${item.featured ? "seal-card--featured" : ""}`}
            >
              <div className="seal-card__ribbon" aria-hidden="true" />
              <div className="seal-card__body">
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
              <span className="seal-card__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
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
            <button type="button" className="btn-primary" onClick={() => router.push("/#contact")}>
              {dict.ctaLabel}
            </button>
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
          transform: translateY(20px) scale(0.97);
          transition:
            opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1),
            transform 0.7s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .reveal-stagger.is-visible > :global(*) {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .reveal-stagger.is-visible > :global(*:nth-child(1)) {
          transition-delay: 0.05s;
        }
        .reveal-stagger.is-visible > :global(*:nth-child(2)) {
          transition-delay: 0.18s;
        }
        .reveal-stagger.is-visible > :global(*:nth-child(3)) {
          transition-delay: 0.31s;
        }
        .reveal-stagger.is-visible > :global(*:nth-child(4)) {
          transition-delay: 0.44s;
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

        /* ---------- Result cards ---------- */

        .seal-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 22px;
          margin: 40px 0 48px;
        }

        .seal-card {
          position: relative;
          grid-column: span 3;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 30px 26px 26px;
          box-shadow: 0 18px 40px -30px rgba(36, 24, 19, 0.24);
          overflow: hidden;
          transition:
            transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1),
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }

        /* Featured card: same white surface, full-width, marked by a
           brass top rule instead of a dark fill or an icon */
        .seal-card--featured {
          grid-column: span 6;
          border-top: 3px solid var(--brass-500);
          padding-top: 27px;
        }
        .seal-card--featured .seal-card__body h2 {
          font-size: 1.5rem;
        }
        .seal-card--featured .seal-card__body p {
          max-width: 56ch;
        }

        .seal-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 28px 54px -26px rgba(36, 24, 19, 0.32);
          border-color: var(--brass-500);
        }
        .seal-card--featured:hover {
          border-top-color: var(--brass-400);
        }

        /* the "ribbon" — a torn strip of color hanging off the top edge,
           the only decorative flourish, no glyph inside it */
        .seal-card__ribbon {
          position: absolute;
          top: -10px;
          left: 26px;
          width: 26px;
          height: 52px;
          background: var(--brass-500);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%);
          opacity: 0.9;
          transform: rotate(-4deg);
          transition: transform 0.35s ease;
        }
        .seal-card:hover .seal-card__ribbon {
          transform: rotate(2deg) translateY(2px);
        }

        .seal-card__body {
          padding-top: 22px;
        }
        .seal-card__body h2 {
          margin: 0 0 8px;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--ink-900);
        }
        .seal-card__body p {
          margin: 0;
          line-height: 1.75;
          color: var(--slate-500);
          font-size: 14.5px;
        }

        .seal-card__index {
          position: absolute;
          right: 22px;
          bottom: 16px;
          font-family: "IBM Plex Mono", ui-monospace, monospace;
          font-size: 12px;
          font-weight: 600;
          color: var(--slate-300);
        }

        @media (max-width: 860px) {
          .seal-card,
          .seal-card--featured {
            grid-column: span 6;
          }
        }

        /* ---------- CTA ---------- */

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
