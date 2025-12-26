import { useEffect, useState } from 'react';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admindashboard/users')
      .then((r) => r.json())
      .then((data) =>
        setCustomers(
          data.map((u, i) => ({
            id: i + 1,
            name: u.fullname,
            email: u.gmail,
          }))
        )
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-blue-600 font-semibold">
        Loading customers…
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Customers</h1>
        <span className="text-sm text-gray-500">
          Total: {customers.length}
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-blue-100">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-50 text-blue-700 uppercase tracking-wide">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-blue-100">
            {customers.map((c, i) => (
              <tr
                key={i}
                className={`transition ${
                  i % 2 === 0 ? 'bg-blue-50/50' : 'bg-white'
                } hover:bg-blue-100/70`}
              >
                <td className="px-6 py-3 font-medium text-gray-600">
                  {c.id}
                </td>
                <td className="px-6 py-3 text-gray-800">
                  {c.name}
                </td>
                <td className="px-6 py-3 text-blue-700 font-medium">
                  {c.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
