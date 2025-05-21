// app/layout.tsx
import '../styles/globals.css';
import Sidebar from '../components/Sidebar';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Admin Panel',
  description: 'Tableau de bord IA',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
