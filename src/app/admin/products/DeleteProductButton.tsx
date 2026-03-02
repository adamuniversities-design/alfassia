'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function DeleteProductButton({ id }: { id: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    if (!confirming) { setConfirming(true); return; }
    const secret = document.cookie
      .split('; ')
      .find((r) => r.startsWith('admin_auth='))
      ?.split('=')[1] ?? '';

    await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-secret': secret },
    });
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className={`text-xs tracking-wide transition-colors ${confirming ? 'text-red-400 font-medium' : 'text-cream/30 hover:text-red-400'}`}
      onBlur={() => setConfirming(false)}
    >
      {confirming ? 'Confirm?' : 'Delete'}
    </button>
  );
}
