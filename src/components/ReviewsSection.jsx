import React, { useState, useEffect } from 'react';
import { getReviews, createReview } from '../api';
import StarRating from './StarRating';
import { GOOGLE_REVIEW_URL } from '../seo/site';
import { trackEvent } from '../utils/analytics';

// Google "G" mark in brand colors (decorative).
function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 rounded-full bg-white p-0.5">
      <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h6a5.1 5.1 0 0 1-2.2 3.4v2.8h3.6c2.1-1.9 3.2-4.8 3.2-8.2Z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.4-2.7l-3.6-2.8c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.7H2v2.9A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.7 13.9a6.6 6.6 0 0 1 0-4.2V6.8H2a11 11 0 0 0 0 9.9l3.7-2.8Z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2 6.8l3.7 2.9C6.6 7.4 9.1 5.4 12 5.4Z" />
    </svg>
  );
}

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
    <section data-md-skip className="section bg-white">
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
          <div className="flex flex-wrap gap-3 self-start sm:self-auto">
            {/* Google reviews drive local ranking: make leaving one a single tap. */}
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('google_review_click', { location: 'reviews_section' })}
              className="btn-primary"
            >
              <GoogleG />
              Review us on Google
            </a>
            <button
              onClick={() => setShowForm((o) => !o)}
              className="btn-outline"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              Write a Review
            </button>
          </div>
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
