import Breadcrumbs from './Breadcrumbs';
import { GolfCartIcon } from './BrandIcons';

// Shared header for inner pages: breadcrumb, H1, and a short answer-first intro.
export default function PageHero({ crumb, eyebrow, title, lead, children }) {
  return (
    <header className="relative overflow-hidden bg-island pt-24 pb-12 md:pt-32 md:pb-16">
      <div aria-hidden="true" className="hero-aurora" />
      <div aria-hidden="true" className="header-art pointer-events-none absolute -right-10 bottom-0 hidden text-primary/[0.07] md:block lg:right-[6%]">
        <GolfCartIcon size={340} />
      </div>
      <div className="relative container-page">
        <Breadcrumbs current={crumb} />
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h1 className="max-w-3xl font-serif text-[2.35rem] leading-[1.1] sm:text-5xl md:text-6xl md:leading-[1.05] font-bold text-primary">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg md:text-xl leading-relaxed text-zinc-700">{lead}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}
