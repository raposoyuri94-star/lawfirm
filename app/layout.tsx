import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
    title: { default: "ENA | Advogados & Consultores", template: "%s | ENA" },
    description: "Assessoria jurídica próxima e estratégica para pessoas e empresas em Moçambique. ENA — Advogados & Consultores.",
};
export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return <html lang="pt"><body>{children}</body></html>;
}
