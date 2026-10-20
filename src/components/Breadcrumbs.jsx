import { Link } from 'react-router-dom';

export default function Breadcrumbs({ current }) {
  return <nav aria-label="Breadcrumb" className="text-sm text-zinc-500 mb-6"><Link to="/" className="hover:underline">Home</Link><span aria-hidden="true"> / </span><span aria-current="page">{current}</span></nav>;
}
