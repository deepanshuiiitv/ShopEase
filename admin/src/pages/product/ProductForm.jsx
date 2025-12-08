import { useState, useEffect } from 'react';

export default function ProductForm({ initialValues, onSubmit, submitLabel, onCancel }) {
  const [form, setForm] = useState(initialValues || { name: '', price: '', stock: '' });

  useEffect(() => {
    setForm(initialValues || { name: '', price: '', stock: '' });
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className="border rounded px-3 py-2"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        className="border rounded px-3 py-2"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
      />
      <input
        className="border rounded px-3 py-2"
        name="stock"
        placeholder="Stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
} 