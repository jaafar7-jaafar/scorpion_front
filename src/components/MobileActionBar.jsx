import { CallLink, WhatsAppLink } from './ContactButtons';

// Thumb-reach booking actions on phones; hidden from tablet width upward.
export default function MobileActionBar({ onBookNow }) {
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 pointer-events-none">
      <div className="pointer-events-auto grid grid-cols-[auto_auto_1fr] gap-2 rounded-2xl border border-white/60 bg-white/85 p-2 shadow-[0_10px_40px_rgba(1,45,29,0.18)] backdrop-blur-xl">
        <CallLink location="mobile_bar" icon className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-fixed/60 text-primary" aria-label="Call Scorpion Golf Cart Rental">
          <span className="sr-only">Call</span>
        </CallLink>
        <WhatsAppLink location="mobile_bar" className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366] text-white" aria-label="Chat on WhatsApp">
          <span className="sr-only">WhatsApp</span>
        </WhatsAppLink>
        <button onClick={onBookNow} className="h-12 rounded-xl bg-primary font-bold text-white shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform">
          Book Now
        </button>
      </div>
    </div>
  );
}
