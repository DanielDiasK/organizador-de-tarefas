import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Organizador de Tarefas | Gerencie suas tarefas de forma simples",
  description: "Um organizador de tarefas moderno e intuitivo com suporte a temas claro e escuro. Organize, priorize e acompanhe suas tarefas diárias de forma eficiente.",
  keywords: ["tarefas", "organizador", "produtividade", "todo", "gerenciamento", "planejamento"],
  authors: [{ name: "Desenvolvido com Next.js e shadcn/ui" }],
  creator: "Organizador de Tarefas",
  openGraph: {
    title: "Organizador de Tarefas",
    description: "Gerencie suas tarefas de forma simples e eficiente",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Organizador de Tarefas",
    description: "Gerencie suas tarefas de forma simples e eficiente",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://org-tar.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
