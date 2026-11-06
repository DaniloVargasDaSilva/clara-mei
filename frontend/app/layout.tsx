import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clara | Gestão financeira que fala a sua língua",
  description:
    "A Clara é uma assistente de gestão financeira pensada para microempreendedoras que querem organizar suas finanças, compreender seus resultados e tomar decisões melhores.",
  applicationName: "Clara",
  openGraph: {
    title: "Clara | Gestão financeira que fala a sua língua",
    description:
      "Mais clareza financeira e autonomia para microempreendedoras brasileiras.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
