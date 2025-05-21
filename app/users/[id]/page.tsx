'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ConversationPage() {
  const params = useParams();
  const userId = params.userid;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchConversation = async () => {
      const ref = doc(db, "conversations", userId);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        setMessages(docSnap.data().messages || []);
      }
    };
    fetchConversation();
  }, [userId]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Conversation de {userId}</h2>
      <div className="bg-white shadow rounded p-4">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.role === "assistant" ? "text-blue-600" : "text-gray-800"}`}>
            <b>{m.role === "assistant" ? "Bot:" : "User:"}</b> {m.content}
          </div>
        ))}
      </div>
    </div>
  );
}
