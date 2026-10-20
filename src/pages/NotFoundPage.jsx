import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

export default function NotFoundPage() {
  return <section className="pt-32 pb-20 px-6 text-center"><Seo title="Page Not Found | Scorpion Golf Cart Rental" noindex /><h1 className="font-serif text-4xl text-primary font-bold mb-5">Page not found</h1><p className="text-zinc-600 mb-5">We could not find that page.</p><Link to="/" className="text-secondary underline font-semibold">Return to Scorpion Golf Cart Rental</Link></section>;
}
