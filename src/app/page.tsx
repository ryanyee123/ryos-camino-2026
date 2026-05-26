import Link from 'next/link';
import {
  Footprints,
  CalendarDays,
  MapPin,
  Church,
  ChevronRight,
  Bed,
  Utensils,
  Backpack,
  Stamp,
  PiggyBank,
  BedDouble,
  TrendingUp,
} from 'lucide-react';
import RouteMap from '@/components/RouteMap';
import Section from '@/components/Section';
import { StatCard, PlaceCard, MediaCard } from '@/components/ui/Card';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import { days, towns } from '@/data/days';

function formatDate(iso: string) {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function Home() {
  return (
    <div className="bg-surface text-ink">
      <div className="max-w-6xl mx-auto px-6">
        {/* ─── Hero ─── */}
        <section className="py-14 md:py-20 text-center">
          <p className="text-caption">MAY 18 – 23, 2026</p>
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

        {/* ─── The Walk ─── */}
        <Section caption="DAY BY DAY" title="The Walk">
          <div>
            {days.map((day) => (
              <Link
                key={day.day}
                href={`/days/${day.day}`}
                className="flex items-center gap-4 py-4 border-t border-border hover:bg-stone-100 transition-colors -mx-3 px-3 rounded-lg"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-accent text-accent text-h3 shrink-0">
                  {day.day}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-h3">{day.title}</p>
                  <p className="text-body-sm text-ink-muted">{formatDate(day.date)}</p>
                </div>
                <div className="text-body-sm text-ink-muted text-right shrink-0">
                  {day.miles} mi · {day.via ? 3 : 2} towns
                </div>
                <ChevronRight size={16} className="text-ink-faint ml-1 shrink-0" />
              </Link>
            ))}
          </div>
        </Section>

        {/* ─── Where I Stayed ─── */}
        <Section
          caption="ALBERGUES"
          title="Where I Stayed"
          description="Five nights in pilgrim hostels along the way."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <PlaceCard
              placeholderIcon={Bed}
              eyebrow="ALBERGUE"
              name="Albergue Ferramenteiro"
              meta="Portomarín"
              note="Large municipal-style place with terraces overlooking the Miño river. The shower line was no joke."
            />
            <PlaceCard
              placeholderIcon={Bed}
              eyebrow="ALBERGUE"
              name="Albergue San Antonio de Padua"
              meta="Melide"
              note="Convent-run, all stone walls. Lights out at 10pm, no negotiation."
            />
            <PlaceCard
              placeholderIcon={Bed}
              eyebrow="ALBERGUE"
              name="Albergue O Pino"
              meta="O Pedrouzo"
              note="The last bunk before Santiago. Slept like a stone, woke up nervous."
            />
          </div>
          <div className="mt-4 text-right">
            <Link href="/albergues" className="text-body-sm text-accent hover:underline">
              View all 5 →
            </Link>
          </div>
        </Section>

        {/* ─── What I Ate ─── */}
        <Section
          caption="MEALS THAT MATTERED"
          title="What I Ate"
          description="The Camino runs on coffee, pulpo, and pilgrim menus."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <PlaceCard
              placeholderIcon={Utensils}
              eyebrow="LUNCH"
              name="Pulpo at Ezequiel"
              meta="Melide"
              note="Stopped for lunch on Day 3 between Palas and Arzúa. The pulpo is the reason you stop in Melide. Tender, paprika, olive oil, salt. Don't overthink it."
            />
            <PlaceCard
              placeholderIcon={Utensils}
              eyebrow="DINNER"
              name="Pilgrim Menu at Casa Curro"
              meta="Portomarín"
              note="Day 1 dinner. Three courses and a bottle of wine for €13. Lentil stew, pork, flan. Slept hard after."
            />
            <PlaceCard
              placeholderIcon={Utensils}
              eyebrow="RITUAL"
              name="Café con leche"
              meta="everywhere"
              note="The thing that gets you through the first 5km every morning. €1.50, no exceptions."
            />
          </div>
          <div className="mt-4 text-right">
            <Link href="/meals" className="text-body-sm text-accent hover:underline">
              View all meals →
            </Link>
          </div>
        </Section>

        {/* ─── What's In My Bag ─── */}
        <Section
          caption="GEAR"
          title="What's In My Bag"
          description="Everything I carried for 5 days on foot. 7.8 kg base weight."
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <PlaceCard
              placeholderIcon={Backpack}
              eyebrow="PACK"
              name="Osprey Talon 33"
              note="33L pack, 950g. Fit my whole life on the trail."
            />
            <PlaceCard
              placeholderIcon={Backpack}
              eyebrow="FOOTWEAR"
              name="Hoka Speedgoat 5"
              note="Trail runners, not boots. Controversial. Right call."
            />
            <PlaceCard
              placeholderIcon={Backpack}
              eyebrow="BASE LAYER"
              name="Smartwool merino long sleeve"
              note="Worn 5 days straight. Hand-washed twice. Didn't smell."
            />
            <PlaceCard
              placeholderIcon={Backpack}
              eyebrow="TREKKING"
              name="Black Diamond trekking poles"
              note="Saved my knees on the descent into Portomarín."
            />
          </div>
          <div className="mt-4 text-right">
            <Link href="/gear" className="text-body-sm text-accent hover:underline">
              View all gear →
            </Link>
          </div>
        </Section>

        {/* ─── What It Cost ─── */}
        <Section
          caption="FIVE DAYS, ALL IN"
          title="What It Cost"
          description="A breakdown for anyone planning this route."
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="TOTAL" value="€312" sublabel="all five days" icon={PiggyBank} />
            <StatCard label="PER DAY" value="€62" sublabel="average" icon={TrendingUp} />
            <StatCard label="BED" value="€14" sublabel="avg per night" icon={BedDouble} />
            <StatCard label="FOOD" value="€18" sublabel="avg per day" icon={Utensils} />
          </div>
          <div className="mt-4 text-right">
            <Link href="/cost" className="text-body-sm text-accent hover:underline">
              Full breakdown →
            </Link>
          </div>
        </Section>

        {/* ─── Credencial ─── */}
        <Section
          caption="PILGRIM PASSPORT"
          title="Credencial"
          description="Two stamps a day, from churches, albergues, and cafés. Proof you walked it."
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { location: 'Sarria', day: 'Day 0' },
              { location: 'Portomarín', day: 'Day 1' },
              { location: 'Melide', day: 'Day 3' },
              { location: 'Santiago', day: 'Day 5' },
            ].map((stamp) => (
              <div key={stamp.location}>
                <MediaCard>
                  <div className="aspect-square">
                    <PlaceholderImage icon={Stamp} />
                  </div>
                </MediaCard>
                <p className="text-body-sm text-ink-muted mt-2">
                  {stamp.location} · {stamp.day}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <Link href="/credencial" className="text-body-sm text-accent hover:underline">
              See all stamps →
            </Link>
          </div>
        </Section>

        {/* ─── About ─── */}
        <Section title="About this site">
          <p className="text-body text-ink-muted max-w-2xl">
            I walked the last 100km of the Camino Francés in May 2026. This site is a record of
            what I packed, what I spent, where I slept, and what I thought about along the way.
            Built as a reference for anyone planning the same walk, and a memory for me.
          </p>
          <p className="text-body-sm text-ink-muted italic mt-4">— Ryan</p>
        </Section>
      </div>
    </div>
  );
}
