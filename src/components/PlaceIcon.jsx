import { GolfCartIcon, PalmIcon, WaveIcon } from './BrandIcons';

// Brand icons for island places, falling back to a Material Symbol name.
export default function PlaceIcon({ icon, size = 24 }) {
  if (icon === 'palm') return <PalmIcon size={size} />;
  if (icon === 'wave') return <WaveIcon size={size} />;
  if (icon === 'cart') return <GolfCartIcon size={size} />;
  if (icon === 'cart-right') return <GolfCartIcon size={size} facing="right" />;
  return <span className="material-symbols-outlined" style={{ fontSize: size }}>{icon}</span>;
}
