// components/Sidebar.js
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-6 min-h-screen">
      <h1 className="text-lg font-bold mb-6">GENERIC CLUB</h1>
      <nav>
        <ul>
          <li className="mb-4 font-semibold">
            <Link href="/" className="hover:underline cursor-pointer">Dashboard</Link>
          </li>
          <li className="mb-4 font-semibold">
            <Link href="/users" className="hover:underline cursor-pointer">Users</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
