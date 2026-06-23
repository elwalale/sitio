import type { Metadata } from "next";
import { Orbitron, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agencia ICU — Automatización con Inteligencia Artificial",
  description:
    "Agencia ICU diseña sistemas de automatización impulsados por IA que multiplican la productividad de tu empresa. Agentes autónomos, integraciones y flujos inteligentes.",
  keywords: [
    "Agencia ICU",
    "automatización con IA",
    "inteligencia artificial",
    "agentes autónomos",
    "automatización empresarial",
    "AI automation",
  ],
  authors: [{ name: "Agencia ICU" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Agencia ICU — Automatización con Inteligencia Artificial",
    description:
      "Sistemas de automatización con IA que transforman operaciones manuales en flujos autónomos.",
    siteName: "Agencia ICU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agencia ICU — Automatización con IA",
    description:
      "Sistemas de automatización con IA que transforman operaciones manuales en flujos autónomos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={`${orbitron.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
        <SonnerToaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
