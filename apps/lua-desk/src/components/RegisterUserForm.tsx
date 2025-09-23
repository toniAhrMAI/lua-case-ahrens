'use client';
import { useState } from 'react';
import { useUserClient } from '../hooks/useUserClient';

export default function RegisterUserForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, loading: userLoading } = useUserClient();

  if (userLoading) return null;
  if (!user || user.name !== 'Admin') return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password }),
    });
    const data = await res.json();
    if (data.success) {
      setMessage('Benutzer erfolgreich registriert.');
      setEmail('');
      setName('');
      setPassword('');
    } else {
      setMessage(data.error || 'Fehler bei der Registrierung.');
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md p-4 border rounded bg-white flex flex-col gap-2"
    >
      <h2 className="font-bold text-lg mb-2">Neuen Benutzer registrieren</h2>
      <input
        type="email"
        placeholder="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="off"
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="off"
        required
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="off"
        required
        className="border p-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="p-2 rounded bg-[#f6ebe3] hover:bg-[#e5d4c8] transition-colors"
      >
        {loading ? 'Registrieren...' : 'Registrieren'}
      </button>
      {message && <div className="mt-2 text-sm text-red-600">{message}</div>}
    </form>
  );
}
