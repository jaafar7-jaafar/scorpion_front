// Native <details> keeps every answer in the HTML and usable without JavaScript.
export default function FaqList({ faqs, title = 'Frequently Asked Questions', id = 'faq', columns = false, intro }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="font-serif text-2xl md:text-[1.9rem] md:leading-tight font-bold text-primary">{title}</h2>
      {intro && <p className="mt-3 text-zinc-600 leading-relaxed">{intro}</p>}
      <div className={`mt-6 grid gap-3 ${columns ? 'lg:grid-cols-2 lg:items-start' : ''}`}>
        {faqs.map(({ q, a }) => (
          <details key={q} className="reveal group rounded-2xl border border-zinc-200/80 bg-white transition-colors open:border-secondary/30 open:bg-primary-fixed/15">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 font-sans">
              <h3 className="text-base font-bold leading-snug text-primary">{q}</h3>
              <span aria-hidden="true" className="material-symbols-outlined flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[20px] text-primary transition-transform duration-200 group-open:rotate-45 group-open:bg-sun">add</span>
            </summary>
            <p className="px-5 pb-5 -mt-1 text-[15px] leading-relaxed text-zinc-600">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
