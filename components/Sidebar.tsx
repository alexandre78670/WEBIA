'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="w-64 bg-gray-800 text-white p-6 min-h-screen">
      <h1 className="text-lg font-bold mb-6">GENERIC CLUB</h1>
      <nav>
        <ul>
          <li className="mb-4">
            <Link
              href="/dashboard"
              className={`block px-2 py-1 rounded font-semibold hover:bg-gray-700 ${
                isActive('/dashboard') ? 'bg-gray-700' : ''
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/users"
              className={`block px-2 py-1 rounded font-semibold hover:bg-gray-700 ${
                isActive('/users') ? 'bg-gray-700' : ''
              }`}
            >
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
