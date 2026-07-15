"use client";

import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";

type Lang = "pt" | "en";

interface AboutSection {
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
  sections: AboutSection[];
  back: string;
  ctaLabel: string;
}

const translations: Record<Lang, Dictionary> = {
  pt: {
    title: "Sobre o escritório",
    eyebrow: "Quem somos",
    navHome: "Início",
    navPractice: "Áreas de Atuação",
    navResults: "Resultados",
    navAbout: "Sobre",
    navTeam: "Equipe",
    navCta: "Agendar Consulta",
    pageTag: "Quem somos",
    description:
      "ENA é um escritório de advocacia que combina experiência jurídica com atendimento humano e estratégico. Trabalhamos para proteger os interesses dos nossos clientes em todos os ramos do direito.",
    sections: [
      {
        title: "Nossa abordagem",
        text: "Acreditamos em comunicação clara, gestão ativa de processos e soluções que respeitam o contexto de cada cliente. Estamos presentes em cada etapa do caso.",
      },
      {
        title: "Valores",
        text: "Ética, transparência e dedicação são a base do nosso trabalho. Buscamos resultados sólidos sem perder a proximidade com quem confia em nós.",
      },
    ],
    back: "Voltar para a página inicial",
    ctaLabel: "Agendar uma Consulta",
  },
  en: {
    title: "About the Firm",
    eyebrow: "Who we are",
    navHome: "Home",
    navPractice: "Practice Areas",
    navResults: "Results",
    navAbout: "About",
    navTeam: "Our Team",
    navCta: "Book a Consultation",
    pageTag: "Who we are",
    description:
      "ENA is a law firm that combines legal experience with a human, strategic approach. We protect our clients' interests across all areas of law.",
    sections: [
      {
        title: "Our approach",
        text: "We believe in clear communication, active case management, and solutions that reflect each client's circumstances. We support you at every stage.",
      },
      {
        title: "Values",
        text: "Ethics, transparency, and dedication are the foundation of our work. We pursue solid results while maintaining close client relationships.",
      },
    ],
    back: "Back to Home",
    ctaLabel: "Book a Consultation",
  },
};

const SECTION_ICONS: React.ReactElement[] = [
  <svg key="compass" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M15 9l-2.2 5.2L8 16l2.2-5.2z" />
  </svg>,
  <svg key="shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l7 3v6c0 4.5-3 7.9-7 9-4-1.1-7-4.5-7-9V6z" />
    <path d="M9.5 12l1.8 1.8L15 10" />
  </svg>,
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

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
  }, []);

  return [ref, inView] as const;
}

export default function AboutPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("pt");
  const dict = translations[lang];

  const [heroRef, heroInView] = useInView<HTMLElement>();
  const [gridRef, gridInView] = useInView<HTMLDivElement>();
  const [ctaRef, ctaInView] = useInView<HTMLElement>();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className={`page ${mounted ? "is-mounted" : ""}`}>
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
          className={`about-grid reveal-stagger ${gridInView ? "is-visible" : ""}`}
          aria-label={dict.title}
        >
          {dict.sections.map((section, index) => (
            <article key={section.title} className="about-card">
              <div className="about-card__top">
                <div className="about-card__icon">{SECTION_ICONS[index % SECTION_ICONS.length]}</div>
                <span className="about-card__index">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
              <div className="about-card__underline" aria-hidden="true" />
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
              <span className="btn-ghost__arrow" aria-hidden="true">
                ←
              </span>
              {dict.back}
            </button>
          </div>
        </section>
      </main>

      <style jsx>{`
        /* page fade-in */
        .page {
          opacity: 0;
          transition: opacity 420ms ease;
        }
        .page.is-mounted {
          opacity: 1;
        }

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
          max-width: 68ch;
          line-height: 1.85;
          color: var(--slate-300);
        }

        .about-grid {
          display: grid;
          gap: 22px;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          margin: 40px 0 48px;
        }

        .about-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 28px 26px;
          box-shadow: 0 18px 40px -30px rgba(36, 24, 19, 0.24);
          transition:
            transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1),
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }
        .about-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 28px 54px -26px rgba(36, 24, 19, 0.32);
          border-color: var(--brass-500);
        }

        .about-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }
        .about-card__icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(201, 162, 39, 0.12);
          border: 1px solid rgba(201, 162, 39, 0.3);
          color: var(--brass-500);
          transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
        }
        .about-card__icon :global(svg) {
          width: 21px;
          height: 21px;
        }
        .about-card:hover .about-card__icon {
          background: var(--ink-900);
          color: var(--brass-400);
          transform: rotate(-6deg) scale(1.05);
        }
        .about-card__index {
          font-family: "IBM Plex Mono", ui-monospace, monospace;
          font-size: 12px;
          font-weight: 600;
          color: var(--slate-300);
        }

        .about-card h2 {
          margin: 0 0 12px;
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--ink-900);
        }
        .about-card p {
          margin: 0;
          line-height: 1.85;
          color: var(--slate-500);
          font-size: 15px;
        }
        .about-card__underline {
          margin-top: 20px;
          height: 2px;
          width: 32px;
          background: var(--brass-500);
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .about-card:hover .about-card__underline {
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
