import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Donation et frais de notaires",
  description: "Une web app qui calcule la valeur de la nue-propriété et qui détermine les frais fiscaux et les frais de notaire",
  icons: ["/images/icons-192.png", "/images/icons-192.png"],
  manifest: "/manifest.json",
  authors: [{name:"ESHome33",url:"https://www.eshome.fr"}    
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
