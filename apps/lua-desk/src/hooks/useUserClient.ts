import { useEffect, useState } from 'react';

export type User = {
  name: string;
  email: string;
  image?: string;
};

export function useUserClient() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/session');
        if (!res.ok) throw new Error('Not authenticated');
        const data = await res.json();
        setUser(data?.user ?? null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return { user, loading };
}
