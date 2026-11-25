import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const LINKS = [
  ['/cars', 'Golf carts & rates'],
  ['/san-pedro-golf-cart-rental-guide', 'San Pedro rental guide'],
  ['/things-to-do-in-san-pedro-by-golf-cart', 'Things to do by golf cart'],
  ['/contact', 'Contact & booking'],
];

export default function NotFoundPage() {
  return (
    <section className="bg-island px-5 pt-32 pb-24 text-center">
      <Seo title="Page Not Found | Scorpion Golf Cart Rental" noindex />
      <p className="eyebrow mb-4">Error 404</p>
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-zinc-600">We could not find that page. Try one of these instead:</p>
      <ul className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
        {LINKS.map(([to, label]) => <li key={to}><Link to={to} className="card card-hover block p-4 font-bold text-primary">{label}</Link></li>)}
      </ul>
      <Link to="/" className="btn-primary mt-8">Return to Scorpion Golf Cart Rental</Link>
    </section>
  );
}
