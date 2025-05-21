'use client';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "conversations"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-lg font-bold mb-6">GENERIC CLUB</h1>
        <nav>
          <ul>
            <li className="mb-4 font-semibold">Dashboard</li>
            <li className="mb-4 font-semibold">Users</li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Conversations IA</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">+ ADD NEW</button>
        </header>
        <input
          type="text"
          placeholder="Search..."
          className="mb-4 px-4 py-2 border border-gray-300 rounded w-full"
        />
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Utilisateur</th>
              <th className="py-2 px-4 text-left">Conversation</th>
              <th className="py-2 px-4 text-left">Afficher</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} className="border-t">
                <td className="py-2 px-4">{u.username || u.id}</td>
                <td className="py-2 px-4">{u.messages?.slice(-1)[0]?.content || "..."}</td>
                <td className="py-2 px-4">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">Afficher</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
