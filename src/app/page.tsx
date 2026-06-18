'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Footprints, CalendarDays, MapPin, Church, Clock, Mountain, Users, Coffee } from 'lucide-react';
import NavRail from '@/components/NavRail';
import GearModal from '@/components/modals/GearModal';
import CostModal from '@/components/modals/CostModal';
import LodgingModal from '@/components/modals/LodgingModal';
import AboutModal from '@/components/modals/AboutModal';
import DayChips from '@/components/DayChips';
import StatCardRow from '@/components/StatCardRow';
import TripOverviewContent from '@/components/TripOverviewContent';
import DayContent from '@/components/DayContent';
import RouteMap from '@/components/RouteMap';
import HeroCathedral from '@/components/HeroCathedral';
import { days, tripOverview } from '@/data/days';

type ActiveDay = number | 'full';

const MODAL_HASHES = new Set(['gear', 'cost', 'lodging', 'about']);

function parseDayHash(hash: string): ActiveDay | null {
  if (!hash.startsWith('#day-')) return null;
  const n = parseInt(hash.slice(5), 10);
  return n >= 1 && n <= 7 ? n : null;
}

export default function Home() {
  const [activeDay, setActiveDay] = useState<ActiveDay>('full');
  const mobileContentRef = useRef<HTMLDivElement>(null);
  const desktopContentRef = useRef<HTMLDivElement>(null);

  // Read hash on mount
  useEffect(() => {
    const hash = window.location.hash;
    const day = parseDayHash(hash);
    if (day !== null) setActiveDay(day);
  }, []);

  const handleSelect = useCallback((val: ActiveDay) => {
    setActiveDay(val);
    const newHash = val === 'full' ? '' : `#day-${val}`;
    history.replaceState(null, '', window.location.pathname + window.location.search + newHash);

    // Scroll to the content area when switching days.
    // Use scrollTo with a computed offset instead of scrollIntoView,
    // which is unreliable on mobile Safari (gets cancelled by address bar
    // animation or rapid taps).
    requestAnimationFrame(() => {
      const target = window.innerWidth < 768 ? mobileContentRef.current : desktopContentRef.current;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      // Already near the top — no need to scroll
      if (rect.top >= 0 && rect.top < 80) return;
      window.scrollTo({ top: window.scrollY + rect.top - 80, behavior: 'smooth' });
    });
  }, []);

  const fullRouteStats = [
    { label: 'KM', value: '115', sublabel: 'walked', icon: Footprints },
    { label: 'DAYS', value: '5', sublabel: 'on the trail', icon: CalendarDays },
    { label: 'TOWNS', value: '6', sublabel: 'passed through', icon: MapPin },
    { label: 'CATHEDRAL', value: '1', sublabel: 'reached', icon: Church },
  ];

  const selectedDay = typeof activeDay === 'number' ? days.find((d) => d.day === activeDay) : null;

  const dayStats = selectedDay
    ? selectedDay.restDay
      ? [
          { label: 'REST DAY', value: 'Santiago', sublabel: 'no walking', icon: Coffee },
        ]
      : [
          { label: 'MILES', value: String(selectedDay.miles), sublabel: 'walked', icon: Footprints },
          { label: 'HOURS', value: String(selectedDay.hours), sublabel: 'on foot', icon: Clock },
          { label: 'ELEVATION', value: `${selectedDay.elevation} ft`, sublabel: 'gained', icon: Mountain },
          { label: 'TOWNS', value: String(selectedDay.townsCount), sublabel: 'passed', icon: Users },
        ]
    : [];

  return (
    <div className="text-ink pb-28 md:pb-16">
      <NavRail />
      <GearModal />
      <CostModal />
      <LodgingModal />
      <AboutModal />

      {/* Hero */}
      <section className="pt-12 md:pt-20 pb-6 md:pb-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-caption text-ink-muted">May 2026</p>
          <h1 className="mt-6 text-[32px] md:text-[44px] leading-[1.05] tracking-[-0.03em] font-semibold text-ink max-w-3xl mx-auto font-heading">Ryan&apos;s Camino de Santiago</h1>
          <p className="mt-6 text-[17px] md:text-[17px] leading-[1.6] text-ink-muted max-w-3xl mx-auto">
            Walking 115 km in 5 days<br className="md:hidden" />{' '}
            through northern Spain.
          </p>
        </div>
      </section>

      {/* Route animation band */}
      <HeroCathedral />

      {/* Sticky day chips */}
      <DayChips activeDay={activeDay} onSelect={handleSelect} />

      {/* Split section */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Desktop: 60/40 split */}
        <div className="hidden md:grid grid-cols-5 gap-8">
          {/* Left column — scrollable content */}
          <div className="col-span-3">
            <StatCardRow ref={desktopContentRef} stats={activeDay === 'full' ? fullRouteStats : dayStats} />
            <div className="border-t border-border mt-8 pt-8">
              <div key={activeDay} className="animate-fade-in">
                {activeDay === 'full' ? (
                  <TripOverviewContent />
                ) : selectedDay ? (
                  <DayContent day={selectedDay} />
                ) : null}
              </div>
            </div>
          </div>

          {/* Right column — sticky map */}
          <div className="col-span-2">
            <div className="sticky top-24 h-[calc(100vh-8rem)]">
              <RouteMap activeDay={activeDay} className="h-full" />
            </div>
          </div>
        </div>

        {/* Mobile: stacked */}
        <div ref={mobileContentRef} className="md:hidden flex flex-col gap-6">
          <RouteMap activeDay={activeDay} className="h-[32vh]" />
          <StatCardRow stats={activeDay === 'full' ? fullRouteStats : dayStats} />
          <div className="border-t border-border pt-6">
            <div key={activeDay} className="animate-fade-in">
              {activeDay === 'full' ? (
                <TripOverviewContent />
              ) : selectedDay ? (
                <DayContent day={selectedDay} />
              ) : null}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
