import React, { useEffect, useState } from 'react';
import { getAddresses, createAddress, deleteAddress } from '../../api';
import { MOCK_ADDRESSES } from '../../utils/mockData';

export default function AdminAddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '' });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchAddresses = () => {
    setLoading(true);
    getAddresses()
      .then((r) => setAddresses(r.data))
      .catch(() => setAddresses(MOCK_ADDRESSES))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAddresses(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    try {
      await createAddress(form);
      setForm({ name: '' });
      fetchAddresses();
    } catch (err) {
      setSaveError(err.response?.data?.message || 'Failed to add. Please check your connection.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try { await deleteAddress(id); } catch {}
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h2 className="font-serif text-3xl font-bold text-primary">Pickup Addresses</h2>
        <p className="text-zinc-400 mt-1">Manage the address options shown in the booking form.</p>
      </div>

      {/* Add form */}
      <div className="bg-white rounded-2xl border border-zinc-100 p-6 mb-6"
        style={{ boxShadow: '0 4px 12px rgba(1,45,29,0.05)' }}>
        <h3 className="font-serif text-lg font-semibold text-primary mb-4">Add New Location</h3>
        {saveError && (
          <div className="mb-4 px-4 py-3 bg-error-container text-on-error-container rounded-xl text-sm">{saveError}</div>
        )}
        <form onSubmit={handleAdd} className="flex gap-3">
          <input
            type="text"
            placeholder="e.g. Club House Main Gate"
            value={form.name}
            onChange={(e) => setForm({ name: e.target.value })}
            required
            className="input-field flex-1"
          />
          <button type="submit" disabled={saving}
            className="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-secondary transition-colors whitespace-nowrap disabled:opacity-60 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">add</span>
            {saving ? 'Adding...' : 'Add'}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden"
        style={{ boxShadow: '0 4px 12px rgba(1,45,29,0.05)' }}>
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-zinc-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : addresses.length === 0 ? (
          <div className="text-center py-12 text-zinc-400">
            <span className="material-symbols-outlined text-4xl block mb-2">location_off</span>
            <p className="text-sm">No addresses yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-zinc-50">
            {addresses.map((addr) => (
              <li key={addr.id} className="flex items-center gap-4 px-5 py-4 hover:bg-zinc-50/50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-primary-container/50 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                </div>
                <span className="flex-1 font-medium text-primary text-sm">{addr.name}</span>
                <button onClick={() => setDeleteConfirm(addr.id)}
                  className="text-zinc-400 hover:text-error transition-colors p-1.5 hover:bg-red-50 rounded-lg">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-2xl p-7 text-center"
            style={{ boxShadow: '0 24px 48px rgba(1,45,29,0.2)' }}>
            <h3 className="font-serif text-xl font-bold text-primary mb-2">Delete Address?</h3>
            <p className="text-zinc-400 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 border border-zinc-200 rounded-xl text-zinc-500 font-semibold text-sm hover:bg-zinc-50">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 bg-error text-white rounded-xl font-semibold text-sm hover:opacity-90">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
