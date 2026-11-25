import React, { useState, useEffect } from 'react';
import { getReviews, createReview } from '../api';
import StarRating from './StarRating';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [loadError, setLoadError] = useState(false);

  const fetchReviews = () => {
    getReviews()
      .then((r) => { setReviews(r.data); setLoadError(false); })
      .catch(() => setLoadError(true));
  };

  useEffect(() => { fetchReviews(); }, []);

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createReview({ ...form, name: form.name || 'Guest' });
      fetchReviews();
      setSubmitted(true);
      setForm({ name: '', rating: 5, comment: '' });
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      setError('Your review could not be saved. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section bg-white">
      <div className="container-page">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow mb-3">Reviews</p>
            <h2 className="section-title">What our guests say</h2>
            {reviews.length > 0 && <div className="flex items-center gap-3 mt-4">
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <span key={s} className="material-symbols-outlined text-amber-400 text-xl"
                    style={{ fontVariationSettings: s <= Math.round(Number(avgRating)) ? "'FILL' 1" : "'FILL' 0" }}>
                    star
                  </span>
                ))}
              </div>
              <span className="text-primary font-bold text-lg">{avgRating}</span>
              <span className="text-zinc-400 text-sm">/ 5 ({reviews.length} reviews)</span>
            </div>}
          </div>
          <button
            onClick={() => setShowForm((o) => !o)}
            className="btn-outline self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            Write a Review
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-zinc-100 p-6 mb-10"
            style={{ boxShadow: '0 4px 16px rgba(1,45,29,0.06)' }}>
            <h3 className="font-serif text-xl font-semibold text-primary mb-4">Share Your Experience</h3>
            {error && <p role="alert" className="text-error mb-4">{error}</p>}
            {submitted ? (
              <div className="flex items-center gap-3 text-secondary py-2">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-semibold">Thank you for your review!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-sm text-primary block mb-1.5">Your Name <span className="text-zinc-400 font-normal">(optional)</span></label>
                    <input
                      type="text"
                      placeholder="Guest"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-sm text-primary block mb-1.5">Rating <span className="text-error">*</span></label>
                    <StarRating value={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} size="md" />
                  </div>
                </div>
                <div>
                  <label className="font-semibold text-sm text-primary block mb-1.5">Comment <span className="text-error">*</span></label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about your experience..."
                    value={form.comment}
                    onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                    className="input-field resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" disabled={loading}
                    className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-secondary transition-all disabled:opacity-60">
                    {loading ? 'Submitting...' : 'Submit Review'}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}
                    className="border border-zinc-200 text-zinc-500 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-zinc-50 transition-all">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Reviews Grid */}
        {reviews.length === 0 ? (
          <div className="text-center rounded-[1.75rem] bg-sand py-14 px-6 text-zinc-500">
            <span className="material-symbols-outlined text-5xl block mb-3">rate_review</span>
            <p>{loadError ? 'Reviews are temporarily unavailable. Please try again later.' : 'No reviews yet. Be the first!'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ReviewCard({ review }) {
  const date = new Date(review.created_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center shrink-0">
          <span className="font-bold text-on-primary-container text-sm">
            {(review.name || 'G')[0].toUpperCase()}
          </span>
        </div>
        <span className="text-zinc-400 text-xs">{date}</span>
      </div>
      <p className="font-semibold text-primary text-sm mb-1">{review.name || 'Guest'}</p>
      <div className="flex mb-3">
        {[1,2,3,4,5].map((s) => (
          <span key={s} className="material-symbols-outlined text-amber-400 text-sm"
            style={{ fontVariationSettings: s <= review.rating ? "'FILL' 1" : "'FILL' 0" }}>
            star
          </span>
        ))}
      </div>
      <p className="text-zinc-600 text-sm leading-relaxed">{review.comment}</p>
    </div>
  );
}
