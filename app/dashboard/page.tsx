'use client';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import Link from 'next/link';

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'conversations'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const toggleRole = async (userId, currentRole) => {
    const newRole = currentRole === 'vip' ? 'user' : 'vip';
    await updateDoc(doc(db, 'conversations', userId), { role: newRole });
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tableau de bord IA</h2>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Utilisateur</th>
            <th className="p-2">Voir</th>
            <th className="p-2">Rôle</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.username || u.id}</td>
              <td className="p-2">
                <Link href={`/users/${u.id}`}>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">Afficher</button>
                </Link>
              </td>
              <td className="p-2">
                <button
                  onClick={() => toggleRole(u.id, u.role || 'user')}
                  className={`px-3 py-1 rounded ${u.role === 'vip' ? 'bg-green-500' : 'bg-gray-400'}`}
                >
                  {u.role === 'vip' ? 'VIP (Repasser USER)' : 'Passer VIP'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
