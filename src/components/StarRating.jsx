import React from 'react';

export default function StarRating({ value = 0, onChange, size = 'md', readonly = false }) {
  const sizes = { sm: 'text-base', md: 'text-2xl', lg: 'text-3xl' };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= value;
        const half = !filled && star - 0.5 <= value;
        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => onChange && onChange(star)}
            className={`${sizes[size]} transition-transform ${!readonly ? 'hover:scale-110 cursor-pointer' : 'cursor-default'} leading-none`}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontVariationSettings: filled || half ? "'FILL' 1" : "'FILL' 0",
                color: filled || half ? '#f59e0b' : '#d1d5db',
                fontSize: 'inherit',
              }}
            >
              {half ? 'star_half' : 'star'}
            </span>
          </button>
        );
      })}
    </div>
  );
}
