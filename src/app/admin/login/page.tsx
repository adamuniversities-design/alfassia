'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret }),
    });
    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      setError('Invalid password');
    }
  }

  return (
    <div className="min-h-screen bg-black-900 flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="font-display text-3xl text-brass tracking-widest">ALFASSIA</div>
          <p className="text-xs text-cream/30 tracking-[0.3em] uppercase">Admin Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="secret" className="block text-xs tracking-widest uppercase text-cream/40 mb-2">
              Password
            </label>
            <input
              id="secret"
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="w-full bg-black-800 border border-black-600 focus:border-brass px-4 py-3 text-cream text-sm outline-none transition-colors"
              required
            />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button type="submit" className="btn-brass w-full py-4 text-xs tracking-widest uppercase">
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
