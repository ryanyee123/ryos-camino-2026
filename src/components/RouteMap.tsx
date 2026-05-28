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
      zoom: 9,
      pitchWithRotate: false,
      dragRotate: false,
    });

    map.scrollZoom.disable();
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

    mapRef.current = map;

    map.on('load', () => {
      // Increase place label readability
      const style = map.getStyle();
      if (style?.layers) {
        for (const layer of style.layers) {
          if (layer.type === 'symbol' && layer.id.startsWith('place-')) {
            map.setLayoutProperty(layer.id, 'text-size', [
              'interpolate', ['linear'], ['zoom'],
              6, 13,
              10, 16,
              14, 20,
            ]);
            map.setPaintProperty(layer.id, 'text-color', '#57534E');
            map.setPaintProperty(layer.id, 'text-halo-color', '#FFFFFF');
            map.setPaintProperty(layer.id, 'text-halo-width', 1.5);
          }
        }
      }
    });

    map.on('load', async () => {
      const results = await Promise.all(days.map(fetchRoute));
      const validSegments = results.filter((s): s is RouteSegment => s !== null);
      setSegments(validSegments);

      validSegments.forEach((seg) => {
        map.addSource(`route-${seg.day}`, {
          type: 'geojson',
          data: { type: 'Feature', geometry: seg.geometry, properties: {} },
        });

        // Shadow layer underneath
        map.addLayer({
          id: `route-shadow-${seg.day}`,
          type: 'line',
          source: `route-${seg.day}`,
          layout: { 'line-cap': 'round', 'line-join': 'round' },
          paint: {
            'line-color': '#000',
            'line-width': 8,
            'line-opacity': 0.12,
            'line-blur': 1,
          },
        });

        map.addLayer({
          id: `route-line-${seg.day}`,
          type: 'line',
          source: `route-${seg.day}`,
          layout: { 'line-cap': 'round', 'line-join': 'round' },
          paint: {
            'line-color': ROUTE_COLOR,
            'line-width': 3.5,
            'line-opacity': 0.9,
          },
        });
      });

      // Add markers
      Object.values(towns).forEach((town) => {
        const isEndpoint = town.type === 'start' || town.type === 'end';
        const isSlept = town.type === 'start' || town.type === 'end' || town.type === 'stop';

        const size = isEndpoint ? 12 : 8;
        const bgColor = isSlept ? ROUTE_COLOR : '#FFFFFF';
        const strokeColor = isSlept ? '#FFFFFF' : ROUTE_COLOR;
        const strokeWidth = isEndpoint ? 2.5 : 1.5;

        const el = document.createElement('div');
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.borderRadius = '50%';
        el.style.backgroundColor = bgColor;
        el.style.border = `${strokeWidth}px solid ${strokeColor}`;
        el.style.cursor = 'pointer';
        el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.15)';

        if (isEndpoint) {
          el.style.outline = '1px solid rgba(0,0,0,0.1)';
          el.style.outlineOffset = '1px';
        }

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat(town.coords)
          .addTo(map);

        markersRef.current.push(marker);
      });

      // Fit to full route on initial load
      const allCoords = Object.values(towns).map((t) => t.coords);
      const fullBounds = allCoords.reduce(
        (b, c) => b.extend(c),
        new mapboxgl.LngLatBounds(allCoords[0], allCoords[0])
      );
      map.fitBounds(fullBounds, { padding: 40 });
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
      const lineId = `route-line-${seg.day}`;
      const shadowId = `route-shadow-${seg.day}`;
      if (!map.getLayer(lineId)) return;

      if (selectedDay === null) {
        map.setPaintProperty(lineId, 'line-opacity', 0.9);
        map.setPaintProperty(lineId, 'line-width', 3.5);
        if (map.getLayer(shadowId)) {
          map.setPaintProperty(shadowId, 'line-opacity', 0.12);
        }
      } else if (seg.day === selectedDay) {
        map.setPaintProperty(lineId, 'line-opacity', 1);
        map.setPaintProperty(lineId, 'line-width', 4.5);
        if (map.getLayer(shadowId)) {
          map.setPaintProperty(shadowId, 'line-opacity', 0.18);
        }
      } else {
        map.setPaintProperty(lineId, 'line-opacity', 0.12);
        map.setPaintProperty(lineId, 'line-width', 2);
        if (map.getLayer(shadowId)) {
          map.setPaintProperty(shadowId, 'line-opacity', 0.04);
        }
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
        map.fitBounds(bounds, { padding: 100, duration: 800 });
      }
    } else {
      const allCoords = Object.values(towns).map((t) => t.coords);
      const fullBounds = allCoords.reduce(
        (b, c) => b.extend(c),
        new mapboxgl.LngLatBounds(allCoords[0], allCoords[0])
      );
      map.fitBounds(fullBounds, { padding: 40, duration: 800 });
    }
  }, [activeDay, segments]);

  return (
    <div ref={containerRef} className={`w-full rounded-lg border border-black/[0.06] overflow-hidden bg-stone-100 ${className ?? 'h-[500px]'}`} />
  );
}
