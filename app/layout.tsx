import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
    title: { default: "ENA | Advogados & Consultores", template: "%s | ENA" },
    description: "ENA Advogados & Consultores. Advocacia e consultoria jurídica para particulares e empresas em Moçambique.",
};
export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return <html lang="pt"><body>{children}</body></html>;
}
