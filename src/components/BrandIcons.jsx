// Custom line icons that show what Scorpion actually does: golf carts on an island.
// 24x24 grid, 1.8px round strokes, currentColor — they match Material Symbols weight.
const base = (size, className, title) => ({
  viewBox: '0 0 24 24', width: size, height: size, fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', className,
  'aria-hidden': title ? undefined : true, role: title ? 'img' : undefined,
});

// Side view of a golf cart: canopy, posts, seat, steering wheel, body, wheels.
export function GolfCartIcon({ size = 24, className = '', title, facing = 'left' }) {
  return (
    <svg {...base(size, className, title)}>
      {title && <title>{title}</title>}
      <g transform={facing === 'right' ? 'matrix(-1 0 0 1 24 0)' : undefined}>
        <path d="M4.5 4.5h13" />
        <path d="M6.5 4.5 5 11.5" />
        <path d="M16.5 4.5v7" />
        <path d="M12.5 8v3.5M12.5 8H15" />
        <path d="M7.5 8.5 9 10" />
        <path d="M2.5 15V12.7c0-.66.54-1.2 1.2-1.2H18.5l3 3.5H2.5Z" />
        <circle cx="6.5" cy="17.2" r="2.1" />
        <circle cx="17.2" cy="17.2" r="2.1" />
      </g>
    </svg>
  );
}

// Golf cart with three seat rows, for the 6-seater.
export function GolfCartLongIcon({ size = 24, className = '', title }) {
  return (
    <svg {...base(size, className, title)}>
      {title && <title>{title}</title>}
      <path d="M3.5 4.5h17" />
      <path d="M5.5 4.5 4 11.5" />
      <path d="M20 4.5v7" />
      <path d="M10.5 8v3.5M15.5 8v3.5" />
      <path d="M6.5 8.5 8 10" />
      <path d="M1.5 15V12.7c0-.66.54-1.2 1.2-1.2h18.6l1.2 3.5H1.5Z" />
      <circle cx="5.5" cy="17.2" r="2.1" />
      <circle cx="18.5" cy="17.2" r="2.1" />
    </svg>
  );
}

export function PalmIcon({ size = 24, className = '', title }) {
  return (
    <svg {...base(size, className, title)}>
      {title && <title>{title}</title>}
      <path d="M12 21c-.2-4.2.3-7.8 1.8-11" />
      <path d="M13.8 10C12.4 7 9.4 5.7 6 6.6c2.6.1 4.9 1.4 6.4 3.6" />
      <path d="M13.8 10c.6-3.2 3.3-5.2 6.7-5-2.3.8-4.1 2.6-5 5" />
      <path d="M13.8 10c-3-.6-6 .9-7.3 3.8 1.8-1.5 4.2-2.3 6.6-2" />
      <path d="M13.8 10c3-.2 5.6 1.6 6.4 4.5-1.5-1.6-3.6-2.6-5.8-2.8" />
      <path d="M4 21h16" />
    </svg>
  );
}

export function WaveIcon({ size = 24, className = '', title }) {
  return (
    <svg {...base(size, className, title)}>
      {title && <title>{title}</title>}
      <path d="M2 9c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" />
      <path d="M2 14c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" />
      <path d="M2 19c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" />
    </svg>
  );
}

// Golf cart arriving at a door: free delivery to accommodation.
export function DeliveryIcon({ size = 24, className = '', title }) {
  return (
    <svg {...base(size, className, title)}>
      {title && <title>{title}</title>}
      <path d="M15 21V5.5L19 3.5v17.5" />
      <path d="M17.2 12.5v.5" />
      <path d="M1.5 9.5h9" />
      <path d="M2.8 9.5 2 14" />
      <path d="M9.5 9.5V14" />
      <path d="M1 17.5v-2.3c0-.4.3-.7.7-.7h9.8l1.5 3H1Z" />
      <circle cx="4" cy="19.2" r="1.6" />
      <circle cx="10" cy="19.2" r="1.6" />
    </svg>
  );
}
