"use client";

import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

const translations = {
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
      { title: "Taxa de satisfação", text: "Mais de 95% dos clientes recomendam o nosso escritório." },
      { title: "Resolução eficaz", text: "Negociamos acordos sólidos e estratégias vencedoras em litígios complexos." },
      { title: "Presença nacional", text: "Atuamos em várias capitais e tribunais de Moçambique." },
    ],
    back: "Voltar para a página inicial",
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
      { title: "Satisfaction rate", text: "More than 95% of clients recommend our firm." },
      { title: "Effective resolution", text: "We negotiate strong settlements and winning litigation strategies." },
      { title: "National reach", text: "We work across courts throughout Mozambique." },
    ],
    back: "Back to Home",
  },
};

export default function ResultsPage() {
  const router = useRouter();
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const dict = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="page wrap">
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

      <main className="page-main">
        <p className="lead">{dict.description}</p>

        <div className="results-grid">
          {dict.items.map((item) => (
            <article key={item.title} className="result-card">
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <button type="button" className="btn-primary" onClick={() => router.push("/")}>{dict.back}</button>
      </main>

      <style jsx>{`
        .page { padding: 40px 24px; }
        .page-header { margin-bottom: 32px; }
        .brand-row { display:flex; align-items:flex-end; justify-content:space-between; gap:16px; }
        .eyebrow { text-transform:uppercase; letter-spacing:.2em; font-size:12px; color:#C9A227; margin:0 0 12px; }
        h1 { margin:0; font-size:clamp(2.4rem,4vw,3.6rem); color:#241813; }
        .lead { max-width:730px; line-height:1.9; color:#3E2C21; margin:0 0 32px; }
        .results-grid { display:grid; gap:20px; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); margin-bottom:32px; }
        .result-card { background:#fff; border:1px solid #DDD7CF; border-radius:24px; padding:24px; box-shadow:0 18px 40px -30px rgba(36,24,19,.24); }
        .result-card h2 { margin:0 0 10px; color:#241813; }
        .result-card p { margin:0; line-height:1.8; color:#756E66; }
        .btn-primary { display:inline-flex; align-items:center; justify-content:center; padding:14px 24px; border-radius:999px; background:#241813; color:#fff; font-weight:700; text-decoration:none; }
        .lang-toggle { display:flex; gap:6px; }
        .lang-toggle button { border:1px solid #DDD7CF; background:#fff; padding:8px 14px; border-radius:999px; font-weight:700; color:#3E2C21; }
        .lang-toggle button.active { background:#241813; color:#fff; border-color:transparent; }
      `}</style>
    </div>
  );
}
