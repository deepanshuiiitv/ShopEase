import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AdminForm from './AdminForm';
import ConfirmModal from '../../components/ConfirmModal';

export default function EditAdmin() {
  const location = useLocation();
  const navigate = useNavigate();
  const admin = location.state?.admin;
  const [modal, setModal] = useState({ open: false, action: null });
  const [pendingForm, setPendingForm] = useState(null);

  if (!admin) {
    navigate('/admins');
    return null;
  }

  const handleSubmit = (form) => {
    setPendingForm(form);
    setModal({ open: true, action: 'update' });
  };

  const handleCancel = () => {
    setModal({ open: true, action: 'cancel' });
  };

  const handleConfirm = () => {
    if (modal.action === 'update') {
      navigate('/admins', { state: { updatedAdmin: { ...admin, ...pendingForm } } });
    } else if (modal.action === 'cancel') {
      navigate('/admins');
    }
    setModal({ open: false, action: null });
    setPendingForm(null);
  };

  const handleModalCancel = () => {
    setModal({ open: false, action: null });
    setPendingForm(null);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 md:mt-8 mt-4">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-700">Edit Admin</h1>
      <AdminForm
        initialValues={admin}
        onSubmit={handleSubmit}
        submitLabel="Update Admin"
        onCancel={handleCancel}
      />
      <ConfirmModal
        open={modal.open}
        title={modal.action === 'update' ? 'Update Admin' : 'Cancel Edit Admin'}
        message={modal.action === 'update' ? 'Are you sure you want to update this admin?' : 'Are you sure you want to cancel editing this admin?'}
        onConfirm={handleConfirm}
        onCancel={handleModalCancel}
        confirmLabel={modal.action === 'update' ? 'Update' : 'Cancel'}
      />
    </div>
  );
} 