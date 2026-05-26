export type Town = {
  id: string;
  name: string;
  coords: [number, number]; // [lng, lat]
  type: 'start' | 'stop' | 'end' | 'lunch';
  note?: string;
};

export type Day = {
  day: number;
  date: string; // ISO format
  from: string; // town id
  to: string;   // town id
  via?: string; // optional town id for waypoint
  miles: number;
  title: string;
};

export const towns: Record<string, Town> = {
  sarria:     { id: 'sarria',     name: 'Sarria',       coords: [-7.4143, 42.7815], type: 'start' },
  portomarin: { id: 'portomarin', name: 'Portomarín',   coords: [-7.6160, 42.8073], type: 'stop'  },
  palas:      { id: 'palas',      name: 'Palas de Rei', coords: [-7.8693, 42.8731], type: 'stop'  },
  melide:     { id: 'melide',     name: 'Melide',       coords: [-8.0140, 42.9148], type: 'lunch', note: 'Lunch — pulpo at Ezequiel' },
  arzua:      { id: 'arzua',      name: 'Arzúa',        coords: [-8.1610, 42.9286], type: 'stop'  },
  pedrouzo:   { id: 'pedrouzo',   name: 'O Pedrouzo',   coords: [-8.3650, 42.9067], type: 'stop'  },
  santiago:   { id: 'santiago',   name: 'Santiago',     coords: [-8.5448, 42.8806], type: 'end'   },
};

export const days: Day[] = [
  { day: 1, date: '2026-05-18', from: 'sarria',     to: 'portomarin', miles: 13.7, title: 'Sarria → Portomarín' },
  { day: 2, date: '2026-05-19', from: 'portomarin', to: 'palas',      miles: 15.5, title: 'Portomarín → Palas de Rei' },
  { day: 3, date: '2026-05-20', from: 'palas',      to: 'arzua',      via: 'melide', miles: 18.6, title: 'Palas de Rei → Arzúa' },
  { day: 4, date: '2026-05-21', from: 'arzua',      to: 'pedrouzo',   miles: 11.8, title: 'Arzúa → O Pedrouzo' },
  { day: 5, date: '2026-05-22', from: 'pedrouzo',   to: 'santiago',   miles: 12.4, title: 'O Pedrouzo → Santiago' },
];

export const ROUTE_COLOR = '#D85A30';
