import { prisma } from '@/lib/prisma';
import { OrderStatusSelect } from './OrderStatusSelect';

const statusColors: Record<string, string> = {
  PENDING: 'text-yellow-500',
  PAID: 'text-green-500',
  PROCESSING: 'text-blue-400',
  SHIPPED: 'text-purple-400',
  DELIVERED: 'text-green-400',
  CANCELLED: 'text-red-400',
};

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="font-display text-3xl">Orders</h1>
        <p className="text-cream/40 text-sm mt-1">{orders.length} total orders</p>
      </div>

      <div className="luxury-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black-600">
                {['ID', 'Customer', 'Items', 'Total', 'Status', 'Date'].map((h) => (
                  <th key={h} className="text-start px-6 py-3 text-xs tracking-widest uppercase text-cream/40">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-black-600/50 hover:bg-black-700/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-cream/40">{order.id.slice(0, 8)}…</td>
                  <td className="px-6 py-4">
                    <p>{order.customerName}</p>
                    <p className="text-xs text-cream/40">{order.customerEmail}</p>
                  </td>
                  <td className="px-6 py-4 text-cream/60 text-xs">
                    {order.items.map((i) => `${i.product.nameEn} ×${i.quantity}`).join(', ')}
                  </td>
                  <td className="px-6 py-4 text-brass font-medium">{order.total.toLocaleString()} {order.currency}</td>
                  <td className="px-6 py-4">
                    <OrderStatusSelect
                      orderId={order.id}
                      currentStatus={order.status}
                    />
                  </td>
                  <td className="px-6 py-4 text-cream/40 text-xs">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-cream/30">No orders yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
