"use client";

import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import { translations } from "../data";
import { PRACTICE_ICONS } from "../icons";
import { useLang } from "../useLang";
import { usePageTransition, ROUTE_TRANSITION_CSS } from "../usePageTransition";

export default function PracticeAreaDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";

  const [lang, setLang] = useLang("pt");
  const dict = translations[lang];
  const { navigate, className: transitionClassName } = usePageTransition();

  const area = dict.areas.find((item) => item.slug === slug);
  const otherAreas = dict.areas.filter((item) => item.slug !== slug);

  return (
    <div className={`page ${transitionClassName}`}>
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
        <button type="button" className="breadcrumb" onClick={() => navigate("/practice-areas")}>
          <span className="breadcrumb__arrow" aria-hidden="true">←</span>
          {dict.backToPractice}
        </button>

        {area ? (
          <>
            <section className="detail-hero">
              <div className="detail-hero__glow" aria-hidden="true" />
              <div className="detail-hero__icon">{PRACTICE_ICONS[area.icon]}</div>
              <span className="eyebrow">{dict.detailEyebrow}</span>
              <h1>{area.title}</h1>
              <p className="lead">{area.intro}</p>
            </section>

            <section className="detail-body">
              <div className="detail-body__main">
                <h2>{dict.detailWhatWeDo}</h2>
                <ul className="detail-points">
                  {area.points.map((point) => (
                    <li key={point}>
                      <span className="detail-points__bullet" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="detail-closing">{area.closing}</p>
              </div>

              <aside className="detail-body__aside">
                <h3>{lang === "pt" ? "Outras áreas" : "Other areas"}</h3>
                <ul className="related-list">
                  {otherAreas.map((item) => (
                    <li key={item.slug}>
                      <button type="button" onClick={() => navigate(`/practice-areas/${item.slug}`)}>
                        <span className="related-list__icon">{PRACTICE_ICONS[item.icon]}</span>
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>
            </section>
          </>
        ) : (
          <section className="not-found">
            <h1>{dict.notFoundTitle}</h1>
            <p>{dict.notFoundText}</p>
          </section>
        )}

        <section className="cta-panel">
          <div className="cta-panel__glow" aria-hidden="true" />
          <div className="cta-panel__text">
            <p className="eyebrow eyebrow--light">{dict.pageTag}</p>
            <h2>{dict.ctaLabel}</h2>
          </div>
          <div className="cta-panel__actions">
            <button type="button" className="btn-primary" onClick={() => navigate("/#contact")}>
              {dict.ctaLabel}
            </button>
            <button type="button" className="btn-ghost" onClick={() => navigate("/")}>
              <span className="btn-ghost__arrow" aria-hidden="true">←</span>
              {dict.back}
            </button>
          </div>
        </section>
      </main>

      <style jsx global>{`
        ${ROUTE_TRANSITION_CSS}
      `}</style>

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

        .breadcrumb {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
          background: transparent;
          padding: 0;
          margin-bottom: 24px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--slate-500);
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .breadcrumb:hover {
          color: var(--brass-500);
        }
        .breadcrumb__arrow {
          transition: transform 0.2s ease;
        }
        .breadcrumb:hover .breadcrumb__arrow {
          transform: translateX(-4px);
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

        .detail-hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(160deg, var(--ink-800), var(--ink-900) 75%);
          border-radius: 28px;
          padding: 56px 48px;
          color: #fff;
          animation: rise 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both;
        }
        .detail-hero__glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(480px 260px at 90% 0%, rgba(201, 162, 39, 0.18), transparent 70%);
          pointer-events: none;
        }
        .detail-hero__icon {
          position: relative;
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(201, 162, 39, 0.14);
          border: 1px solid rgba(201, 162, 39, 0.35);
          color: var(--brass-400);
          margin-bottom: 20px;
        }
        .detail-hero__icon :global(svg) {
          width: 28px;
          height: 28px;
        }
        .detail-hero h1 {
          position: relative;
          margin: 14px 0 0;
          font-size: clamp(1.9rem, 3.2vw, 2.6rem);
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.01em;
        }
        .detail-hero .lead {
          position: relative;
          margin: 18px 0 0;
          max-width: 68ch;
          line-height: 1.85;
          color: var(--slate-300);
        }

        @keyframes rise {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .detail-body {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 28px;
          margin: 40px 0 48px;
          animation: rise 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) 0.08s both;
        }
        .detail-body__main {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 32px;
        }
        .detail-body__main h2 {
          margin: 0 0 18px;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--ink-900);
        }
        .detail-points {
          list-style: none;
          margin: 0 0 20px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .detail-points li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          line-height: 1.7;
          color: var(--slate-700);
          font-size: 15px;
        }
        .detail-points__bullet {
          flex-shrink: 0;
          margin-top: 7px;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: var(--brass-500);
        }
        .detail-closing {
          margin: 0;
          padding-top: 16px;
          border-top: 1px solid var(--line);
          color: var(--slate-500);
          line-height: 1.8;
          font-style: italic;
        }

        .detail-body__aside {
          background: var(--paper-100);
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 24px;
          align-self: start;
        }
        .detail-body__aside h3 {
          margin: 0 0 14px;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--ink-900);
        }
        .related-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .related-list button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid var(--line);
          background: #fff;
          border-radius: 14px;
          padding: 10px 14px;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--slate-700);
          cursor: pointer;
          text-align: left;
          transition: border-color 0.2s ease, transform 0.2s ease, color 0.2s ease;
        }
        .related-list button:hover {
          border-color: var(--brass-500);
          color: var(--ink-900);
          transform: translateX(3px);
        }
        .related-list__icon {
          display: flex;
          color: var(--brass-500);
        }
        .related-list__icon :global(svg) {
          width: 16px;
          height: 16px;
        }

        .not-found {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 48px;
          text-align: center;
          margin-bottom: 40px;
          animation: rise 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both;
        }
        .not-found h1 {
          margin: 0 0 12px;
          color: var(--ink-900);
        }
        .not-found p {
          margin: 0;
          color: var(--slate-500);
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
          animation: rise 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) 0.16s both;
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

        @media (max-width: 860px) {
          .detail-body {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .detail-hero,
          .cta-panel {
            padding: 32px 26px;
          }
          .cta-panel {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .detail-hero,
          .detail-body,
          .cta-panel,
          .not-found {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
