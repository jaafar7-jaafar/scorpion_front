import React, { useEffect, useState } from 'react';
import { getReviews, deleteReview } from '../../api';
import { MOCK_REVIEWS } from '../../utils/mockData';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchReviews = () => {
    setLoading(true);
    getReviews()
      .then((r) => setReviews(r.data))
      .catch(() => setReviews(MOCK_REVIEWS))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleDelete = async (id) => {
    try { await deleteReview(id); } catch {}
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setDeleteConfirm(null);
  };

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-serif text-3xl font-bold text-primary">Reviews</h2>
        <p className="text-zinc-400 mt-1">Manage customer reviews and ratings.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Reviews', value: reviews.length, icon: 'rate_review' },
          { label: 'Average Rating', value: `${avg} / 5`, icon: 'star' },
          { label: '5-Star Reviews', value: reviews.filter((r) => r.rating === 5).length, icon: 'star_rate' },
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-white rounded-xl p-5 border border-zinc-100"
            style={{ boxShadow: '0 4px 12px rgba(1,45,29,0.05)' }}>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-amber-400 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
              <div>
                <p className="font-bold text-primary text-lg">{value}</p>
                <p className="text-zinc-400 text-xs">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reviews list */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-zinc-100 animate-pulse">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-zinc-200 rounded w-1/4" />
                  <div className="h-3 bg-zinc-100 rounded w-3/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16 text-zinc-400 bg-white rounded-2xl border border-zinc-100">
          <span className="material-symbols-outlined text-5xl block mb-3">rate_review</span>
          <p>No reviews yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white rounded-xl p-5 border border-zinc-100 flex items-start gap-4"
              style={{ boxShadow: '0 2px 8px rgba(1,45,29,0.04)' }}>
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                <span className="font-bold text-primary text-sm">{(r.name || 'G')[0].toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-primary text-sm">{r.name || 'Guest'}</span>
                  <div className="flex">
                    {[1,2,3,4,5].map((s) => (
                      <span key={s} className="material-symbols-outlined text-amber-400 text-xs"
                        style={{ fontVariationSettings: s <= r.rating ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                    ))}
                  </div>
                  <span className="text-zinc-400 text-xs ml-auto">
                    {new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-zinc-500 text-sm mt-1 leading-relaxed">{r.comment}</p>
              </div>
              <button onClick={() => setDeleteConfirm(r.id)}
                className="text-zinc-400 hover:text-error transition-colors p-1.5 hover:bg-red-50 rounded-lg shrink-0">
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          ))}
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
            <h3 className="font-serif text-xl font-bold text-primary mb-2">Delete Review?</h3>
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
