import React, { useRef, useState } from 'react';
import { resolveImageUrl } from '../utils/imageUrl';

export default function CarCard({ car, onBookNow }) {
  const [imgIdx, setImgIdx] = useState(0);
  const touchX = useRef(null);

  const images = Array.isArray(car.images)
    ? car.images
    : typeof car.images === 'string'
    ? JSON.parse(car.images || '[]')
    : [];

  const total = images.length;
  const prev = () => setImgIdx((i) => (i - 1 + total) % total);
  const next = () => setImgIdx((i) => (i + 1) % total);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchX.current = null;
  };

  const placeholder = 'https://placehold.co/600x400/ebeeef/717973?text=No+Image';

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden border border-zinc-100 flex flex-col transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: '0 4px 16px rgba(1,45,29,0.06)' }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 12px 32px rgba(1,45,29,0.12)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(1,45,29,0.06)')}
    >
      {/* ── Image slider ─────────────────────────────────────────────── */}
      <div
        className="relative aspect-[4/3] overflow-hidden bg-zinc-100 select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Slide track — each image is absolute, offset by (i - imgIdx) * 100% */}
        {(total > 0 ? images : [null]).map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 w-full h-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(${(i - imgIdx) * 100}%)` }}
          >
            <img
              src={img ? resolveImageUrl(img) : placeholder}
              alt={car.name}
              draggable={false}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Badge */}
        {car.badge && (
          <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-secondary text-xs font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">bolt</span>
            {car.badge}
          </div>
        )}

        {/* Arrow buttons — only when 2+ images */}
        {total > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Previous image"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Next image"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </>
        )}

        {/* Dot indicators */}
        {total > 1 && (
          <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === imgIdx ? 'w-3 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-serif text-xl font-semibold text-primary mb-2">{car.name}</h3>
        <p className="text-zinc-500 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">{car.description}</p>

        {car.seat && (
          <div className="flex mb-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-secondary-fixed-dim/20 text-secondary text-xs font-semibold rounded-lg">
              <span className="material-symbols-outlined text-[13px]">airline_seat_recline_normal</span>
              {car.seat}
            </span>
          </div>
        )}

        <button
          onClick={() => onBookNow && onBookNow(car)}
          className="w-full py-3 bg-primary text-white rounded-lg font-semibold text-sm tracking-wide hover:bg-secondary transition-all duration-200 active:scale-95"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
