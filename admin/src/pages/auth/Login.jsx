import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo: just redirect
    navigate('/products');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-4 text-center">Admin Login</h1>
        <input
          className="border rounded px-3 py-2"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="border rounded px-3 py-2"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition mt-2"
        >
          Login
        </button>
      </form>
    </div>
  );
} 