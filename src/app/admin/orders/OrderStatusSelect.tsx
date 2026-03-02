'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const STATUSES = ['PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

function getAdminSecret() {
  return document.cookie
    .split('; ')
    .find((r) => r.startsWith('admin_auth='))
    ?.split('=')[1] ?? '';
}

export function OrderStatusSelect({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus);
  const router = useRouter();

  async function handleChange(val: string) {
    setStatus(val);
    await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': getAdminSecret() },
      body: JSON.stringify({ status: val }),
    });
    router.refresh();
  }

  return (
    <select
      value={status}
      onChange={(e) => handleChange(e.target.value)}
      className="bg-black-700 border border-black-500 focus:border-brass text-xs tracking-widest uppercase text-cream px-3 py-2 outline-none cursor-pointer"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
