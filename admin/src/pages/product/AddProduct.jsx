import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import ConfirmModal from '../../components/ConfirmModal';

export default function AddProduct() {
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
      navigate('/products', { state: { newProduct: pendingForm } });
    } else if (modal.action === 'cancel') {
      navigate('/products');
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
      <h1 className="text-3xl font-extrabold mb-6 text-blue-700">Add Product</h1>
      <ProductForm
        initialValues={{ name: '', price: '', stock: '' }}
        onSubmit={handleSubmit}
        submitLabel="Add Product"
        onCancel={handleCancel}
      />
      <ConfirmModal
        open={modal.open}
        title={modal.action === 'add' ? 'Add Product' : 'Cancel Add Product'}
        message={modal.action === 'add' ? 'Are you sure you want to add this product?' : 'Are you sure you want to cancel adding this product?'}
        onConfirm={handleConfirm}
        onCancel={handleModalCancel}
        confirmLabel={modal.action === 'add' ? 'Add' : 'Cancel'}
      />
    </div>
  );
} 