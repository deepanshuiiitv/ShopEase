import { useState } from 'react';
import ConfirmModal from '../../components/ConfirmModal';

const initialSales = [
  { id: 1, product: 'Laptop', customer: 'Alice Smith', amount: '$999', date: '2023-05-01' },
  { id: 2, product: 'Smartphone', customer: 'Bob Johnson', amount: '$699', date: '2023-05-02' },
  { id: 3, product: 'Headphones', customer: 'Charlie Lee', amount: '$199', date: '2023-05-03' },
  { id: 4, product: 'Keyboard', customer: 'Diana King', amount: '$49', date: '2023-05-04' },
];

export default function Sales() {
  const [sales, setSales] = useState(initialSales);
  const [modal, setModal] = useState({ open: false, action: null, payload: null });

  // Delete
  const handleDelete = (id) => {
    setModal({
      open: true,
      action: 'delete',
      payload: id,
      title: 'Delete Sale',
      message: 'Are you sure you want to delete this sale?'
    });
  };
  const confirmDelete = () => {
    setSales((prev) => prev.filter((s) => s.id !== modal.payload));
    setModal({ open: false, action: null, payload: null });
  };

  // Edit (for demonstration, just confirm, no edit page)
  const handleEdit = (sale) => {
    setModal({
      open: true,
      action: 'edit',
      payload: sale,
      title: 'Edit Sale',
      message: 'Are you sure you want to edit this sale? (Demo only)'
    });
  };
  const confirmEdit = () => {
    // No edit page, just close modal
    setModal({ open: false, action: null, payload: null });
  };

  // Add (for demonstration, just confirm, no add page)
  const handleAdd = () => {
    setModal({
      open: true,
      action: 'add',
      title: 'Add Sale',
      message: 'Are you sure you want to add a new sale? (Demo only)'
    });
  };
  const confirmAdd = () => {
    // No add page, just close modal
    setModal({ open: false, action: null, payload: null });
  };

  // Cancel modal
  const handleCancel = () => setModal({ open: false, action: null, payload: null });

  // Modal action router
  const handleConfirm = () => {
    if (modal.action === 'delete') confirmDelete();
    else if (modal.action === 'edit') confirmEdit();
    else if (modal.action === 'add') confirmAdd();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:mt-8 mt-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-blue-700">Sales</h1>
        {/* <button
          className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 transition"
          onClick={handleAdd}
        >
          + Add Sale
        </button> */}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-100">
            {sales.map((sale, idx) => (
              <tr key={sale.id} className={idx % 2 === 0 ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-blue-100'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">{sale.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">{sale.product}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">{sale.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">{sale.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">{sale.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900 flex gap-2">
                  <button
                    className="px-3 py-1 rounded bg-yellow-400 text-white font-bold hover:bg-yellow-500"
                    onClick={() => handleEdit(sale)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-500 text-white font-bold hover:bg-red-600"
                    onClick={() => handleDelete(sale.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmLabel={modal.action === 'delete' ? 'Delete' : modal.action === 'edit' ? 'Edit' : 'Add'}
      />
    </div>
  );
} 