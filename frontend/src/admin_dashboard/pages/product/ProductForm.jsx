import { useState, useEffect } from 'react';

const EMPTY_FORM = {
  title: '',
  price: '',
  description: '',
  category: '',
  image: '',
  rate: '',
  count: '',
};

export default function ProductForm({
  initialValues,
  onSuccess,
  submitLabel = 'Add Product',
  onCancel,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setForm({
        title: initialValues.title ?? '',
        price: initialValues.price ?? '',
        description: initialValues.description ?? '',
        category: initialValues.category ?? '',
        image: initialValues.image ?? '',
        rate: initialValues.rating?.rate ?? '',
        count: initialValues.rating?.count ?? '',
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // extra guard (HTML5 already blocks, this is safety)
    for (const key of Object.keys(form)) {
      if (form[key] === '' || form[key] === null) {
        alert('All fields are mandatory');
        return;
      }
    }

    setLoading(true);

    const payload = {
      title: form.title.trim(),
      price: Number(form.price),
      description: form.description.trim(),
      category: form.category.trim(),
      image: form.image.trim(),
      rating: {
        rate: Number(form.rate),
        count: Number(form.count),
      },
    };

    try {
      const res = await fetch('/api/products/admin/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Add failed');

      const saved = await res.json();
      onSuccess?.(saved);
    } catch (err) {
      console.error(err);
      alert('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="title"
        placeholder="Title"
        className="border px-3 py-2 rounded"
        value={form.title}
        onChange={handleChange}
        required
      />

      <input
        name="price"
        type="number"
        step="0.01"
        min="0"
        placeholder="Price"
        className="border px-3 py-2 rounded"
        value={form.price}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        className="border px-3 py-2 rounded"
        value={form.description}
        onChange={handleChange}
        required
      />

      <input
        name="category"
        placeholder="Category"
        className="border px-3 py-2 rounded"
        value={form.category}
        onChange={handleChange}
        required
      />

      <input
        name="image"
        placeholder="Image URL"
        className="border px-3 py-2 rounded"
        value={form.image}
        onChange={handleChange}
        required
      />

      <div className="flex gap-2">
        <input
          name="rate"
          type="number"
          step="0.1"
          min="0"
          placeholder="Rating (rate)"
          className="border px-3 py-2 rounded w-full"
          value={form.rate}
          onChange={handleChange}
          required
        />
        <input
          name="count"
          type="number"
          min="0"
          placeholder="Stock (count)"
          className="border px-3 py-2 rounded w-full"
          value={form.count}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : submitLabel}
        </button>

        {onCancel && (
          <button
            type="button"
            className="border px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
