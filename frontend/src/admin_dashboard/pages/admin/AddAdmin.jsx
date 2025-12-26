import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminForm from './AdminForm';
import ConfirmModal from '../../components/ConfirmModal';

export default function AddAdmin() {
  const navigate = useNavigate();
  const [modal, setModal] = useState({ open: false, action: null });
  const [pendingForm, setPendingForm] = useState(null);

  const handleSubmit = (form) => {
    setPendingForm(form);
    setModal({ open: true, action: 'add' });
  };

  const handleCancel = () => {
    setModal({ open: true, action: 'cancel' });
  };

  const handleConfirm = () => {
    if (modal.action === 'add') {
      navigate('/admindashboard/admins', { state: { newAdmin: pendingForm } });
    } else if (modal.action === 'cancel') {
      navigate('/admindashboard/admins');
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
      <h1 className="text-3xl font-extrabold mb-6 text-blue-700">Add Admin</h1>
      <AdminForm
        initialValues={{ name: '', role: '', status: '' }}
        onSubmit={handleSubmit}
        submitLabel="Add Admin"
        onCancel={handleCancel}
      />
      <ConfirmModal
        open={modal.open}
        title={modal.action === 'add' ? 'Add Admin' : 'Cancel Add Admin'}
        message={
          modal.action === 'add'
            ? 'Are you sure you want to add this admin?'
            : 'Are you sure you want to cancel adding this admin?'
        }
        onConfirm={handleConfirm}
        onCancel={handleModalCancel}
        confirmLabel={modal.action === 'add' ? 'Add' : 'Cancel'}
      />
    </div>
  );
}
