'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { towns, days, ROUTE_COLOR, type Day } from '@/data/days';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type RouteSegment = {
  day: number;
  geometry: GeoJSON.LineString;
};

type RouteMapProps = {
  activeDay?: number | 'full';
  className?: string;
};

export default function RouteMap({ activeDay = 'full', className }: RouteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [segments, setSegments] = useState<RouteSegment[]>([]);

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

  // Initialize map + fetch all routes
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-7.95, 42.87],
      zoom: 9.1,
      pitchWithRotate: false,
      dragRotate: false,
    });

    map.scrollZoom.disable();
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

    mapRef.current = map;

    map.on('load', async () => {
      const results = await Promise.all(days.map(fetchRoute));
      const validSegments = results.filter((s): s is RouteSegment => s !== null);
      setSegments(validSegments);

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
        const bgColor = isLunch ? '#E8A57F' : '#FFFFFF';
        const borderColor = isEndpoint ? ROUTE_COLOR : '#78716C';

        const el = document.createElement('div');
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.borderRadius = '50%';
        el.style.backgroundColor = bgColor;
        el.style.border = `2.5px solid ${borderColor}`;
        el.style.cursor = 'pointer';
        el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3)';

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

  // React to activeDay changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || segments.length === 0) return;

    const selectedDay = typeof activeDay === 'number' ? activeDay : null;

    segments.forEach((seg) => {
      const layerId = `route-line-${seg.day}`;
      if (!map.getLayer(layerId)) return;

      if (selectedDay === null) {
        map.setPaintProperty(layerId, 'line-opacity', 0.9);
        map.setPaintProperty(layerId, 'line-width', 4);
      } else if (seg.day === selectedDay) {
        map.setPaintProperty(layerId, 'line-opacity', 1);
        map.setPaintProperty(layerId, 'line-width', 5);
      } else {
        map.setPaintProperty(layerId, 'line-opacity', 0.12);
        map.setPaintProperty(layerId, 'line-width', 3);
      }
    });

    if (selectedDay !== null) {
      const day = days.find((d) => d.day === selectedDay);
      if (day) {
        const coords: [number, number][] = [towns[day.from].coords, towns[day.to].coords];
        if (day.via) coords.push(towns[day.via].coords);
        const bounds = coords.reduce(
          (b, c) => b.extend(c),
          new mapboxgl.LngLatBounds(coords[0], coords[0])
        );
        map.fitBounds(bounds, { padding: 60, duration: 800 });
      }
    } else {
      map.flyTo({ center: [-7.95, 42.87], zoom: 9.1, duration: 800 });
    }
  }, [activeDay, segments]);

  return (
    <div ref={containerRef} className={`w-full rounded-xl overflow-hidden ${className ?? 'h-[500px]'}`} />
  );
}
