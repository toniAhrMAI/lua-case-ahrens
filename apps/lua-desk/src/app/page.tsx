'use client';

import { useEffect, useState } from 'react';
import BookDeskCard from '../components/BookDeskCard';
import RemoveDeskCard from '../components/RemoveDeskCard';

type Desk = { id: number; name: string } | null;

export default function Index() {
  const [desk, setDesk] = useState<Desk>(null);

  // Hier evtl. beim Laden prüfen, ob User schon einen Desk hat
  useEffect(() => {
    async function fetchDesk() {
      const res = await fetch('/api/my-desk'); // API-Route bauen
      if (res.ok) {
        const data = await res.json();
        setDesk(data.desk ?? null);
      }
    }
    fetchDesk();
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center">
      <h1 className="text-3xl text-center mb-3">Welcome to lua-desk</h1>

      {desk ? (
        <RemoveDeskCard desk={desk} onRemoved={() => setDesk(null)} />
      ) : (
        <BookDeskCard onBooked={(newDesk) => setDesk(newDesk)} />
      )}
    </div>
  );
}
