import type { Metadata } from "next";
import { Instrument_Sans, Young_Serif } from "next/font/google";
import "./globals.css";

const display = Young_Serif({ variable: "--font-display", subsets: ["latin"], weight: "400" });
const sans = Instrument_Sans({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clara | Quanto sobra, de verdade, em cada venda",
  description:
    "A Clara calcula o custo real do que você vende e mostra o preço que deixa lucro. Feita para microempreendedoras brasileiras.",
  applicationName: "Clara",
  openGraph: {
    title: "Clara | Quanto sobra, de verdade, em cada venda",
    description:
      "Simulador de preço para MEIs: ingredientes, embalagem, tempo, contas do mês e taxa da venda na mesma conta.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
