"use client";

import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";

type Lang = "pt" | "en";

interface TeamMember {
  initials: string;
  name: string;
  role: string;
  image?: string;
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
  members: TeamMember[];
  back: string;
  ctaLabel: string;
}

const translations: Record<Lang, Dictionary> = {
  pt: {
    title: "Nossa Equipa Jurídica",
    eyebrow: "Conheça os nossos advogados",
    navHome: "Início",
    navPractice: "Áreas de Atuação",
    navResults: "Resultados",
    navAbout: "Sobre",
    navTeam: "Equipe",
    navCta: "Agendar Consulta",
    pageTag: "Conheça os nossos advogados",
    description:
      "Cada membro da equipa traz experiência sólida e atenção personalizada para acompanhar o seu caso.",
    members: [
      {
        initials: "LK",
        name: "Dra. Lizzy NK",
        role: "Advogada especialista em Direito de Família",
        image: "/hammer-justice.svg",
      },
      {
        initials: "AK",
        name: "Dr. Angelo NK",
        role: "Advogado em Litígios Empresariais",
        image: "/Angelo.jpeg",
      },
      {
        initials: "JR",
        name: "Dr. Jeff R.",
        role: "Especialista em Transações Imobiliárias",
        image: "/globe.svg",
      },
    ],
    back: "Voltar para a página inicial",
    ctaLabel: "Agendar uma Consulta",
  },
  en: {
    title: "Our Legal Team",
    eyebrow: "Meet our attorneys",
    navHome: "Home",
    navPractice: "Practice Areas",
    navResults: "Results",
    navAbout: "About",
    navTeam: "Our Team",
    navCta: "Book a Consultation",
    pageTag: "Meet our attorneys",
    description:
      "Each team member brings deep experience and personalized attention to support your case.",
    members: [
      { initials: "LK", name: "Dra. Lizzy NK", role: "Family Law attorney", image: "/team/lizzy.jpg" },
      { initials: "AK", name: "Dr. Angelo NK", role: "Corporate Litigation attorney", image: "/team/angelo.jpg" },
      { initials: "JR", name: "Dr. Jeff R.", role: "Real Estate Transactions specialist", image: "/team/jeff.jpg" },
    ],
    back: "Back to Home",
    ctaLabel: "Book a Consultation",
  },
};

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const supportsIntersection = typeof window !== "undefined" && "IntersectionObserver" in window;
  const [inView, setInView] = useState(false);

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

function TeamPhoto({ member }: { member: TeamMember }) {
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(member.image) && !failed;

  return (
    <div className="team-photo">
      {showPhoto ? (
        <img
          src={member.image}
          alt={member.name}
          className="team-photo__img"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="team-photo__fallback" aria-hidden="true">
          {member.initials}
        </div>
      )}
      <div className="team-photo__overlay" aria-hidden="true" />
    </div>
  );
}

export default function TeamPage() {
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
          className={`team-grid reveal-stagger ${gridInView ? "is-visible" : ""}`}
          aria-label={dict.title}
        >
          {dict.members.map((member, index) => (
            <article key={member.name} className="team-card">
              <TeamPhoto member={member} />
              <div className="team-card__body">
                <span className="team-card__index">{String(index + 1).padStart(2, "0")}</span>
                <h2>{member.name}</h2>
                <p>{member.role}</p>
                <div className="team-card__underline" aria-hidden="true" />
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

        .team-grid {
          display: grid;
          gap: 24px;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          margin: 40px 0 48px;
        }

        .team-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 24px;
          overflow: hidden;
          min-height: 520px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 18px 40px -30px rgba(36, 24, 19, 0.24);
          transition: transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .team-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 56px -26px rgba(36, 24, 19, 0.34);
          border-color: var(--brass-500);
        }

        .team-photo {
          position: relative;
          width: 100%;
          height: 340px;
          min-height: 320px;
          background: linear-gradient(160deg, var(--ink-800), var(--ink-900));
          overflow: hidden;
        }
        .team-photo :global(.team-photo__img) {
          object-fit: cover;
          filter: grayscale(65%) contrast(1.03);
          transform: scale(1.02);
          transition: filter 0.5s ease, transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .team-card:hover .team-photo :global(.team-photo__img) {
          filter: grayscale(0%) contrast(1.03);
          transform: scale(1.08);
        }
        .team-photo__fallback {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Fraunces", serif;
          font-weight: 600;
          font-size: 2.4rem;
          color: var(--brass-400);
          letter-spacing: 0.04em;
        }
        .team-photo__overlay {
          position: absolute;
          inset: auto 0 0 0;
          height: 55%;
          background: linear-gradient(180deg, transparent, rgba(36, 24, 19, 0.75));
          pointer-events: none;
        }

        .team-card__body {
          position: relative;
          padding: 22px 22px 26px;
        }
        .team-card__index {
          position: absolute;
          top: -34px;
          right: 20px;
          font-family: "IBM Plex Mono", ui-monospace, monospace;
          font-size: 12px;
          font-weight: 600;
          color: var(--brass-400);
          background: rgba(36, 24, 19, 0.55);
          padding: 4px 9px;
          border-radius: 999px;
          backdrop-filter: blur(2px);
        }
        .team-card h2 {
          margin: 0 0 8px;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--ink-900);
        }
        .team-card p {
          margin: 0;
          color: var(--slate-500);
          line-height: 1.7;
          font-size: 14.5px;
        }
        .team-card__underline {
          margin-top: 16px;
          height: 2px;
          width: 32px;
          background: var(--brass-500);
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .team-card:hover .team-card__underline {
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
