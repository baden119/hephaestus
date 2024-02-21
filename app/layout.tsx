// Not Working???

// export const metadata = {
//   title: 'Hephaestus Born',
//   description: 'Thrown from a cliff edge',
//   keywords: 'Hephaestus, Born, Olympus',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
