import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
  { name: 'Products', path: 'products', icon: ProductIcon },
  { name: 'Users', path: 'customers', icon: UserIcon },
  { name: 'Sales', path: 'sales', icon: SalesIcon },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // hide sidebar on login page
  if (location.pathname.includes('/admindashboard/login')) return null;

  const handleLogout = () => {
    sessionStorage.removeItem('adminSession');
    navigate('/admindashboard/login', { replace: true });
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-white rounded shadow border"
        onClick={() => setOpen((o) => !o)}
      >
        ☰
      </button>

      <aside
        className={`fixed md:static top-0 left-0 min-h-screen w-64 bg-gradient-to-b from-blue-600 to-blue-400 text-white shadow-lg transition-transform
        ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="py-6 px-6 border-b border-blue-500 text-2xl font-extrabold">
          ShopEase
        </div>

        <nav className="flex flex-col gap-2 mt-6 px-4 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg flex items-center gap-3 font-medium transition
                ${isActive ? 'bg-white text-blue-700 shadow font-bold' : 'hover:bg-blue-500/60'}`
              }
              onClick={() => setOpen(false)}
            >
              <item.icon />
              {item.name}
            </NavLink>
          ))}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-auto px-4 py-2 rounded-lg flex items-center gap-3 font-medium hover:bg-red-500/80 transition"
          >
            <LogoutIcon />
            Logout
          </button>
        </nav>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-10 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

/* ================= ICONS ================= */

function ProductIcon() {
  return <svg className="w-5 h-5" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" /></svg>;
}
function UserIcon() {
  return <svg className="w-5 h-5" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 20v-1a4 4 0 014-4h8a4 4 0 014 4v1" /></svg>;
}
function SalesIcon() {
  return <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8" /></svg>;
}
function LogoutIcon() {
  return <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M17 16l4-4-4-4M21 12H7" /></svg>;
}
