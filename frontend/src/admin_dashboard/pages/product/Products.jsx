import { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admindashboard/products')
      .then((r) => r.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-blue-600 font-semibold">
        Loading products…
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Products</h1>
        <span className="text-sm text-gray-500">
          Total: {products.length}
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-blue-100">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-50 text-blue-700 uppercase tracking-wide">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-blue-100">
            {products.map((p, i) => (
              <tr
                key={p.id}
                className={`transition ${
                  i % 2 === 0 ? 'bg-blue-50/50' : 'bg-white'
                } hover:bg-blue-100/70`}
              >
                <td className="px-6 py-3 font-medium text-gray-700">
                  {p.id}
                </td>
                <td className="px-6 py-3 text-gray-800">
                  {p.title}
                </td>
                <td className="px-6 py-3 font-semibold text-blue-700">
                  ₹{p.price}
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      (p.rating?.count ?? 0) > 0
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {p.rating?.count ?? 0}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
