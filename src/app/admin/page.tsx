import { prisma } from '@/lib/prisma';

export default async function AdminDashboardPage() {
  const [totalOrders, pendingOrders, products, revenueResult] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: 'PENDING' } }),
    prisma.product.count({ where: { active: true } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { in: ['PAID', 'DELIVERED', 'SHIPPED'] } } }),
  ]);

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  });

  const stats = [
    { label: 'Total Revenue', value: `${(revenueResult._sum.total ?? 0).toLocaleString()} MAD`, icon: '◈' },
    { label: 'Total Orders', value: totalOrders, icon: '✦' },
    { label: 'Pending Orders', value: pendingOrders, icon: '◇' },
    { label: 'Active Products', value: products, icon: '◉' },
  ];

  const statusColors: Record<string, string> = {
    PENDING: 'text-yellow-500',
    PAID: 'text-green-500',
    PROCESSING: 'text-blue-400',
    SHIPPED: 'text-purple-400',
    DELIVERED: 'text-green-400',
    CANCELLED: 'text-red-400',
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="font-display text-3xl">Dashboard</h1>
        <p className="text-cream/40 text-sm mt-1">Overview of your store</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="luxury-card p-6 space-y-3">
            <span className="text-brass">{stat.icon}</span>
            <p className="font-display text-2xl">{stat.value}</p>
            <p className="text-xs text-cream/40 tracking-widest uppercase">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="luxury-card overflow-hidden">
        <div className="px-6 py-4 border-b border-black-600 flex justify-between items-center">
          <h2 className="font-display text-lg">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black-600">
                <th className="text-start px-6 py-3 text-xs tracking-widest uppercase text-cream/40">Order ID</th>
                <th className="text-start px-6 py-3 text-xs tracking-widest uppercase text-cream/40">Customer</th>
                <th className="text-start px-6 py-3 text-xs tracking-widest uppercase text-cream/40">Total</th>
                <th className="text-start px-6 py-3 text-xs tracking-widest uppercase text-cream/40">Status</th>
                <th className="text-start px-6 py-3 text-xs tracking-widest uppercase text-cream/40">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-black-600/50 hover:bg-black-700/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-cream/50">{order.id.slice(0, 8)}…</td>
                  <td className="px-6 py-4">{order.customerName || order.customerEmail}</td>
                  <td className="px-6 py-4 text-brass">{order.total.toLocaleString()} {order.currency}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs tracking-widest uppercase ${statusColors[order.status] ?? 'text-cream/40'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-cream/40 text-xs">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-cream/30">No orders yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
