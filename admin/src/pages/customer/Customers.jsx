import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal';

const initialCustomers = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', joined: '2023-01-10' },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', joined: '2023-02-15' },
  { id: 3, name: 'Charlie Lee', email: 'charlie@example.com', joined: '2023-03-20' },
  { id: 4, name: 'Diana King', email: 'diana@example.com', joined: '2023-04-05' },
];

export default function Customers() {
  const navigate = useNavigate();
  const location = useLocation();
  const [customers, setCustomers] = useState(() => {
    if (location.state && location.state.newCustomer) {
      return [
        ...initialCustomers,
        { ...location.state.newCustomer, id: Date.now() },
      ];
    }
    if (location.state && location.state.updatedCustomer) {
      return initialCustomers.map((c) =>
        c.id === location.state.updatedCustomer.id ? { ...location.state.updatedCustomer } : c
      );
    }
    return initialCustomers;
  });

  // Modal state
  const [modal, setModal] = useState({ open: false, action: null, payload: null });

  // Delete
  const handleDelete = (id) => {
    setModal({
      open: true,
      action: 'delete',
      payload: id,
      title: 'Delete Customer',
      message: 'Are you sure you want to delete this customer?'
    });
  };
  const confirmDelete = () => {
    setCustomers((prev) => prev.filter((c) => c.id !== modal.payload));
    setModal({ open: false, action: null, payload: null });
  };

  // Edit
  const handleEdit = (customer) => {
    setModal({
      open: true,
      action: 'edit',
      payload: customer,
      title: 'Edit Customer',
      message: 'Are you sure you want to edit this customer?'
    });
  };
  const confirmEdit = () => {
    navigate('/edit-customer', { state: { customer: modal.payload } });
    setModal({ open: false, action: null, payload: null });
  };

  // Add
  const handleAdd = () => {
    setModal({
      open: true,
      action: 'add',
      title: 'Add Customer',
      message: 'Are you sure you want to add a new customer?'
    });
  };
  const confirmAdd = () => {
    navigate('/add-customer');
    setModal({ open: false, action: null, payload: null });
  };

  // View
  const handleView = (customer) => {
    navigate('/customer-detail', { state: { customer } });
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
        <h1 className="text-3xl font-extrabold text-blue-700">Customers</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 transition"
          onClick={handleAdd}
        >
          + Add Customer
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-100">
            {customers.map((customer, idx) => (
              <tr key={customer.id} className={idx % 2 === 0 ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-blue-100'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">{customer.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">{customer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">{customer.joined}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900 flex gap-2">
                  <button
                    className="px-3 py-1 rounded bg-blue-500 text-white font-bold hover:bg-blue-600"
                    onClick={() => handleView(customer)}
                  >
                    View
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-yellow-400 text-white font-bold hover:bg-yellow-500"
                    onClick={() => handleEdit(customer)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-500 text-white font-bold hover:bg-red-600"
                    onClick={() => handleDelete(customer.id)}
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
