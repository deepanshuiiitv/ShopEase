import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ✅ Vite env variables
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_DASHBOARD_EMAIL;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_DASHBOARD_PASSWORD;

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      form.email === ADMIN_EMAIL &&
      form.password === ADMIN_PASSWORD
    ) {
      // ✅ persist admin session (sidebar-safe)
      sessionStorage.setItem('adminSession', 'true');

      navigate('/admindashboard/products', { replace: true });
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-3xl font-extrabold text-blue-700 text-center">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border rounded px-3 py-2"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border rounded px-3 py-2"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
