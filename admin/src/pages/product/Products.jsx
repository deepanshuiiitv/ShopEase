import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal';

const initialProducts = [
  { id: 1, name: 'Laptop', price: '$999', stock: 12 },
  { id: 2, name: 'Smartphone', price: '$699', stock: 30 },
  { id: 3, name: 'Headphones', price: '$199', stock: 50 },
  { id: 4, name: 'Keyboard', price: '$49', stock: 100 },
];

export default function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState(() => {
    if (location.state && location.state.newProduct) {
      return [
        ...initialProducts,
        { ...location.state.newProduct, id: Date.now(), stock: Number(location.state.newProduct.stock) },
      ];
    }
    if (location.state && location.state.updatedProduct) {
      return initialProducts.map((p) =>
        p.id === location.state.updatedProduct.id ? { ...location.state.updatedProduct, stock: Number(location.state.updatedProduct.stock) } : p
      );
    }
    return initialProducts;
  });

  // Modal state
  const [modal, setModal] = useState({ open: false, action: null, payload: null });

  // Delete
  const handleDelete = (id) => {
    setModal({
      open: true,
      action: 'delete',
      payload: id,
      title: 'Delete Product',
      message: 'Are you sure you want to delete this product?'
    });
  };
  const confirmDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== modal.payload));
    setModal({ open: false, action: null, payload: null });
  };

  // Edit
  const handleEdit = (product) => {
    setModal({
      open: true,
      action: 'edit',
      payload: product,
      title: 'Edit Product',
      message: 'Are you sure you want to edit this product?'
    });
  };
  const confirmEdit = () => {
    navigate('/edit-product', { state: { product: modal.payload } });
    setModal({ open: false, action: null, payload: null });
  };

  // Add
  const handleAdd = () => {
    setModal({
      open: true,
      action: 'add',
      title: 'Add Product',
      message: 'Are you sure you want to add a new product?'
    });
  };
  const confirmAdd = () => {
    navigate('/add-product');
    setModal({ open: false, action: null, payload: null });
  };

  // View
  const handleView = (product) => {
    navigate('/product-detail', { state: { product } });
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
        <h1 className="text-3xl font-extrabold text-blue-700">Products</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 transition"
          onClick={handleAdd}
        >
          + Add Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-100">
            {products.map((product, idx) => (
              <tr key={product.id} className={idx % 2 === 0 ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-blue-100'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">{product.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900 flex gap-2">
                  <button
                    className="px-3 py-1 rounded bg-blue-500 text-white font-bold hover:bg-blue-600"
                    onClick={() => handleView(product)}
                  >
                    View
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-yellow-400 text-white font-bold hover:bg-yellow-500"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-500 text-white font-bold hover:bg-red-600"
                    onClick={() => handleDelete(product.id)}
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
