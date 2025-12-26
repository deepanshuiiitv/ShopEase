import { useEffect, useState } from 'react';

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch product price
  const fetchProductPrice = async (itemId) => {
    const res = await fetch('/api/products/byid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: String(itemId) }),
    });
    if (!res.ok) return 0;
    const product = await res.json();
    return product.price || 0;
  };

  useEffect(() => {
    const loadOrders = async () => {
      const res = await fetch('/api/admindashboard/orders');
      const orders = await res.json();

      const mapped = [];

      for (const order of orders) {
        let total = 0;

        for (const item of order.items) {
          const price = await fetchProductPrice(item.itemId);
          total += price * item.quantity;
        }

        mapped.push({
          id: order.orderId,
          items: order.items
            .map((i) => `Item#${i.itemId} × ${i.quantity}`)
            .join(', '),
          customer: `User#${order.userId}`,
          amount: total.toFixed(2),
        });
      }

      setSales(mapped);
      setLoading(false);
    };

    loadOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-blue-600 font-semibold">
        Loading sales…
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">
          Sales / Orders
        </h1>
        <span className="text-sm text-gray-500">
          Total: {sales.length}
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-blue-100">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-50 text-blue-700 uppercase tracking-wide">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Items</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3 text-right">Total (₹)</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-blue-100">
            {sales.map((s, i) => (
              <tr
                key={i}
                className={`transition ${
                  i % 2 === 0 ? 'bg-blue-50/50' : 'bg-white'
                } hover:bg-blue-100/70`}
              >
                <td className="px-6 py-3 font-medium text-gray-700">
                  {s.id}
                </td>
                <td className="px-6 py-3 text-gray-800">
                  {s.items}
                </td>
                <td className="px-6 py-3 text-gray-700">
                  {s.customer}
                </td>
                <td className="px-6 py-3 text-right font-bold text-blue-700">
                  ₹{s.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
