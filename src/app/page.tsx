'use client';

import { useState, useEffect, useCallback } from 'react';
import { Footprints, CalendarDays, MapPin, Church, Clock, Mountain, Users, Coffee } from 'lucide-react';
import NavRail from '@/components/NavRail';
import GearModal from '@/components/modals/GearModal';
import CostModal from '@/components/modals/CostModal';
import LodgingModal from '@/components/modals/LodgingModal';
import DayChips from '@/components/DayChips';
import StatCardRow from '@/components/StatCardRow';
import TripOverviewContent from '@/components/TripOverviewContent';
import DayContent from '@/components/DayContent';
import RouteMap from '@/components/RouteMap';
import HeroRoute from '@/components/HeroRoute';
import { days, tripOverview } from '@/data/days';

type ActiveDay = number | 'full';

const MODAL_HASHES = new Set(['gear', 'cost', 'lodging']);

function parseDayHash(hash: string): ActiveDay | null {
  if (!hash.startsWith('#day-')) return null;
  const n = parseInt(hash.slice(5), 10);
  return n >= 1 && n <= 7 ? n : null;
}

export default function Home() {
  const [activeDay, setActiveDay] = useState<ActiveDay>('full');

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
  }, []);

  const fullRouteStats = [
    { label: 'MILES', value: '71.4', sublabel: 'walked', icon: Footprints },
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
    <div className="text-ink pb-20 md:pb-0">
      <NavRail />
      <GearModal />
      <CostModal />
      <LodgingModal />

      {/* Hero */}
      <section className="pt-12 md:pt-20 pb-6 md:pb-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-[13px] uppercase tracking-[0.06em] text-ink-muted">Camino de Santiago · May 2026 · 71 miles</p>
          <h1 className="mt-6 text-[32px] md:text-[44px] leading-[1.05] tracking-[-0.03em] font-semibold text-ink max-w-3xl mx-auto">Ryan&apos;s Camino Francés</h1>
          <p className="mt-6 text-[17px] leading-[1.6] text-ink-muted max-w-3xl mx-auto">
            Five days on foot from Sarria to Santiago de Compostela. 71.4 miles through Galicia.
            <br />
            This is what I carried, what I spent, where I slept, and what I thought about along the way.
          </p>
        </div>
      </section>

      {/* Route animation band */}
      <HeroRoute />

      {/* Sticky day chips */}
      <DayChips activeDay={activeDay} onSelect={handleSelect} />

      {/* Split section */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Desktop: 60/40 split */}
        <div className="hidden md:grid grid-cols-5 gap-8">
          {/* Left column — scrollable content */}
          <div className="col-span-3">
            <StatCardRow stats={activeDay === 'full' ? fullRouteStats : dayStats} />
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
        <div className="md:hidden flex flex-col gap-6">
          <RouteMap activeDay={activeDay} className="h-[50vh]" />
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

      {/* About */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-12">
          <h2 className="text-h2">About this site</h2>
          <p className="text-body text-ink-muted max-w-2xl mt-6">
            I walked the last 115km of the Camino Francés in May 2026. This site is a record of
            what I packed, what I spent, where I slept, and what I thought about along the way.
            Built as a reference for anyone planning the same walk, and a memory for me.
          </p>
          <p className="text-body-sm text-ink-muted italic mt-4">— Ryan</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center">
          <p className="text-caption text-ink-faint">
            © 2026 Ryan Yee · Built in NYC after walking to Santiago
          </p>
        </div>
      </footer>
    </div>
  );
}
