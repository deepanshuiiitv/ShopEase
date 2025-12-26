import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
  { name: 'Products', path: 'products', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
    </svg>
  ) },
  { name: 'Customers', path: 'customers', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M4 20v-1a4 4 0 014-4h8a4 4 0 014 4v1" stroke="currentColor" strokeWidth="2" />
    </svg>
  ) },
  { name: 'Admins', path: 'admins', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M6 20v-2a4 4 0 014-4h0a4 4 0 014 4v2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 11V7a4 4 0 00-8 0v4" stroke="currentColor" strokeWidth="2" />
    </svg>
  ) },
  { name: 'Sales', path: 'sales', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M3 17l6-6 4 4 8-8" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M14 7h7v7" stroke="currentColor" strokeWidth="2" />
    </svg>
  ) },
  { name: 'Logout', path: 'logout', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
    </svg>
  ) },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  if (["/login", "/logout"].includes(location.pathname)) return null;
  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-white rounded shadow-lg border"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {/* Sidebar */}
      <aside
        className={`flex flex-col fixed md:static z-20 top-0 left-0 min-h-screen w-64 bg-gradient-to-b from-blue-600 to-blue-400 text-white border-r shadow-lg transform transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="flex items-center gap-2 py-6 px-6 border-b border-blue-500">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
            <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-2xl font-extrabold tracking-tight">ShopEase</span>
        </div>
        <nav className="flex flex-col gap-2 mt-8 px-4 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-3 hover:bg-blue-500/60 hover:text-white ${isActive ? 'bg-white text-blue-700 font-bold shadow' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-white/60 backdrop-blur-sm bg-opacity-30 z-10 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
} 