// app/layout.tsx
export const metadata = {
  title: 'Admin IA',
  description: 'Tableau de bord IA',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
