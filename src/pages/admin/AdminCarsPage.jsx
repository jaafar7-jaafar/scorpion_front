import React, { useEffect, useRef, useState } from 'react';
import { getCars, deleteCar, createCar, updateCar, getSeats } from '../../api';
import { MOCK_CARS, MOCK_SEATS } from '../../utils/mockData';
import { resolveImageUrl } from '../../utils/imageUrl';

const emptyForm = { name: '', description: '', badge: '', seat: '' };
const MAX_IMAGES = 2;

export default function AdminCarsPage() {
  const [cars, setCars] = useState([]);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Image upload state
  const [newImages, setNewImages] = useState([]);
  const [newImgPreviews, setNewImgPreviews] = useState([]);
  const [removeImgs, setRemoveImgs] = useState([]);
  const imgInputRef = useRef(null);

  const fetchCars = () => {
    setLoading(true);
    getCars()
      .then((r) => setCars(r.data))
      .catch(() => setCars(MOCK_CARS))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCars();
    getSeats().then((r) => setSeats(r.data)).catch(() => setSeats(MOCK_SEATS));
  }, []);

  const resetFileState = () => {
    newImgPreviews.forEach(URL.revokeObjectURL);
    setNewImages([]);
    setNewImgPreviews([]);
    setRemoveImgs([]);
    setSaveError('');
  };

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    resetFileState();
    setShowModal(true);
  };

  const openEdit = (car) => {
    setEditing(car);
    setForm({
      name: car.name || '',
      description: car.description || '',
      badge: car.badge || '',
      seat: car.seat || '',
    });
    resetFileState();
    setShowModal(true);
  };

  const closeModal = () => {
    newImgPreviews.forEach(URL.revokeObjectURL);
    setShowModal(false);
  };

  // How many image slots remain
  const existingImages = editing
    ? (Array.isArray(editing.images) ? editing.images : [])
    : [];
  const keptExisting = existingImages.filter((p) => !removeImgs.includes(p));
  const totalImages = keptExisting.length + newImages.length;
  const slotsLeft = MAX_IMAGES - totalImages;

  const handleImgInput = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const available = MAX_IMAGES - totalImages;
    if (available <= 0) { setSaveError(`Maximum ${MAX_IMAGES} images allowed per car.`); e.target.value = ''; return; }

    const toAdd = files.slice(0, available);
    const oversized = toAdd.find((f) => f.size > 5 * 1024 * 1024);
    if (oversized) { setSaveError(`"${oversized.name}" exceeds the 5 MB limit.`); e.target.value = ''; return; }

    setSaveError('');
    setNewImages((prev) => [...prev, ...toAdd]);
    setNewImgPreviews((prev) => [...prev, ...toAdd.map((f) => URL.createObjectURL(f))]);
    e.target.value = '';
  };

  const removeNewImg = (idx) => {
    URL.revokeObjectURL(newImgPreviews[idx]);
    setNewImages((prev) => prev.filter((_, i) => i !== idx));
    setNewImgPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const toggleRemoveExisting = (path) => {
    setRemoveImgs((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');

    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('description', form.description);
    fd.append('badge', form.badge);
    fd.append('seat', form.seat);
    newImages.forEach((f) => fd.append('images', f));
    if (editing) {
      removeImgs.forEach((p) => fd.append('removeImages', p));
    }

    try {
      if (editing) {
        await updateCar(editing.id, fd);
      } else {
        await createCar(fd);
      }
      fetchCars();
      closeModal();
    } catch (err) {
      setSaveError(err.response?.data?.message || 'Failed to save. Check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCar(id);
      setCars((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      setSaveError('Failed to delete. Please try again.');
    }
    setDeleteConfirm(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-serif text-3xl font-bold text-primary">Fleet Inventory</h2>
          <p className="text-zinc-400 mt-1">Oversee and manage your premium golf car rental fleet.</p>
        </div>
        <button onClick={openAdd}
          className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-secondary transition-all shadow-md shadow-primary/20">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Cart
        </button>
      </div>

      {/* Stats */}
      <div className="mb-8">
        <div className="bg-white rounded-xl p-5 border border-zinc-100 w-48"
          style={{ boxShadow: '0 4px 12px rgba(1,45,29,0.05)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Cars</p>
            <span className="material-symbols-outlined text-primary text-[18px]">electric_rickshaw</span>
          </div>
          <p className="font-serif text-2xl font-bold text-primary">{cars.length}</p>
        </div>
      </div>

      {/* Cars Table */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-zinc-100 animate-pulse flex gap-4">
              <div className="w-16 h-16 rounded-lg bg-zinc-200 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-zinc-200 rounded w-1/3" />
                <div className="h-3 bg-zinc-100 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden"
          style={{ boxShadow: '0 4px 12px rgba(1,45,29,0.05)' }}>
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Car</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider hidden md:table-cell">Seat</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider hidden sm:table-cell">Badge</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {cars.map((car) => {
                const imgs = Array.isArray(car.images)
                  ? car.images
                  : typeof car.images === 'string' ? JSON.parse(car.images || '[]') : [];
                const thumb = imgs[0] ? resolveImageUrl(imgs[0]) : null;
                return (
                  <tr key={car.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
                          {thumb ? (
                            <img src={thumb} alt={car.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-zinc-300 text-2xl">electric_rickshaw</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-primary text-sm">{car.name}</p>
                          <p className="text-zinc-400 text-xs line-clamp-1 max-w-xs">{car.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      {car.seat ? (
                        <span className="px-2.5 py-1 bg-secondary-container/50 text-secondary text-xs rounded-full font-semibold">{car.seat}</span>
                      ) : (
                        <span className="text-zinc-300 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="text-zinc-500 text-sm">{car.badge || '—'}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(car)}
                          className="text-zinc-400 hover:text-primary transition-colors p-1.5 hover:bg-zinc-100 rounded-lg">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button onClick={() => setDeleteConfirm(car.id)}
                          className="text-zinc-400 hover:text-error transition-colors p-1.5 hover:bg-red-50 rounded-lg">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {cars.length === 0 && (
            <div className="text-center py-16 text-zinc-400">
              <span className="material-symbols-outlined text-5xl block mb-3">electric_rickshaw</span>
              <p>No cars yet. Add your first one!</p>
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-7 max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: '0 24px 48px rgba(1,45,29,0.2)' }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-xl font-bold text-primary">
                {editing ? 'Edit Cart' : 'Add New Cart'}
              </h3>
              <button onClick={closeModal} className="text-zinc-400 hover:text-zinc-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {saveError && (
              <div className="mb-4 px-4 py-3 bg-error-container text-on-error-container rounded-xl text-sm flex items-start gap-2">
                <span className="material-symbols-outlined text-sm shrink-0 mt-0.5">error</span>
                {saveError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5">
              <Field label="Car Name" required>
                <input type="text" required placeholder="e.g. The Executive 4-Seater" value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="input-field" />
              </Field>
              <Field label="Description" required>
                <textarea rows={3} required placeholder="Describe this car..." value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="input-field resize-none" />
              </Field>
              <Field label="Badge Label" hint="Shows on car image (optional)">
                <input type="text" placeholder="e.g. Premium Electric" value={form.badge}
                  onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))} className="input-field" />
              </Field>
              <Field label="Seat Category" required hint="Appears as a filter button on the Cars page">
                <select
                  required
                  value={form.seat}
                  onChange={(e) => setForm((f) => ({ ...f, seat: e.target.value }))}
                  className="input-field"
                >
                  <option value="">Select seat option…</option>
                  {seats.map((s) => (
                    <option key={s.id} value={s.value}>{s.value}</option>
                  ))}
                </select>
                {seats.length === 0 && (
                  <p className="text-xs text-amber-600 mt-1">
                    No seat options yet — add them in the <strong>Seat Options</strong> section first.
                  </p>
                )}
              </Field>

              {/* ── Images (max 2) ──────────────────────────────────────────── */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-sm text-primary">
                    Images
                    <span className="text-zinc-400 font-normal ml-1.5 text-xs">max 5 MB each</span>
                  </p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    totalImages >= MAX_IMAGES
                      ? 'bg-error-container text-on-error-container'
                      : 'bg-secondary-container/50 text-secondary'
                  }`}>
                    {totalImages} / {MAX_IMAGES}
                  </span>
                </div>

                {/* Existing images (edit mode) */}
                {editing && existingImages.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-zinc-400 mb-2">Click an image to toggle removal:</p>
                    <div className="flex flex-wrap gap-2">
                      {existingImages.map((imgPath) => {
                        const marked = removeImgs.includes(imgPath);
                        return (
                          <button
                            key={imgPath}
                            type="button"
                            title={marked ? 'Click to keep' : 'Click to remove'}
                            onClick={() => toggleRemoveExisting(imgPath)}
                            className="relative group"
                          >
                            <img
                              src={resolveImageUrl(imgPath)}
                              alt=""
                              className={`w-24 h-24 object-cover rounded-xl border-2 transition-all ${
                                marked ? 'border-error opacity-50' : 'border-zinc-200 hover:border-zinc-400'
                              }`}
                            />
                            <div className={`absolute inset-0 rounded-xl flex items-center justify-center transition-opacity ${
                              marked ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
                            } bg-black/25`}>
                              <span className="material-symbols-outlined text-white text-2xl">
                                {marked ? 'delete' : 'close'}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* New image previews */}
                {newImgPreviews.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {newImgPreviews.map((src, idx) => (
                      <div key={idx} className="relative group">
                        <img src={src} alt="" className="w-24 h-24 object-cover rounded-xl border-2 border-secondary/60" />
                        <button
                          type="button"
                          onClick={() => removeNewImg(idx)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-error text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <input
                  ref={imgInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImgInput}
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={slotsLeft <= 0}
                  onClick={() => imgInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border-2 border-dashed rounded-xl text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed border-zinc-300 text-zinc-500 hover:border-secondary hover:text-secondary disabled:hover:border-zinc-300 disabled:hover:text-zinc-500"
                >
                  <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
                  {slotsLeft <= 0 ? 'Maximum images reached' : `Add Image${slotsLeft > 1 ? 's' : ''} (${slotsLeft} slot${slotsLeft > 1 ? 's' : ''} left)`}
                </button>
              </div>

              <div className="flex justify-end gap-3 pt-1">
                <button type="button" onClick={closeModal}
                  className="px-5 py-2.5 border border-zinc-200 rounded-xl text-zinc-500 font-semibold text-sm hover:bg-zinc-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="px-5 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-secondary transition-colors disabled:opacity-60 flex items-center gap-2">
                  {saving && <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>}
                  {saving ? 'Saving…' : editing ? 'Save Changes' : 'Add Car'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-2xl p-7 text-center"
            style={{ boxShadow: '0 24px 48px rgba(1,45,29,0.2)' }}>
            <div className="w-14 h-14 bg-error-container rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-error text-2xl">delete</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-primary mb-2">Delete Car?</h3>
            <p className="text-zinc-400 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 border border-zinc-200 rounded-xl text-zinc-500 font-semibold text-sm hover:bg-zinc-50">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 bg-error text-white rounded-xl font-semibold text-sm hover:opacity-90">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, required, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline gap-2">
        <label className="font-semibold text-sm text-primary">
          {label}{required && <span className="text-error ml-0.5">*</span>}
        </label>
        {hint && <span className="text-xs text-zinc-400">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
