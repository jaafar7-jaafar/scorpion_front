import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

export default function RouteEffects() {
  const { pathname } = useLocation();
  const previousPath = useRef(null);
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    window.scrollTo(0, 0);
    if (!pathname.startsWith('/admin')) trackPageView(pathname);
  }, [pathname]);
  return null;
}
