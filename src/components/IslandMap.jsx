import { useRef, useState } from 'react';
import { PLACES } from '../seo/places';
import PlaceIcon from './PlaceIcon';

// Illustrated, interactive Ambergris Caye: pick a stop and a golf cart drives there.
// The SVG is decorative (aria-hidden); the list of buttons is the accessible control.
const CART_PATHS = (
  <>
    <path d="M4.5 4.5h13" /><path d="M6.5 4.5 5 11.5" /><path d="M16.5 4.5v7" />
    <path d="M12.5 8v3.5M12.5 8H15" /><path d="M7.5 8.5 9 10" />
    <path d="M2.5 15V12.7c0-.66.54-1.2 1.2-1.2H18.5l3 3.5H2.5Z" fill="#fff" />
    <circle cx="6.5" cy="17.2" r="2.1" fill="#fff" /><circle cx="17.2" cy="17.2" r="2.1" fill="#fff" />
  </>
);

function Palm({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke="#2b694d" strokeWidth="1.6" fill="none" strokeLinecap="round" className="map-palm">
      <path d="M0 0c-.2-5 .3-9 2-13" />
      <path d="M2-13c-1.6-3.4-5-4.8-9-3.7 3 .1 5.6 1.6 7.4 4" />
      <path d="M2-13c.7-3.7 3.8-6 7.8-5.8-2.7.9-4.8 3-5.8 5.8" />
      <path d="M2-13c-3.4-.7-7 1-8.5 4.4 2.1-1.7 4.9-2.7 7.6-2.3" />
      <path d="M2-13c3.4-.2 6.5 1.8 7.4 5.2-1.7-1.8-4.2-3-6.7-3.2" />
    </g>
  );
}

export default function IslandMap({ onBookNow, initial = 'town', stacked = false }) {
  const [activeId, setActiveId] = useState(initial);
  const [facing, setFacing] = useState('left');
  const prev = useRef(PLACES.find((p) => p.id === initial));
  const active = PLACES.find((p) => p.id === activeId);

  const go = (place) => {
    if (place.id === activeId) return;
    setFacing(place.x > prev.current.x ? 'right' : 'left');
    prev.current = place;
    setActiveId(place.id);
  };

  return (
    <div className={`grid gap-6 ${stacked ? '' : 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-10'}`}>
      <div className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-[linear-gradient(135deg,#c6efe9,#7fcfcf)] shadow-[0_30px_60px_-25px_rgba(1,45,29,0.35)]">
        <svg aria-hidden="true" viewBox="0 0 320 540" className="mx-auto block h-[440px] w-auto md:h-[540px]">
          <defs>
            <linearGradient id="map-land" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#e9f0d4" /><stop offset=".55" stopColor="#f4e7c8" /><stop offset="1" stopColor="#f1dfb7" />
            </linearGradient>
          </defs>

          {/* Drifting sea waves */}
          <g className="map-waves" stroke="#ffffff" strokeOpacity=".55" strokeWidth="1.5" fill="none" strokeLinecap="round">
            <path d="M262 90c6 0 6-4 12-4s6 4 12 4" /><path d="M40 330c6 0 6-4 12-4s6 4 12 4" />
            <path d="M270 300c6 0 6-4 12-4s6 4 12 4" /><path d="M30 470c6 0 6-4 12-4s6 4 12 4" />
            <path d="M250 480c6 0 6-4 12-4s6 4 12 4" />
          </g>

          {/* Belize Barrier Reef offshore to the east */}
          <path d="M252 40c10 120 4 260-6 360-5 50-10 90-18 140" stroke="#ffffff" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" fill="none" opacity=".9" />
          <text x="268" y="250" transform="rotate(84 268 250)" fontSize="10" fontWeight="700" letterSpacing="2" fill="#0f766e" opacity=".75">BARRIER REEF</text>
          <text x="40" y="150" fontSize="10" fontWeight="700" letterSpacing="2" fill="#0f766e" opacity=".6">LAGOON</text>
          <text x="232" y="520" fontSize="9" fontWeight="700" letterSpacing="1.5" fill="#0f766e" opacity=".6">CARIBBEAN SEA</text>

          {/* Island */}
          <path d="M150 18c32-4 62 6 72 40 8 30 6 70 2 110-4 44-12 92-18 142-5 42-9 86-15 126-5 36-12 70-24 96-8 6-16 4-20-6-4-22-4-46-2-70 2-30 6-60 4-92-2-22-14-36-28-50-14-16-24-38-22-66 2-30 14-58 16-90 2-22 10-36 35-40Z"
            fill="url(#map-land)" stroke="#e0c98f" strokeWidth="2.5" />
          {/* River channel at Boca del Rio, with the bridge */}
          <path d="M150 340c18-4 38-4 60 2" stroke="#7fcfcf" strokeWidth="6" fill="none" strokeLinecap="round" />
          <rect x="172" y="333" width="12" height="14" rx="2" fill="#c49a5a" />

          {/* Roads */}
          <path className="map-road" d="M186 120c-2 60-6 130-8 214 0 40-2 70-8 104-4 22-8 40-8 46" stroke="#c9ab72" strokeWidth="3" strokeDasharray="6 5" fill="none" strokeLinecap="round" />
          <path className="map-road" d="M182 236c-18 2-38 8-56 16" stroke="#c9ab72" strokeWidth="3" strokeDasharray="6 5" fill="none" strokeLinecap="round" />

          {/* Airstrip and plane */}
          <rect x="150" y="424" width="34" height="9" rx="2" fill="#9aa39b" transform="rotate(-8 167 428)" />
          <path className="map-plane" d="M214 446l10 3 8-6 3 1-5 7 8 2 2-2 2 1-2 4 0 0-4-1-6 3-3-1 3-4-9-2-6 3-2-1 4-4-6-3z" fill="#012d1d" opacity=".7" />

          {/* Boat by the reef */}
          <g className="map-boat"><path d="M222 386h18l-3 5h-12z" fill="#ffffff" /><path d="M230 386v-10l6 8z" fill="#f2b544" /></g>

          {/* Palms and compass */}
          <Palm x={160} y={96} /><Palm x={196} y={200} s={0.9} /><Palm x={112} y={276} s={0.8} /><Palm x={196} y={460} s={0.85} />
          <g transform="translate(46 54)" fill="none" stroke="#012d1d" strokeWidth="1.5">
            <circle r="15" strokeOpacity=".35" /><path d="M0-11 4 0 0 11-4 0z" fill="#f2b544" stroke="none" />
            <text y="-19" textAnchor="middle" fontSize="10" fontWeight="800" fill="#012d1d" stroke="none">N</text>
          </g>

          {/* Stops */}
          {PLACES.map((p) => (
            <g key={p.id} onClick={() => go(p)} className="cursor-pointer">
              {p.id === activeId && <circle cx={p.x} cy={p.y} r="9" fill="#f2b544" className="map-pulse" />}
              <circle cx={p.x} cy={p.y} r="7" fill={p.id === activeId ? '#f2b544' : '#ffffff'} stroke="#012d1d" strokeWidth="2.5" />
            </g>
          ))}

          {/* The golf cart drives to the active stop */}
          <g className="map-cart" style={{ transform: `translate(${active.x - 15}px, ${active.y - 36}px)` }}>
            <g className="map-cart-bump">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#012d1d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" overflow="visible">
                <g transform={facing === 'right' ? 'matrix(-1 0 0 1 24 0)' : undefined}>{CART_PATHS}</g>
              </svg>
            </g>
          </g>
        </svg>
        <p className="absolute bottom-3 left-4 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-zinc-600 backdrop-blur">Illustrated map · not to scale</p>
      </div>

      <div>
        <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 [scrollbar-width:none]" aria-label="Choose a stop on Ambergris Caye">
          {PLACES.map((p) => (
            <li key={p.id} className="shrink-0">
              <button
                type="button"
                onClick={() => go(p)}
                aria-pressed={p.id === activeId}
                className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition-all ${p.id === activeId ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20' : 'border-zinc-200 bg-white text-primary hover:border-secondary/40'}`}
              >
                <span aria-hidden="true" className={p.id === activeId ? 'text-sun' : 'text-secondary'}><PlaceIcon icon={p.icon} size={18} /></span>
                {p.name}
              </button>
            </li>
          ))}
        </ul>
        <div key={active.id} className="map-card mt-5 rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-zinc-200/70 md:p-8" aria-live="polite">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sun-soft text-amber-800"><PlaceIcon icon={active.icon} /></span>
            <p className="font-serif text-2xl font-bold text-primary">{active.name}</p>
          </div>
          <p className="mt-4 leading-relaxed text-zinc-600">{active.text}</p>
          {onBookNow && (
            <button type="button" onClick={() => onBookNow(null, { notes: `Planning to visit: ${active.name}` })} className="btn-primary mt-6">
              Book a cart for this trip
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
