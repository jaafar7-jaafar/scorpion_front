import { CallLink, WhatsAppLink } from './ContactButtons';
import { ReviewLink } from './GoogleLinks';

export default function CtaBand({ onBookNow, title = 'Ready to explore Ambergris Caye?', text = 'Tell us your dates, group size, and where you are staying. We confirm availability and deliver your golf cart.', location = 'cta_band' }) {
  return (
    <section className="px-3 sm:px-6 py-10 md:py-16">
      <div className="reveal relative mx-auto max-w-container overflow-hidden rounded-[2rem] bg-primary px-6 py-12 text-center sm:px-10 md:py-16">
        <div aria-hidden="true" className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sun/25 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-secondary-container/20 blur-3xl" />
        <div className="relative">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/75">{text}</p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <button onClick={onBookNow} className="btn-sun">
              Book Now
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <WhatsAppLink location={location} />
            <CallLink location={location} className="btn-ghost-light" />
          </div>
          <p className="mt-7 text-white/70">
            <span className="text-sun" aria-hidden="true">★★★★★ </span>Rode with us?{' '}
            <ReviewLink location={`${location}_review`} icon={false} className="font-bold text-white underline decoration-sun decoration-2 underline-offset-4 hover:text-sun">Leave a Google review</ReviewLink>
          </p>
        </div>
      </div>
    </section>
  );
}
