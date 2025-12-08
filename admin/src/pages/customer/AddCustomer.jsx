import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import ConfirmModal from '../../components/ConfirmModal';

export default function AddCustomer() {
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
      navigate('/customers', { state: { newCustomer: pendingForm } });
    } else if (modal.action === 'cancel') {
      navigate('/customers');
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
      <h1 className="text-3xl font-extrabold mb-6 text-blue-700">Add Customer</h1>
      <CustomerForm
        initialValues={{ name: '', email: '', joined: '' }}
        onSubmit={handleSubmit}
        submitLabel="Add Customer"
        onCancel={handleCancel}
      />
      <ConfirmModal
        open={modal.open}
        title={modal.action === 'add' ? 'Add Customer' : 'Cancel Add Customer'}
        message={modal.action === 'add' ? 'Are you sure you want to add this customer?' : 'Are you sure you want to cancel adding this customer?'}
        onConfirm={handleConfirm}
        onCancel={handleModalCancel}
        confirmLabel={modal.action === 'add' ? 'Add' : 'Cancel'}
      />
    </div>
  );
} 