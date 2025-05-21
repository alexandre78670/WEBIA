'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "conversations"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(data);
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Utilisateurs</h2>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th>Utilisateur</th>
            <th>Voir conversation</th>
            <th>Rôle</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.username || u.id}</td>
              <td>
                <Link href={`/users/${u.id}`}>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">Afficher</button>
                </Link>
              </td>
              <td>
                <RoleToggleButton userId={u.id} currentRole={u.role || "user"} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ----- Toggle VIP/USER button -----
function RoleToggleButton({ userId, currentRole }) {
  const [loading, setLoading] = useState(false);

  const toggleRole = async () => {
    setLoading(true);
    const newRole = currentRole === "vip" ? "user" : "vip";
    await updateDoc(doc(db, "conversations", userId), { role: newRole });
    setLoading(false);
    alert(`Utilisateur maintenant ${newRole.toUpperCase()}`);
    window.location.reload();
  };

  return (
    <button
      className={`px-3 py-1 rounded ${currentRole === "vip" ? "bg-green-500" : "bg-gray-400"}`}
      onClick={toggleRole}
      disabled={loading}
    >
      {currentRole === "vip" ? "Passer USER" : "Passer VIP"}
    </button>
  );
}

function RoleToggleButton({ userId, currentRole }) {
  const [loading, setLoading] = useState(false);

  const toggleRole = async () => {
    setLoading(true);
    const newRole = currentRole === "vip" ? "user" : "vip";
    await updateDoc(doc(db, "conversations", userId), { role: newRole });
    setLoading(false);
    alert(`Utilisateur maintenant ${newRole.toUpperCase()}`);
    window.location.reload();
  };

  return (
    <button
      className={`px-3 py-1 rounded cursor-pointer ${currentRole === "vip" ? "bg-green-500" : "bg-gray-400"}`}
      onClick={toggleRole}
      disabled={loading}
    >
      {currentRole === "vip" ? "Passer USER" : "Passer VIP"}
    </button>
  );
}
