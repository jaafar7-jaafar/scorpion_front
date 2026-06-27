import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/admin/cars', icon: 'directions_car', label: 'Manage Carts' },
  { to: '/admin/reviews', icon: 'star', label: 'Reviews' },
  { to: '/admin/addresses', icon: 'location_on', label: 'Addresses' },
  { to: '/admin/seats', icon: 'airline_seat_recline_normal', label: 'Seat Options' },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-zinc-50 border-r border-zinc-200 flex flex-col py-6 z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="px-6 mb-8">
          <h1 className="font-serif text-lg font-bold text-primary">Admin Portal</h1>
          <p className="text-zinc-400 text-xs mt-0.5 font-medium uppercase tracking-wider">Fleet Management</p>
        </div>

        <nav className="flex-1 space-y-1 px-2">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-medium transition-all duration-200 hover:translate-x-0.5 ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'text-zinc-500 hover:bg-primary/5 hover:text-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 mt-4">
          <NavLink
            to="/admin/cars"
            className="w-full bg-primary text-white py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm hover:bg-secondary transition-colors shadow-md shadow-primary/20"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add New Cart
          </NavLink>
        </div>

        <div className="border-t border-zinc-200 mt-4 pt-4 space-y-1 px-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-zinc-500 hover:bg-red-50 hover:text-error rounded-xl text-sm font-medium transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Sign Out
          </button>
        </div>

        <div className="mt-4 px-6 pt-4 border-t border-zinc-200 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center">
            <span className="font-bold text-primary text-sm">A</span>
          </div>
          <div>
            <p className="text-sm font-bold text-primary leading-none">Admin User</p>
            <p className="text-xs text-zinc-400 mt-0.5">Fleet Director</p>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <main className="md:ml-64 flex-1 min-h-screen">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-zinc-200 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)}>
            <span className="material-symbols-outlined">menu</span>
          </button>
          <span className="font-serif font-bold text-primary">Admin Portal</span>
        </div>

        <div className="p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
