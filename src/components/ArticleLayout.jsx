import { CallLink, WhatsAppLink } from './ContactButtons';

// Guide layout: readable column + "On this page" jump links (eligible for
// Google "Jump to" links) + a sticky booking card on large screens.
export default function ArticleLayout({ toc, onBookNow, children }) {
  return (
    <div className="container-page py-10 md:py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
      <div className="min-w-0">
        <details className="lg:hidden mb-10 rounded-2xl border border-zinc-200 bg-white">
          <summary className="flex cursor-pointer list-none items-center justify-between p-4 font-bold text-primary">
            On this page
            <span aria-hidden="true" className="material-symbols-outlined text-[24px]">expand_more</span>
          </summary>
          <TocLinks toc={toc} />
        </details>
        <div className="prose-guide space-y-14">{children}</div>
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-28 space-y-6">
          <nav aria-label="On this page" className="rounded-2xl border border-zinc-200 bg-white py-3">
            <p className="px-5 pt-2 pb-1 text-xs font-bold uppercase tracking-[0.16em] text-secondary">On this page</p>
            <TocLinks toc={toc} />
          </nav>
          <div className="rounded-2xl bg-primary p-6 text-white">
            <p className="font-serif text-xl font-bold">Golf carts from $35/day</p>
            <p className="mt-2 text-sm leading-relaxed text-white/75">4 and 6-seaters with free delivery to your San Pedro hotel or Airbnb.</p>
            <div className="mt-5 grid gap-2">
              <button onClick={onBookNow} className="btn-sun w-full">Book Now</button>
              <WhatsAppLink location="article_sidebar" className="btn-whatsapp w-full" />
              <CallLink location="article_sidebar" className="btn-ghost-light w-full" />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function TocLinks({ toc }) {
  return (
    <ol className="px-2 pb-2">
      {toc.map(({ id, label }, i) => (
        <li key={id}>
          <a href={`#${id}`} className="flex gap-3 rounded-xl px-3 py-2 text-[15px] text-zinc-600 hover:bg-zinc-100 hover:text-primary">
            <span className="font-bold text-amber-700 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
            {label}
          </a>
        </li>
      ))}
    </ol>
  );
}
