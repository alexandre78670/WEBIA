'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

export default function UserConversationPage() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchConversation = async () => {
      const docRef = doc(db, 'conversations', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMessages(data.messages || []);
        setUsername(data.username || id);
      } else {
        setMessages([]);
      }
    };
    fetchConversation();
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link href="/users" className="text-blue-500 underline mb-4 inline-block">{'< Retour'}</Link>
      <h2 className="text-2xl font-bold mb-2">Conversation de <span className="text-blue-700">{username}</span></h2>
      <div className="bg-gray-100 rounded p-4 shadow">
        {messages.length === 0 && <p>Aucune conversation.</p>}
        <ul>
          {messages.map((msg, i) => (
            <li key={i} className={`mb-2 ${msg.role === 'assistant' ? 'text-blue-800' : 'text-gray-700'}`}>
              <span className="font-bold">{msg.role === 'assistant' ? 'IA' : username} : </span>
              <span>{msg.content}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
