'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { towns, days, ROUTE_COLOR, type Day, type Town } from '@/data/days';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type RouteSegment = {
  day: number;
  geometry: GeoJSON.LineString;
};

export default function RouteMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [segments, setSegments] = useState<RouteSegment[]>([]);
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [hoveredTown, setHoveredTown] = useState<Town | null>(null);

  // Fetch walking directions for a day segment
  const fetchRoute = useCallback(async (day: Day): Promise<RouteSegment | null> => {
    const waypoints: [number, number][] = [];
    waypoints.push(towns[day.from].coords);
    if (day.via) waypoints.push(towns[day.via].coords);
    waypoints.push(towns[day.to].coords);

    const coords = waypoints.map((c) => c.join(',')).join(';');
    const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${coords}?geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.routes?.[0]) {
        return { day: day.day, geometry: data.routes[0].geometry };
      }
    } catch (e) {
      console.error(`Failed to fetch route for day ${day.day}`, e);
    }
    return null;
  }, []);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [-7.95, 42.87],
      zoom: 9.1,
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

    mapRef.current = map;

    map.on('load', async () => {
      // Fetch all route segments
      const results = await Promise.all(days.map(fetchRoute));
      const validSegments = results.filter((s): s is RouteSegment => s !== null);
      setSegments(validSegments);

      // Add route lines
      validSegments.forEach((seg) => {
        map.addSource(`route-${seg.day}`, {
          type: 'geojson',
          data: { type: 'Feature', geometry: seg.geometry, properties: {} },
        });

        map.addLayer({
          id: `route-line-${seg.day}`,
          type: 'line',
          source: `route-${seg.day}`,
          layout: { 'line-cap': 'round', 'line-join': 'round' },
          paint: {
            'line-color': ROUTE_COLOR,
            'line-width': 4,
            'line-opacity': 0.9,
          },
        });
      });

      // Add markers
      Object.values(towns).forEach((town) => {
        const isEndpoint = town.type === 'start' || town.type === 'end';
        const isLunch = town.type === 'lunch';

        const size = isEndpoint ? 16 : 12;
        const bgColor = isLunch ? '#F59E0B' : '#FFFFFF';
        const borderColor = isEndpoint ? ROUTE_COLOR : '#78716C';

        const el = document.createElement('div');
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.borderRadius = '50%';
        el.style.backgroundColor = bgColor;
        el.style.border = `2.5px solid ${borderColor}`;
        el.style.cursor = 'pointer';
        el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3)';

        el.addEventListener('mouseenter', () => setHoveredTown(town));
        el.addEventListener('mouseleave', () => setHoveredTown(null));
        el.addEventListener('click', () => setHoveredTown(town));

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat(town.coords)
          .addTo(map);

        markersRef.current.push(marker);
      });
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, [fetchRoute]);

  // Handle day filtering
  useEffect(() => {
    const map = mapRef.current;
    if (!map || segments.length === 0) return;

    segments.forEach((seg) => {
      const layerId = `route-line-${seg.day}`;
      if (!map.getLayer(layerId)) return;

      if (activeDay === null) {
        map.setPaintProperty(layerId, 'line-opacity', 0.9);
        map.setPaintProperty(layerId, 'line-width', 4);
      } else if (seg.day === activeDay) {
        map.setPaintProperty(layerId, 'line-opacity', 1);
        map.setPaintProperty(layerId, 'line-width', 5);
      } else {
        map.setPaintProperty(layerId, 'line-opacity', 0.2);
        map.setPaintProperty(layerId, 'line-width', 3);
      }
    });

    // Fit bounds when a day is selected
    if (activeDay !== null) {
      const day = days.find((d) => d.day === activeDay);
      if (day) {
        const coords: [number, number][] = [towns[day.from].coords, towns[day.to].coords];
        if (day.via) coords.push(towns[day.via].coords);
        const bounds = coords.reduce(
          (b, c) => b.extend(c),
          new mapboxgl.LngLatBounds(coords[0], coords[0])
        );
        map.fitBounds(bounds, { padding: 80, duration: 800 });
      }
    }
  }, [activeDay, segments]);

  const resetView = () => {
    setActiveDay(null);
    mapRef.current?.flyTo({ center: [-7.95, 42.87], zoom: 9.1, duration: 800 });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Day filter chips */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={resetView}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            activeDay === null
              ? 'bg-stone-800 text-white'
              : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
          }`}
        >
          Full route
        </button>
        {days.map((d) => (
          <button
            key={d.day}
            onClick={() => setActiveDay(d.day === activeDay ? null : d.day)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              activeDay === d.day
                ? 'bg-stone-800 text-white'
                : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
            }`}
          >
            Day {d.day}
          </button>
        ))}
      </div>

      {/* Map */}
      <div ref={containerRef} className="h-[500px] w-full rounded-xl overflow-hidden" />

      {/* Info bar */}
      <div className="h-8 flex items-center text-sm text-stone-500">
        {hoveredTown ? (
          <span>
            <span className="font-medium text-stone-700">{hoveredTown.name}</span>
            {hoveredTown.note && <span className="ml-2">· {hoveredTown.note}</span>}
            {hoveredTown.type === 'start' && <span className="ml-2">· Starting point</span>}
            {hoveredTown.type === 'end' && <span className="ml-2">· Destination</span>}
          </span>
        ) : activeDay !== null ? (
          <span>
            {days.find((d) => d.day === activeDay)?.title} ·{' '}
            {days.find((d) => d.day === activeDay)?.miles} mi
          </span>
        ) : (
          <span>Hover over a town for details · 72 mi total</span>
        )}
      </div>
    </div>
  );
}
