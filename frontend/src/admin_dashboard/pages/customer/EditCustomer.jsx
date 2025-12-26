import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CustomerForm from './CustomerForm';
import ConfirmModal from '../../components/ConfirmModal';

export default function EditCustomer() {
  const location = useLocation();
  const navigate = useNavigate();
  const customer = location.state?.customer;
  const [modal, setModal] = useState({ open: false, action: null });
  const [pendingForm, setPendingForm] = useState(null);

  if (!customer) {
    navigate('/admindashboard/customers');
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
      navigate('/admindashboard/customers', {
        state: { updatedCustomer: { ...customer, ...pendingForm } },
      });
    } else if (modal.action === 'cancel') {
      navigate('/admindashboard/customers');
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
      <h1 className="text-3xl font-extrabold mb-6 text-blue-700">
        Edit Customer
      </h1>
      <CustomerForm
        initialValues={customer}
        onSubmit={handleSubmit}
        submitLabel="Update Customer"
        onCancel={handleCancel}
      />
      <ConfirmModal
        open={modal.open}
        title={modal.action === 'update' ? 'Update Customer' : 'Cancel Edit Customer'}
        message={
          modal.action === 'update'
            ? 'Are you sure you want to update this customer?'
            : 'Are you sure you want to cancel editing this customer?'
        }
        onConfirm={handleConfirm}
        onCancel={handleModalCancel}
        confirmLabel={modal.action === 'update' ? 'Update' : 'Cancel'}
      />
    </div>
  );
}
