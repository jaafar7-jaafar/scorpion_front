import { Link } from 'react-router-dom';

export default function Breadcrumbs({ current }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-zinc-500">
        <li><Link to="/" className="font-semibold text-secondary hover:underline underline-offset-4">Home</Link></li>
        <li aria-hidden="true"><svg viewBox="0 0 20 20" className="h-4 w-4 text-zinc-400" fill="currentColor"><path d="M7.3 4.3a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4L11.6 10 7.3 5.7a1 1 0 0 1 0-1.4Z" /></svg></li>
        <li aria-current="page" className="text-zinc-600">{current}</li>
      </ol>
    </nav>
  );
}
