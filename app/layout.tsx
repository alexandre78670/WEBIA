import './globals.css';
import { ReactNode } from 'react';
import Sidebar from '../components/Sidebar'; // Assure-toi que le chemin est correct !

export const metadata = {
  title: 'Admin Panel',
  description: 'Tableau de bord IA',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
