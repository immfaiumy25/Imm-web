import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "@/components/Providers";
import { DisableZoom } from "@/components/DisableZoom";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PK IMM FAI UMY | Home",
  description: "Pimpinan Komisariat Ikatan Mahasiswa Muhammadiyah Fakultas Agama Islam Universitas Muhammadiyah Yogyakarta",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${poppins.variable} font-sans text-on-surface antialiased min-h-screen`}
      >
        <DisableZoom />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
