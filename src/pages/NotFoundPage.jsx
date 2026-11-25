import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const LINKS = [
  ['/cars', 'Golf carts & rates'],
  ['/san-pedro-golf-cart-rental-guide', 'San Pedro rental guide'],
  ['/things-to-do-in-san-pedro-by-golf-cart', 'Things to do by golf cart'],
  ['/contact', 'Contact & booking'],
];

// A golf cart stuck in the sand: wheels spin, sand flies, the palm sways.
function StuckCart() {
  const wheel = (cx) => (
    <g className="stuck-wheel" style={{ transformOrigin: `${cx}px 150px` }}>
      <circle cx={cx} cy="150" r="17" fill="#1f2a24" />
      <circle cx={cx} cy="150" r="7" fill="#f2b544" />
      <path d={`M${cx - 15} 150h30M${cx} 135v30`} stroke="#f2b544" strokeWidth="2" />
    </g>
  );
  return (
    <svg aria-hidden="true" viewBox="0 0 360 210" className="mx-auto w-full max-w-md">
      {/* Palm */}
      <g className="stuck-palm" style={{ transformOrigin: '300px 190px' }} stroke="#2b694d" strokeWidth="5" fill="none" strokeLinecap="round">
        <path d="M300 190c-2-40 2-80 14-112" />
        <path d="M314 78c-12-26-38-36-66-28 22 0 42 12 54 30" />
        <path d="M314 78c6-28 30-46 58-44-20 6-36 22-44 44" />
        <path d="M314 78c-26-4-52 8-62 34 16-14 36-20 56-16" />
      </g>
      {/* Sign */}
      <g transform="rotate(-6 64 120)">
        <rect x="60" y="110" width="7" height="70" fill="#c49a5a" />
        <rect x="18" y="86" width="96" height="34" rx="6" fill="#f2b544" />
        <text x="66" y="109" textAnchor="middle" fontSize="15" fontWeight="800" fill="#012d1d">WRONG TURN!</text>
      </g>
      {/* Cart, tilted and stuck */}
      <g className="stuck-cart" style={{ transformOrigin: '200px 150px' }}>
        <g transform="rotate(-7 200 150)">
          <path d="M130 70h138" stroke="#012d1d" strokeWidth="8" strokeLinecap="round" />
          <path d="M150 70l-14 66M258 70v66" stroke="#012d1d" strokeWidth="7" strokeLinecap="round" />
          <path d="M212 104v32M212 104h26" stroke="#012d1d" strokeWidth="7" strokeLinecap="round" />
          <path d="M118 158v-18c0-7 5-12 12-12h148l28 30Z" fill="#ffffff" stroke="#012d1d" strokeWidth="7" strokeLinejoin="round" />
          {wheel(150)}{wheel(262)}
        </g>
      </g>
      {/* Sand flying from the spinning back wheel */}
      {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} className="sand" style={{ '--i': i }} cx="286" cy="164" r="3.5" fill="#d9b77a" />)}
      {/* Dune */}
      <path d="M0 178c60-18 120-20 180-8s120 14 180-4v44H0z" fill="#ecd9ad" />
      <path d="M0 196c80-10 160-12 240-4 50 5 90 4 120-2v20H0z" fill="#e2c98f" />
    </svg>
  );
}

export default function NotFoundPage() {
  return (
    <section className="bg-island px-5 pt-28 pb-24 text-center">
      <Seo title="Page Not Found | Scorpion Golf Cart Rental" noindex />
      <StuckCart />
      <p className="eyebrow mt-6 mb-4">Error 404</p>
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-zinc-600">Looks like this cart took a wrong turn at Secret Beach. Let's get you back on the road:</p>
      <ul className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
        {LINKS.map(([to, label]) => <li key={to}><Link to={to} className="card card-hover block p-4 font-bold text-primary">{label}</Link></li>)}
      </ul>
      <Link to="/" className="btn-primary mt-8">Back to the homepage</Link>
    </section>
  );
}
