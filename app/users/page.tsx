'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

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
            <th>VIP</th>
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
                {/* VIP bouton ici (cf section 2) */}
                <VIPButton userId={u.id} currentRole={u.role} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// On ajoute le composant VIP plus bas
import { doc, updateDoc } from 'firebase/firestore';
function VIPButton({ userId, currentRole }) {
  const [loading, setLoading] = useState(false);
  const makeVip = async () => {
    setLoading(true);
    await updateDoc(doc(db, "conversations", userId), { role: "vip" });
    setLoading(false);
    alert("Utilisateur passé VIP !");
  };
  return (
    <button
      className={`px-3 py-1 rounded ${currentRole === "vip" ? "bg-green-500" : "bg-gray-400"}`}
      onClick={makeVip}
      disabled={loading || currentRole === "vip"}
    >
      {currentRole === "vip" ? "VIP" : "Passer VIP"}
    </button>
  );
}
