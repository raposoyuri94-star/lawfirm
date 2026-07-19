"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

const translations = {
  pt: {
    tagline: "Assessoria jurídica de confiança",
    navHome: "Início",
    navPractice: "Áreas de Atuação",
    navResults: "Resultados",
    navAbout: "Sobre",
    navTeam: "Equipe",
    navCta: "Agendar Consulta",
    heroEyebrow: "Advocacia estratégica. Atenção pessoal.",
    heroTitleBefore: "Protegendo o que importa, com ",
    heroTitleEm: "clareza",
    heroTitleAfter: " e firmeza.",
    heroLead:
      "Desde litígios de alto risco até questões familiares delicadas, os nossos advogados oferecem orientação clara e representação firme quando cada decisão faz diferença.",
    heroCta1: "Agendar uma Consulta",
    heroCta2: "Conhecer as Áreas de Atuação",
    heroBadge: "anos de atuação",
    stats0: "Anos de experiência somada",
    stats1: "Taxa de satisfação dos clientes",
    stats2: "Casos conduzidos com atenção",
    practiceEyebrow: "Áreas de Atuação",
    practiceTitle: "Advogados experientes para os momentos mais importantes da vida.",
    practice0Title: "Litígios Empresariais",
    practice0Desc: "Assessoria focada em preparação, clareza e advocacia comprovada.",
    practice1Title: "Transações Imobiliárias",
    practice1Desc: "Contratos e negociações conduzidos com rigor técnico e atenção ao detalhe.",
    practice2Title: "Direito de Família",
    practice2Desc: "Acompanhamento sensível em momentos que exigem cuidado e discrição.",
    practice3Title: "Planeamento Sucessório",
    practice3Desc: "Proteção de património e planeamento pensado para gerações futuras.",
    whyEyebrow: "Por que os clientes nos escolhem",
    whyTitle: "Orientação serena, ação decisiva e preparação incansável.",
    why0: "Acesso direto a advogados experientes, sem intermediários.",
    why1: "Estratégia clara e objetiva desde o primeiro dia.",
    why2: "Atendimento ágil quando cada hora importa.",
    aboutEyebrow: "Sobre o escritório",
    aboutTitle: "Uma equipa jurídica próxima, atenta e preparada para cada desafio.",
    aboutText:
      "Trabalhamos com rigor, clareza e respeito pela realidade de cada cliente, oferecendo soluções jurídicas estratégicas para proteger interesses pessoais e empresariais em todo Moçambique.",
    teamEyebrow: "Linha de Advogados",
    teamTitle: "Conheça a equipa que acompanha cada caso com dedicação.",
    team0: "Advogada especialista em Direito de Família",
    team1: "Advogado em Litígios Empresariais",
    team2: "Especialista em Transações Imobiliárias",
    footerEyebrow: "Fale connosco",
    footerTitle: "Vamos falar sobre o próximo passo.",
    footerRights: "Todos os direitos reservados.",
    statusSending: "A processar o seu pedido...",
    statusPhone:
      "Obrigado! Ligue para +258 84 490 6000 - estamos disponíveis em horário comercial.",
    statusEmail: "Obrigado! Escreva para Ena@gmail.com e responderemos em breve.",
  },
  en: {
    tagline: "Trusted legal counsel",
    navPractice: "Practice Areas",
    navResults: "Results",
    navAbout: "About",
    navTeam: "Our Team",
    navCta: "Book a Consultation",
    navHome: "Home",
    heroEyebrow: "Strategic counsel. Personal attention.",
    heroTitleBefore: "Protecting what matters, with ",
    heroTitleEm: "clarity",
    heroTitleAfter: " and resolve.",
    heroLead:
      "From high-stakes litigation to sensitive family matters, our attorneys deliver clear guidance and firm representation when every decision counts.",
    heroCta1: "Book a Consultation",
    heroCta2: "Explore Practice Areas",
    heroBadge: "years in practice",
    stats0: "Years of combined experience",
    stats1: "Client satisfaction rate",
    stats2: "Cases handled with care",
    practiceEyebrow: "Practice Areas",
    practiceTitle: "Seasoned attorneys for life's most consequential moments.",
    practice0Title: "Corporate Litigation",
    practice0Desc: "Advisory built on preparation, clarity, and proven advocacy.",
    practice1Title: "Real Estate Transactions",
    practice1Desc: "Contracts and negotiations handled with technical rigor and care.",
    practice2Title: "Family Law",
    practice2Desc: "Sensitive guidance through moments that call for care and discretion.",
    practice3Title: "Estate Planning",
    practice3Desc: "Asset protection and planning designed for future generations.",
    whyEyebrow: "Why clients choose us",
    whyTitle: "Calm guidance, decisive action, and tireless preparation.",
    why0: "Direct access to experienced attorneys, no intermediaries.",
    why1: "A clear, objective strategy from day one.",
    why2: "Responsive service when every hour matters.",
    aboutEyebrow: "About the firm",
    aboutTitle: "A close-knit legal team, attentive and prepared for every challenge.",
    aboutText:
      "We work with rigor, clarity, and respect for each client's reality, offering strategic legal solutions to protect personal and business interests across Mozambique.",
    teamEyebrow: "Our Attorneys",
    teamTitle: "Meet the team behind every case, handled with dedication.",
    team0: "Family Law attorney",
    team1: "Corporate Litigation attorney",
    team2: "Real Estate Transactions specialist",
    footerEyebrow: "Get in touch",
    footerTitle: "Let's talk about your next step.",
    footerRights: "All rights reserved.",
    statusSending: "Processing your request...",
    statusPhone:
      "Thanks! Call +258 84 490 6000 - we're available during business hours.",
    statusEmail: "Thanks! Write to Ena@gmail.com and we'll reply shortly.",
  },
};

const stats = [
  { value: "15+", labelKey: "stats0" },
  { value: "98%", labelKey: "stats1" },
  { value: "1.200+", labelKey: "stats2" },
];

const whyItems = [
  { idx: "01", textKey: "why0" },
  { idx: "02", textKey: "why1" },
  { idx: "03", textKey: "why2" },
];

export default function Home() {
  const [currentLang, setCurrentLang] = useState<"pt" | "en">("pt");
  const [status, setStatus] = useState("");

  const dict = translations[currentLang];

  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, io) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

 const handleContact = (type: "phone" | "email") => {
  if (type === "phone") {
    const message =
      currentLang === "pt"
        ? "Olá, gostaria de agendar uma consulta."
        : "Hello, I would like to schedule a consultation.";

    window.open(
      `https://wa.me/258844906000?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    setStatus(dict.statusPhone);
  } else {
    window.location.href = "mailto:enkutumula@enaadvogados.co.mz";
    setStatus(dict.statusEmail);
  }
};
  return (
    <>
      <div className="wrap">
        <Navbar
          lang={currentLang}
          setLang={setCurrentLang}
          labels={{
            navHome: dict.navHome,
            navPractice: dict.navPractice,
            navResults: dict.navResults,
            navAbout: dict.navAbout,
            navTeam: dict.navTeam,
            navCta: dict.navCta,
            pageTag: dict.tagline,
          }}
        />

        <section className="hero">
          <div className="reveal hero-panel">
            <span className="eyebrow">{dict.heroEyebrow}</span>
            <h1>
              {dict.heroTitleBefore}
              <em>{dict.heroTitleEm}</em>
              {dict.heroTitleAfter}
            </h1>
            <p className="lead">{dict.heroLead}</p>
            <div className="actions">
              <a className="btn-primary" href="#contact">
                {dict.heroCta1}
              </a>
              <a className="btn-ghost" href="/practice">
                {dict.heroCta2}
              </a>
            </div>
          </div>
          <div className="hero-art reveal" style={{ transitionDelay: ".15s" }}>
            <div className="hero-frame">
              <Image
                src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?q=80&w=1200&auto=format&fit=crop"
                alt="Escritório de advocacia"
                width={1200}
                height={800}
                sizes="(max-width: 860px) 100vw, 45vw"
                style={{ width: "100%", height: "340px", objectFit: "cover", borderRadius: "20px" }}
              />
            </div>
            <div className="wax-badge">
              <span className="num">15+</span>
              <span className="txt">{dict.heroBadge}</span>
            </div>
          </div>
        </section>

        <section id="results" className="stats reveal">
          {stats.map((item) => (
            <div key={item.labelKey} className="stat">
              <div className="val">{item.value}</div>
              <div className="lab">{dict[item.labelKey as keyof typeof dict]}</div>
            </div>
          ))}
        </section>

        <section className="block why reveal">
          <div>
            <span className="eyebrow">{dict.whyEyebrow}</span>
            <h2 className="section-head">{dict.whyTitle}</h2>
          </div>
          <div className="why-list">
            {whyItems.map((item) => (
              <div key={item.idx} className="why-item">
                <span className="idx">{item.idx}</span>
                <p>{dict[item.textKey as keyof typeof dict]}</p>
              </div>
            ))}
          </div>
        </section>



        <footer id="contact" className="contact reveal">
          <div>
            <span className="eyebrow">{dict.footerEyebrow}</span>
            <h2>{dict.footerTitle}</h2>
          </div>
          <div className="contact-actions">
            <div className="contact-row">
              <button type="button" className="btn-contact solid" onClick={() => handleContact("phone")}>
                Text us
              </button>
              <button type="button" className="btn-contact outline" onClick={() => handleContact("email")}>
               enkutumula@enaadvogados.co.mz
              </button>
            </div>
            <div className="status-msg">{status}</div>
          </div>
        </footer>

        <p className="site-foot-note">© 2026 ENA. {dict.footerRights}</p>
      </div>

      <style jsx global>{`
        :root{
          --ink-900:#241813;
          --ink-800:#2F2019;
          --ink-700:#3E2C21;
          --brass-500:#C9A227;
          --brass-400:#DEC873;
          --paper-100:#EDEBE7;
          --paper-000:#F8F7F5;
          --slate-700:#3A3632;
          --slate-500:#756E66;
          --slate-300:#ABA59C;
          --line:#DDD7CF;
          --radius-lg: 28px;
          --radius-md: 18px;
          --ease: cubic-bezier(.22,.61,.36,1);
        }

        *{box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{
          margin:0;
          background:
            radial-gradient(1200px 600px at 85% -10%, rgba(201,162,39,0.10), transparent 60%),
            linear-gradient(180deg, var(--paper-000), var(--paper-100));
          color:var(--slate-700);
          font-family:'Inter', sans-serif;
          -webkit-font-smoothing:antialiased;
        }
        h1,h2,h3{
          font-family:'Fraunces', serif;
          color:var(--ink-900);
          margin:0;
          letter-spacing:-0.01em;
        }
        .mono{ font-family:'IBM Plex Mono', monospace; }
        a{ color:inherit; text-decoration:none; }
        button{ font-family:inherit; cursor:pointer; }
        img{ display:block; max-width:100%; }

        .wrap{ max-width:1180px; margin:0 auto; padding:0 24px; }

        .reveal{
          opacity:0;
          transform:translateY(22px);
          transition: opacity .8s var(--ease), transform .8s var(--ease);
        }
        .reveal.is-visible{ opacity:1; transform:translateY(0); }
        .reveal-stagger.is-visible > *{ opacity:1; transform:translateY(0); }
        .reveal-stagger > *{
          opacity:0; transform:translateY(18px);
          transition: opacity .7s var(--ease), transform .7s var(--ease);
        }
        .reveal-stagger.is-visible > *:nth-child(1){ transition-delay:.05s; }
        .reveal-stagger.is-visible > *:nth-child(2){ transition-delay:.15s; }
        .reveal-stagger.is-visible > *:nth-child(3){ transition-delay:.25s; }
        .reveal-stagger.is-visible > *:nth-child(4){ transition-delay:.35s; }

        @media (prefers-reduced-motion: reduce){
          .reveal, .reveal-stagger > *{ transition:none; opacity:1; transform:none; }
          html{ scroll-behavior:auto; }
        }


        .hero{
          margin-top:56px;
          display:grid; grid-template-columns:1.05fr .95fr; gap:56px; align-items:center;
        }
        .eyebrow{
          display:inline-flex; align-items:center; gap:8px;
          font-size:12px; font-weight:700; letter-spacing:.22em; text-transform:uppercase;
          color:var(--brass-500);
        }
        .eyebrow::before{ content:""; width:22px; height:1px; background:var(--brass-500); display:inline-block; }
        .hero h1{
          font-size:clamp(2.4rem, 4vw, 3.6rem); line-height:1.06; font-weight:600; margin-top:18px;
        }
        .hero h1 em{ font-style:italic; font-weight:300; color:var(--brass-500); }
        .hero p.lead{
          margin-top:22px; font-size:17px; line-height:1.75; color:var(--slate-500); max-width:46ch;
        }
        .hero .actions{ margin-top:34px; display:flex; gap:14px; flex-wrap:wrap; }
        .btn-primary{
          background:var(--ink-900); color:#fff; padding:14px 26px; border-radius:999px;
          font-weight:600; font-size:14px; border:none;
          transition:transform .2s var(--ease), background .2s ease;
        }
        .btn-primary:hover{ background:var(--brass-500); transform:translateY(-2px); }
        .btn-ghost{
          padding:14px 26px; border-radius:999px; font-weight:600; font-size:14px;
          border:1px solid var(--line); color:var(--slate-700); background:transparent;
          transition:border-color .2s ease, color .2s ease, transform .2s var(--ease);
        }
        .btn-ghost:hover{ border-color:var(--ink-900); color:var(--ink-900); transform:translateY(-2px); }

        .hero-art{ position:relative; }
        .hero-frame{
          border-radius:var(--radius-lg);
          background:linear-gradient(160deg, var(--ink-800), var(--ink-900) 70%);
          padding:10px;
          box-shadow:0 40px 70px -30px rgba(36,24,19,.55);
        }
        .hero-frame img{
          width:100%; height:340px; object-fit:cover; border-radius:20px;
          filter:saturate(0.92) contrast(1.02);
        }
        .wax-badge{
          position:absolute; left:-26px; bottom:-26px;
          width:104px; height:104px; border-radius:50%;
          background:radial-gradient(circle at 35% 30%, var(--brass-400), var(--brass-500) 55%, #6E5220 100%);
          color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center;
          box-shadow:0 20px 34px -14px rgba(62,44,33,.6), inset 0 2px 3px rgba(255,255,255,.35);
          border:3px solid rgba(255,255,255,.25);
        }
        .wax-badge .num{ font-family:'Fraunces',serif; font-size:22px; font-weight:600; line-height:1; }
        .wax-badge .txt{ font-size:9px; letter-spacing:.14em; text-transform:uppercase; margin-top:4px; text-align:center; padding:0 8px;}

        .stats{
          margin-top:96px;
          display:grid; grid-template-columns:repeat(3,1fr); gap:1px;
          background:var(--line); border-radius:var(--radius-md); overflow:hidden;
          border:1px solid var(--line);
        }
        .stat{
          background:var(--paper-000); padding:32px 28px; transition:background .25s ease;
        }
        .stat:hover{ background:#fff; }
        .stat .val{ font-family:'IBM Plex Mono', monospace; font-size:2.1rem; font-weight:600; color:var(--ink-900); }
        .stat .lab{ margin-top:8px; font-size:13.5px; color:var(--slate-500); }

        .section-head{ max-width:640px; margin-bottom:40px; }
        .section-head h2{ font-size:clamp(1.7rem,2.6vw,2.4rem); font-weight:600; margin-top:10px; line-height:1.18; }

        section.block{ margin-top:110px; }

        .practice{
          background:linear-gradient(160deg, var(--ink-800), var(--ink-900) 75%);
          border-radius:var(--radius-lg);
          padding:56px 48px 48px;
          color:#fff;
          position:relative;
          overflow:hidden;
        }
        .practice::before{
          content:""; position:absolute; inset:0;
          background: radial-gradient(500px 260px at 90% 0%, rgba(201,162,39,.16), transparent 70%);
        }
        .practice .section-head p{ color:var(--slate-300); margin-top:12px; line-height:1.7; }
        .practice .section-head .eyebrow{ color:var(--brass-400); }
        .folder-grid{
          display:grid; grid-template-columns:repeat(2,1fr); gap:22px 22px; margin-top:8px; position:relative; z-index:1;
        }
        .folder{
          position:relative; padding-top:34px;
        }
        .folder::before{
          content:""; position:absolute; top:0; left:18px; width:58%; height:22px;
          background:rgba(255,255,255,.09);
          border-radius:10px 10px 0 0;
        }
        .folder-body{
          background:rgba(255,255,255,.07);
          border:1px solid rgba(255,255,255,.12);
          border-radius:0 14px 14px 14px;
          padding:26px 24px;
          transition:transform .3s var(--ease), background .3s ease, border-color .3s ease;
        }
        .folder:hover .folder-body{
          transform:translateY(-6px);
          background:rgba(255,255,255,.11);
          border-color:rgba(201,162,39,.55);
        }
        .folder-icon{
          width:38px; height:38px; border-radius:10px;
          background:rgba(201,162,39,.18); border:1px solid rgba(201,162,39,.4);
          display:flex; align-items:center; justify-content:center; margin-bottom:16px;
        }
        .folder-icon svg{ width:18px; height:18px; stroke:var(--brass-400); }
        .folder-body h3{ color:#fff; font-size:1.15rem; font-weight:500; }
        .folder-body p{ margin-top:8px; font-size:13.5px; color:var(--slate-300); line-height:1.65; }

        .why{
          display:grid; grid-template-columns:.8fr 1.2fr; gap:52px; align-items:start;
        }
        .why-list{ display:flex; flex-direction:column; gap:14px; }
        .why-item{
          display:flex; gap:16px; align-items:flex-start;
          background:var(--paper-000); border:1px solid var(--line); border-radius:16px;
          padding:20px 22px; transition:transform .25s var(--ease), box-shadow .25s ease, border-color .25s ease;
        }
        .why-item:hover{ transform:translateX(6px); border-color:var(--brass-500); box-shadow:0 14px 30px -18px rgba(36,24,19,.3); }
        .why-item .idx{ font-family:'IBM Plex Mono', monospace; color:var(--brass-500); font-weight:600; font-size:13px; padding-top:2px; }
        .why-item p{ margin:0; font-size:15px; line-height:1.6; color:var(--slate-700); }

        .about{
          background:var(--ink-900); border-radius:var(--radius-lg); color:#fff;
          padding:56px 48px; display:grid; grid-template-columns:.85fr 1.15fr; gap:44px; align-items:center;
          position:relative; overflow:hidden;
        }
        .about::after{
          content:""; position:absolute; right:-60px; top:-60px; width:260px; height:260px; border-radius:50%;
          border:1px solid rgba(201,162,39,.25);
        }
        .about .eyebrow{ color:var(--brass-400); }
        .about h2{ color:#fff; margin-top:12px; font-size:clamp(1.6rem,2.4vw,2.2rem); }
        .about-panel{
          background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12);
          border-radius:18px; padding:30px;
        }
        .about-panel p{ font-size:16px; line-height:1.8; color:var(--slate-300); margin:0; }

        .team-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
        .team-card{
          background:var(--paper-000); border:1px solid var(--line); border-radius:20px;
          overflow:hidden;
          transition:transform .3s var(--ease), box-shadow .3s ease;
        }
        .team-card:hover{ transform:translateY(-8px); box-shadow:0 26px 46px -24px rgba(36,24,19,.35); }
        .team-photo{
          width:100%;
          min-height:220px;
          overflow:hidden;
        }
        .team-photo img{
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
          transition:transform .3s ease;
        }
        .team-card:hover .team-photo img{
          transform:scale(1.03);
        }
        .team-card__body{ padding:24px; }
        .team-card h3{ font-size:1.15rem; font-weight:500; margin:0; }
        .team-card p{ margin-top:12px; font-size:13.5px; color:var(--slate-500); line-height:1.6; }

        footer.contact{
          margin-top:110px; margin-bottom:40px;
          background:linear-gradient(155deg, var(--ink-800), var(--ink-900));
          border-radius:var(--radius-lg);
          padding:48px;
          color:#fff;
          display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:28px;
          position:relative; overflow:hidden;
        }
        footer.contact::before{
          content:""; position:absolute; inset:0;
          background:radial-gradient(420px 220px at 10% 110%, rgba(201,162,39,.18), transparent 70%);
        }
        footer.contact > *{ position:relative; z-index:1; }
        footer .eyebrow{ color:var(--brass-400); }
        footer h2{ color:#fff; margin-top:8px; font-size:1.7rem; }
        .contact-actions{ display:flex; flex-direction:column; gap:10px; }
        .contact-row{ display:flex; gap:12px; flex-wrap:wrap; }
        .btn-contact{
          border-radius:999px; padding:13px 22px; font-weight:600; font-size:14px; border:none;
          transition:transform .2s var(--ease), background .2s ease;
        }
        .btn-contact.solid{ background:var(--brass-500); color:#241813; }
        .btn-contact.solid:hover{ background:var(--brass-400); transform:translateY(-2px); }
        .btn-contact.outline{ background:transparent; border:1px solid rgba(255,255,255,.28); color:#fff; }
        .btn-contact.outline:hover{ background:rgba(255,255,255,.1); transform:translateY(-2px); }
        .status-msg{ font-size:13px; color:var(--brass-400); min-height:18px; }

        .site-foot-note{
          text-align:center; font-size:12px; color:var(--slate-300); padding:0 0 40px;
        }

        @media (max-width: 860px){
          .hero{ grid-template-columns:1fr; }
          .stats{ grid-template-columns:1fr; }
          .practice{ padding:40px 24px; }
          .folder-grid{ grid-template-columns:1fr; }
          .why{ grid-template-columns:1fr; }
          .about{ grid-template-columns:1fr; padding:36px 26px; }
          .team-grid{ grid-template-columns:1fr; }
          footer.contact{ flex-direction:column; align-items:flex-start; padding:36px 26px; }
          nav.main{ display:none; }
        }
      `}</style>
    </>
  );
}