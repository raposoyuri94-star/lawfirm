"use client";

import Link from "next/link";
import { useState, type Dispatch, type SetStateAction } from "react";

type Locale = "pt" | "en";

type NavbarLabels = {
  navHome: string;
  navPractice: string;
  navResults: string;
  navAbout: string;
  navTeam: string;
  navCta: string;
  pageTag: string;
};

type NavbarProps = {
  lang: Locale;
  setLang: Dispatch<SetStateAction<Locale>>;
  labels: NavbarLabels;
};

export default function Navbar({
  lang,
  setLang,
  labels,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar-site">
      <div className="navbar-wrap navbar-inner">
        <div className="navbar-brand">
          <div className="navbar-seal">ENA</div>

          <div className="navbar-brand-text">
            <div className="navbar-name">ENA</div>
            <div className="navbar-tag">{labels.pageTag}</div>
          </div>
        </div>

        <button
          className="navbar-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`navbar-main ${menuOpen ? "open" : ""}`}>
          <Link
            className="navbar-link"
            href="/"
            onClick={() => setMenuOpen(false)}
          >
            {labels.navHome}
          </Link>

          <Link
            className="navbar-link"
            href="/practice"
            onClick={() => setMenuOpen(false)}
          >
            {labels.navPractice}
          </Link>

          <Link
            className="navbar-link"
            href="/results"
            onClick={() => setMenuOpen(false)}
          >
            {labels.navResults}
          </Link>

          <Link
            className="navbar-link"
            href="/about"
            onClick={() => setMenuOpen(false)}
          >
            {labels.navAbout}
          </Link>

          <Link
            className="navbar-link"
            href="/team"
            onClick={() => setMenuOpen(false)}
          >
            {labels.navTeam}
          </Link>
        </nav>

        <div className={`navbar-actions ${menuOpen ? "open" : ""}`}>

          <Link
            className="navbar-cta-pill"
            href="/#contact"
            onClick={() => setMenuOpen(false)}
          >
            {labels.navCta}
          </Link>
                    <div
            className="navbar-lang-toggle"
            role="group"
            aria-label="Language"
          >
            <button
              type="button"
              className={lang === "pt" ? "active" : ""}
              onClick={() => setLang("pt")}
            >
              PT
            </button>

            <button
              type="button"
              className={lang === "en" ? "active" : ""}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>

        </div>
      </div>

      <style jsx>{`
              .navbar-site {
          position: sticky;
          top: 16px;
          z-index: 50;
          margin: 16px auto 0;
          max-width: 1180px;
          border-radius: 999px;
          background: rgba(250, 251, 252, 0.92);
          backdrop-filter: blur(14px);
          border: 1px solid #ddd7cf;
          box-shadow: 0 18px 40px -22px rgba(36, 24, 19, 0.35);
          padding: 12px 22px;
        }

        .navbar-wrap {
          width: 100%;
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .navbar-seal {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(155deg, #dec873, #c9a227 60%, #8a6a1e);
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 600;
        }

        .navbar-brand-text .navbar-name {
          font-size: 12px;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: #241813;
          font-weight: 700;
        }

        .navbar-brand-text .navbar-tag {
          font-size: 12px;
          color: #756e66;
        }

        .navbar-main {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .navbar-link {
          position: relative;
          font-size: 14px;
          font-weight: 500;
          color: #4b4440;
          text-decoration: none;
          transition: .25s;
        }

        .navbar-link:hover {
          color: #241813;
        }

        .navbar-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -3px;
          width: 100%;
          height: 2px;
          background: #c9a227;
          transform: scaleX(0);
          transform-origin: left;
          transition: .25s;
        }

        .navbar-link:hover::after {
          transform: scaleX(1);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .navbar-lang-toggle {
          display: flex;
          border-radius: 999px;
          border: 1px solid #ddd7cf;
          background: #f8f7f5;
          padding: 3px;
        }

        .navbar-lang-toggle button {
          border: none;
          background: transparent;
          padding: 6px 12px;
          border-radius: 999px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 700;
        }

        .navbar-lang-toggle button.active {
          background: #241813;
          color: white;
        }

        .navbar-cta-pill {
          background: #241813;
          color: white;
          padding: 11px 20px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 600;
          transition: .25s;
        }

        .navbar-cta-pill:hover {
          background: #c9a227;
          color: #241813;
        }

        .navbar-menu-btn {
          display: none;
          border: none;
          background: transparent;
          font-size: 32px;
          cursor: pointer;
          color: #241813;
        }         @media (max-width: 1100px) {
          .navbar-cta-pill {
            display: none;
          }

          .navbar-main {
            gap: 12px;
          }

          .navbar-link {
            font-size: 13px;
          }
        }

        @media (max-width: 768px) {
          .navbar-site {
            border-radius: 20px;
            padding: 16px 20px;
          }

          .navbar-inner {
            flex-wrap: wrap;
          }

          .navbar-menu-btn {
            display: block;
            margin-left: auto;
          }

          .navbar-brand-text .navbar-tag {
            display: none;
          }

          .navbar-main {
            display: none;
            width: 100%;
            flex-direction: column;
            align-items: center;
            gap: 18px;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ddd7cf;
          }

          .navbar-main.open {
            display: flex;
          }

          .navbar-actions {
            display: none;
            width: 100%;
            flex-direction: column;
            align-items: center;
            gap: 16px;
            margin-top: 20px;
          }

          .navbar-actions.open {
            display: flex;
          }

          .navbar-cta-pill {
            display: block;
            width: 100%;
            max-width: 280px;
            text-align: center;
          }

          .navbar-link {
            font-size: 16px;
          }
        }
      `}</style>
    </header>
  );
}