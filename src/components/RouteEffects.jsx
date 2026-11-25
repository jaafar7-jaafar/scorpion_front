import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

export default function RouteEffects() {
  const { pathname } = useLocation();
  const previousPath = useRef(null);
  useEffect(() => {
    if (previousPath.current === pathname) return;
    const isFirstLoad = previousPath.current === null;
    previousPath.current = pathname;
    window.scrollTo(0, 0);
    // GA4 records the initial page load itself; only report in-app navigations
    // (GA's history-based page views are off), so every page counts exactly once.
    if (!isFirstLoad && !pathname.startsWith('/admin')) trackPageView(pathname);
  }, [pathname]);
  return null;
}
