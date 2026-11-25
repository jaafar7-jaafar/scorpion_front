import { useState } from 'react';
import { GolfCartIcon, GolfCartLongIcon, PalmIcon } from './BrandIcons';
import { trackEvent } from '../utils/analytics';

// "Which cart fits your crew?" — three playful taps to a recommendation that
// opens the booking form prefilled. Rendered with question 1 in the HTML.
const QUESTIONS = [
  {
    key: 'crew', title: 'How many of you are riding?',
    options: [
      { value: 2, label: 'Just us two', sub: '1–2 people', icon: 'favorite' },
      { value: 4, label: 'A small crew', sub: '3–4 people', icon: 'group' },
      { value: 6, label: 'The whole squad', sub: '5–6 people', icon: 'groups' },
    ],
  },
  {
    key: 'bags', title: 'Using the cart with luggage on arrival day?',
    options: [
      { value: 'light', label: 'Travelling light', sub: 'Backpacks only', icon: 'backpack' },
      { value: 'heavy', label: 'Suitcases for all', sub: 'Big bags on board', icon: 'luggage' },
      { value: 'none', label: 'We unpack first', sub: 'Cart after check-in', icon: 'hotel' },
    ],
  },
  {
    key: 'plan', title: "What's the plan on the island?",
    options: [
      { value: 'town', label: 'Town & dinners', sub: 'Restaurants and nightlife', icon: 'restaurant' },
      { value: 'beach', label: 'Beach-hopping', sub: 'Secret Beach and more', icon: 'palm' },
      { value: 'mix', label: 'A bit of everything', sub: 'Explore the whole caye', icon: 'explore' },
    ],
  },
];

const TIPS = {
  town: 'Tip: park your cart and explore the San Pedro waterfront on foot.',
  beach: 'Tip: start early for Secret Beach; the road can be rough, so allow plenty of time.',
  mix: 'Tip: ask our team about current road conditions before longer trips north.',
};

function recommend({ crew, bags, plan }) {
  const six = crew >= 6 || (crew >= 4 && bags === 'heavy');
  if (six) return { six, name: 'The Whole Squad Cruiser', blurb: 'Room for everyone, the cooler, and the pile of beach bags. Nobody gets left at the hotel.' };
  if (crew <= 2 && plan === 'town') return { six, name: 'The Island Date Night', blurb: 'Easy to park, perfect for sunset dinners and a slow cruise back along the water.' };
  if (plan === 'beach') return { six, name: 'The Beach Hopper', blurb: 'Light, nimble, and always pointed at the next stretch of turquoise water.' };
  return { six, name: 'The Island Explorer', blurb: 'Your ride for tacos in town, a beach afternoon, and everything in between.' };
}

function OptionIcon({ icon }) {
  if (icon === 'palm') return <PalmIcon size={26} />;
  return <span className="material-symbols-outlined text-[26px]">{icon}</span>;
}

export default function CrewQuiz({ onBookNow }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const done = step >= QUESTIONS.length;
  const result = done ? recommend(answers) : null;

  const choose = (key, value) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    setStep((s) => s + 1);
    if (step === QUESTIONS.length - 1) trackEvent('cart_quiz_complete', { seats: recommend(next).six ? 6 : 4 });
  };
  const restart = () => { setAnswers({}); setStep(0); };
  const label = (key) => QUESTIONS.find((q) => q.key === key).options.find((o) => o.value === answers[key])?.label;

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-primary p-6 text-white sm:p-10">
      <div aria-hidden="true" className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sun/20 blur-3xl" />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-sun">Cart finder</p>
          <ol className="flex gap-1.5" aria-label={`Step ${Math.min(step + 1, 3)} of 3`}>
            {QUESTIONS.map((q, i) => <li key={q.key} className={`h-1.5 w-8 rounded-full transition-colors ${i < step || done ? 'bg-sun' : i === step ? 'bg-white' : 'bg-white/20'}`} />)}
          </ol>
        </div>

        {!done ? (
          <div key={step} className="quiz-step mt-6">
            <h3 className="font-serif text-2xl font-bold md:text-3xl">{QUESTIONS[step].title}</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {QUESTIONS[step].options.map((o) => (
                <button
                  key={o.label}
                  type="button"
                  onClick={() => choose(QUESTIONS[step].key, o.value)}
                  className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-sun hover:bg-white/10 sm:flex-col sm:items-start sm:p-5"
                >
                  <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sun transition-transform group-hover:scale-110 group-hover:-rotate-6"><OptionIcon icon={o.icon} /></span>
                  <span><span className="block font-bold">{o.label}</span><span className="block text-sm text-white/65">{o.sub}</span></span>
                </button>
              ))}
            </div>
            {step > 0 && <button type="button" onClick={() => setStep((s) => s - 1)} className="mt-5 text-sm font-semibold text-white/70 underline underline-offset-4 hover:text-white">Back</button>}
          </div>
        ) : (
          <div className="quiz-step relative mt-6" aria-live="polite">
            <div aria-hidden="true" className="confetti">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <span aria-hidden="true" className="result-cart flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-sun text-primary">
                {result.six ? <GolfCartLongIcon size={56} /> : <GolfCartIcon size={56} />}
              </span>
              <div>
                <p className="text-sm font-semibold text-white/70">Your island ride:</p>
                <h3 className="font-serif text-3xl font-bold md:text-4xl">{result.name}</h3>
                <p className="mt-2 max-w-xl text-white/80">{result.blurb}</p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-white/10 p-5">
              <p className="font-bold">We recommend: <span className="text-sun">{result.six ? '6-seater golf cart, from $65/day' : '4-seater golf cart, from $35/day'}</span></p>
              <p className="mt-1 text-sm text-white/75">{TIPS[answers.plan]}</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onBookNow(null, { notes: `Cart finder: ${result.six ? '6-seater' : '4-seater'} for ${label('crew')} (${label('bags')}, ${label('plan')})` })}
                className="btn-sun"
              >
                Book this cart
                <span aria-hidden="true" className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
              <button type="button" onClick={restart} className="btn-ghost-light">Start over</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
