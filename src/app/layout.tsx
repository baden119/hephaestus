import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Hephaestus App",
  description: "Hammering out the scum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/hephaestusIcon.svg"
          type="image/svg"
          sizes="200x200"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
