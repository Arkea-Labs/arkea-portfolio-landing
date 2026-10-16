import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["400", "500", "600"],
  style: ["normal"],
  display: "swap",
  adjustFontFallback: false,
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arquitetura de Conversão Comercial — Aura Clínica & Vértice B2B",
  description:
    "Demonstração interativa de páginas de alta conversão com agendamento clínico e estimador de escopo B2B integrados ao WhatsApp e captura de leads em tempo real.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${newsreader.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen selection:bg-[#D7E4E0] selection:text-[#182226]">
        {children}
      </body>
    </html>
  );
}
