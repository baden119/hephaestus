import type { Metadata } from "next";
import AuthProvider from "../components/AuthProvider";
import "./globals.css";

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
      <body>
        {/* Authprovider component put here copying from next-auth-spotify example */}
        {/* TODO: maybe move to main page.tsx */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
