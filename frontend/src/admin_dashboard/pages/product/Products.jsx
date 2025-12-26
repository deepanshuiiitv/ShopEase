import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal';

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    open: false,
    action: null,
    payload: null,
    title: '',
    message: '',
  });

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    fetch('/api/products/all')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Fetch failed', err))
      .finally(() => setLoading(false));
  }, []);

  // ================= ACTION HANDLERS =================
  const handleDelete = (id) => {
    setModal({
      open: true,
      action: 'delete',
      payload: id,
      title: 'Delete Product',
      message: 'Are you sure you want to delete this product?',
    });
  };

  const confirmDelete = async () => {
    try {
      await fetch(`/api/products/admin/deleteproduct/${modal.payload}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setProducts((prev) =>
        prev.filter((p) => p.id !== modal.payload)
      );
    } catch (err) {
      console.error('Delete failed', err);
    }
    setModal({ open: false });
  };

  const handleEdit = (product) => {
    setModal({
      open: true,
      action: 'edit',
      payload: product,
      title: 'Edit Product',
      message: 'Proceed to edit this product?',
    });
  };

  const confirmEdit = () => {
    navigate('/admindashboard/edit-product', {
      state: { product: modal.payload },
    });
    setModal({ open: false });
  };

  const handleAdd = () => {
    setModal({
      open: true,
      action: 'add',
      title: 'Add Product',
      message: 'Proceed to add new product?',
    });
  };

  const confirmAdd = () => {
    navigate('/admindashboard/add-product');
    setModal({ open: false });
  };

  const handleView = (product) => {
    navigate('/admindashboard/product-detail', {
      state: { product },
    });
  };

  const handleConfirm = () => {
    if (modal.action === 'delete') confirmDelete();
    else if (modal.action === 'edit') confirmEdit();
    else if (modal.action === 'add') confirmAdd();
  };

  // ================= UI =================
  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-blue-700">Products</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700"
          onClick={handleAdd}
        >
          + Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700">ID</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700">Title</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700">Price</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-700">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-blue-100">
            {products.map((product, idx) => (
              <tr
                key={product.id}
                className={
                  idx % 2 === 0
                    ? 'bg-blue-50 hover:bg-blue-100'
                    : 'hover:bg-blue-100'
                }
              >
                <td className="px-6 py-4">{product.id}</td>
                <td className="px-6 py-4">{product.title}</td>
                <td className="px-6 py-4">₹{product.price}</td>
                <td className="px-6 py-4">
                  {product.rating?.count ?? 0}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                    onClick={() => handleView(product)}
                  >
                    View
                  </button>
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
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
        onCancel={() => setModal({ open: false })}
        confirmLabel={
          modal.action === 'delete'
            ? 'Delete'
            : modal.action === 'edit'
            ? 'Edit'
            : 'Add'
        }
      />
    </div>
  );
}
