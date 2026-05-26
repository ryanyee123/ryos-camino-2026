'use client';

import NavRail from '@/components/NavRail';
import GearModal from '@/components/modals/GearModal';
import CostModal from '@/components/modals/CostModal';
import CredencialModal from '@/components/modals/CredencialModal';
import RouteMap from '@/components/RouteMap';
import { StatCard } from '@/components/ui/Card';
import { Footprints, CalendarDays, MapPin, Church } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-surface text-ink">
      <NavRail />
      <GearModal />
      <CostModal />
      <CredencialModal />

      <div className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <section className="py-14 md:py-20 text-center">
          <p className="text-caption">CAMINO FRANCÉS · MAY 2026</p>
          <h1 className="text-display mt-3">Camino Francés</h1>
          <p className="text-ink-muted mt-4 mx-auto max-w-2xl" style={{ fontSize: 18, lineHeight: 1.5 }}>
            Five days on foot from Sarria to Santiago de Compostela. 71.4 miles through Galicia.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            <StatCard label="MILES" value="71.4" sublabel="walked" icon={Footprints} />
            <StatCard label="DAYS" value="5" sublabel="on the trail" icon={CalendarDays} />
            <StatCard label="TOWNS" value="6" sublabel="passed through" icon={MapPin} />
            <StatCard label="CATHEDRAL" value="1" sublabel="reached" icon={Church} />
          </div>

          <div className="mt-8">
            <RouteMap />
          </div>
        </section>
      </div>
    </div>
  );
}
