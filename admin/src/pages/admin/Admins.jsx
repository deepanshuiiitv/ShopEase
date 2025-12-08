import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal';

const initialAdmins = [
  { id: 1, name: 'Eve Adams', role: 'Super Admin', status: 'Active' },
  { id: 2, name: 'Frank Miller', role: 'Moderator', status: 'Inactive' },
  { id: 3, name: 'Grace Lee', role: 'Editor', status: 'Active' },
  { id: 4, name: 'Henry Ford', role: 'Support', status: 'Active' },
];

export default function Admins() {
  const navigate = useNavigate();
  const location = useLocation();
  const [admins, setAdmins] = useState(() => {
    if (location.state && location.state.newAdmin) {
      return [
        ...initialAdmins,
        { ...location.state.newAdmin, id: Date.now() },
      ];
    }
    if (location.state && location.state.updatedAdmin) {
      return initialAdmins.map((a) =>
        a.id === location.state.updatedAdmin.id ? { ...location.state.updatedAdmin } : a
      );
    }
    return initialAdmins;
  });

  // Modal state
  const [modal, setModal] = useState({ open: false, action: null, payload: null });

  // Delete
  const handleDelete = (id) => {
    setModal({
      open: true,
      action: 'delete',
      payload: id,
      title: 'Delete Admin',
      message: 'Are you sure you want to delete this admin?'
    });
  };
  const confirmDelete = () => {
    setAdmins((prev) => prev.filter((a) => a.id !== modal.payload));
    setModal({ open: false, action: null, payload: null });
  };

  // Edit
  const handleEdit = (admin) => {
    setModal({
      open: true,
      action: 'edit',
      payload: admin,
      title: 'Edit Admin',
      message: 'Are you sure you want to edit this admin?'
    });
  };
  const confirmEdit = () => {
    navigate('/edit-admin', { state: { admin: modal.payload } });
    setModal({ open: false, action: null, payload: null });
  };

  // Add
  const handleAdd = () => {
    setModal({
      open: true,
      action: 'add',
      title: 'Add Admin',
      message: 'Are you sure you want to add a new admin?'
    });
  };
  const confirmAdd = () => {
    navigate('/add-admin');
    setModal({ open: false, action: null, payload: null });
  };

  // View
  const handleView = (admin) => {
    navigate('/admin-detail', { state: { admin } });
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
        <h1 className="text-3xl font-extrabold text-blue-700">Admins</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 transition"
          onClick={handleAdd}
        >
          + Add Admin
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-100">
            {admins.map((admin, idx) => (
              <tr key={admin.id} className={idx % 2 === 0 ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-blue-100'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">{admin.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">{admin.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">{admin.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">{admin.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900 flex gap-2">
                  <button
                    className="px-3 py-1 rounded bg-blue-500 text-white font-bold hover:bg-blue-600"
                    onClick={() => handleView(admin)}
                  >
                    View
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-yellow-400 text-white font-bold hover:bg-yellow-500"
                    onClick={() => handleEdit(admin)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-500 text-white font-bold hover:bg-red-600"
                    onClick={() => handleDelete(admin.id)}
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
