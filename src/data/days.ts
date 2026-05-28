export type Town = {
  id: string;
  name: string;
  coords: [number, number]; // [lng, lat]
  type: 'start' | 'stop' | 'end' | 'lunch';
  note?: string;
};

export type Lodging = {
  name: string;
  town: string;
  note: string;
  googleMapsUrl: string;
  photo?: string;
};

export type Meal = {
  label: string;
  name: string;
  location: string;
  note: string;
  googleMapsUrl: string;
  photo?: string;
};

export type GearItem = {
  category: string;
  name: string;
  weight?: string;
  note: string;
  photo?: string;
};

export type CredencialStamp = {
  location: string;
  date: string;
  source: string;
  note?: string;
  photo?: string;
};

export type Day = {
  day: number;
  date: string;
  from: string;
  to: string;
  via?: string;
  miles: number;
  title: string;
  hours: number;
  elevation: number;
  townsCount: number;
  restDay?: boolean;
  narrative: string[];
  photos: string[];
  lodging: Lodging;
  meals: Meal[];
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
  {
    day: 1,
    date: '2026-05-18',
    from: 'sarria',
    to: 'portomarin',
    miles: 13.7,
    title: 'Sarria → Portomarín',
    hours: 6.5,
    elevation: 450,
    townsCount: 2,
    narrative: [
      'Started walking at 7:15am from Sarria. The air was cool and the town was still mostly asleep — just a few other pilgrims loading up at the café near the trailhead. Café con leche, tortilla slice, out the door.',
      'The first few kilometers wound through eucalyptus forest, damp and quiet. The trail markers are everywhere — yellow arrows on stone walls, trees, the occasional spray-painted reminder on asphalt. Hard to get lost.',
      'The descent into Portomarín is dramatic. You cross a long bridge over the Belesar reservoir and climb stone stairs into a town that was literally moved uphill when the dam flooded the original village in the 1960s. The church of San Nicolás was relocated stone by stone.',
      'Checked into the albergue by 2pm. Shower, laundry line, siesta. Dinner was a pilgrim menu at Casa Curro — three courses, bottle of Ribeiro, €13. The dining room was loud and full of languages I couldn\'t place.',
    ],
    photos: [],
    lodging: {
      name: 'Novo Porto Albergue',
      town: 'Portomarín',
      note: '[Placeholder — Ryan to write]',
      googleMapsUrl: 'https://maps.app.goo.gl/1pmaLY8iV38QBpoE8',
    },
    meals: [
      { label: 'LUNCH', name: 'Restaurante Pérez', location: 'Portomarín', note: '[Placeholder — Ryan to write]', googleMapsUrl: 'https://maps.app.goo.gl/am6mMswz5R1wJhgJA' },
      { label: 'DINNER', name: 'Casa Cruz', location: 'Portomarín', note: '[Placeholder — Ryan to write]', googleMapsUrl: 'https://maps.app.goo.gl/gy4SAi8vqZLUNUp37' },
    ],
  },
  {
    day: 2,
    date: '2026-05-19',
    from: 'portomarin',
    to: 'palas',
    miles: 15.5,
    title: 'Portomarín → Palas de Rei',
    hours: 7.2,
    elevation: 780,
    townsCount: 2,
    narrative: [
      'Left Portomarín early, climbing out of the river valley on a paved road before the trail cut back into farmland. Rolling hills, stone walls, cows watching you pass. Classic Galician countryside.',
      'Today felt longer than the numbers suggested. The terrain between Portomarín and Palas de Rei is deceptively hilly — nothing steep, but constant up-and-down that wears on the legs. I started counting hamlets: Gonzar, Castromaior, Ventas de Narón.',
      'Stopped for a bocadillo and Aquarius at a tiny bar in Hospital de la Cruz. The bartender had a stamp for the credencial and a dog that followed pilgrims to the edge of the village before turning back.',
      'Arrived in Palas de Rei around 3pm. Small, quiet town. The albergue was clean and half-empty — apparently most people push further to Melide. Glad I didn\'t. The evening was warm and I sat on a bench reading until dark.',
    ],
    photos: [],
    lodging: {
      name: 'Albergue Restaurante Castro',
      town: 'Palas de Rei',
      note: '[Placeholder — Ryan to write]',
      googleMapsUrl: 'https://maps.app.goo.gl/dVxLwFcGSV3U3uWs6',
    },
    meals: [
      { label: 'LUNCH', name: 'Rectoral de Lestedo', location: 'Between Portomarín and Palas de Rei', note: '[Placeholder — Ryan to write]', googleMapsUrl: 'https://maps.app.goo.gl/smvaGibXDVQ1eiVk9' },
      { label: 'DINNER', name: 'Pulpería A Nosa Terra', location: 'Palas de Rei', note: '[Placeholder — Ryan to write]', googleMapsUrl: 'https://maps.app.goo.gl/9oz3Nhw3RqpXKaG7A' },
    ],
  },
  {
    day: 3,
    date: '2026-05-20',
    from: 'palas',
    to: 'arzua',
    via: 'melide',
    miles: 18.6,
    title: 'Palas de Rei → Arzúa',
    hours: 8.4,
    elevation: 620,
    townsCount: 3,
    narrative: [
      'The longest day. Left Palas de Rei at 6:45am knowing I had 18.6 miles ahead. The original plan was to stop in Melide, but the albergues were full by noon and I felt strong enough to keep going. Good decision.',
      'Passed through a string of tiny villages before reaching Melide around noon. This is the town famous for pulpo — octopus cooked in copper pots and served on wooden plates with paprika, olive oil, and coarse salt. Stopped at Ezequiel, which has been doing it since the 1950s. Worth every minute.',
      'The afternoon stretch from Melide to Arzúa was tough. My feet were starting to complain and the trail alternated between forest paths and asphalt road walking. Arzúa appeared just when I needed it — a real town with pharmacies and supermarkets.',
      'Collapsed into Albergue Don Quijote, took an ice-cold shower (the hot water was gone), and ate a quiet dinner alone at a restaurant on the main square. Tetilla cheese and bread. Galicia does simple food better than anywhere.',
    ],
    photos: [],
    lodging: {
      name: 'O Albergue deSelmo',
      town: 'Arzúa',
      note: '[Placeholder — Ryan to write]',
      googleMapsUrl: 'https://maps.app.goo.gl/rYkE9vr8WCEdXYs79',
    },
    meals: [
      { label: 'LUNCH', name: 'Pulpería A Garnacha', location: 'Melide', note: '[Placeholder — Ryan to write]', googleMapsUrl: 'https://maps.app.goo.gl/3LHxTiQDMbnqyT4X6' },
      { label: 'DINNER', name: 'Bar Galicia', location: 'Arzúa', note: '[Placeholder — Ryan to write]', googleMapsUrl: 'https://maps.app.goo.gl/ReneJg7mKtQmFvAr8' },
    ],
  },
  {
    day: 4,
    date: '2026-05-21',
    from: 'arzua',
    to: 'pedrouzo',
    miles: 11.8,
    title: 'Arzúa → O Pedrouzo',
    hours: 5.7,
    elevation: 380,
    townsCount: 2,
    narrative: [
      'Short day — only 11.8 miles. Left Arzúa late, around 8am, because my legs needed the extra sleep. The trail out of town drops into a eucalyptus forest and stays there for a while.',
      'Today\'s walking felt different. The path is getting busier — more pilgrims who started from Sarria just a day or two ago, tour groups, people with clean backpacks. The last 100km is the minimum for the Compostela certificate, so the trail fills up.',
      'Stopped in Santa Irene for coffee and a stamp at a small chapel. The hospitalera was an older woman who\'d walked the Camino four times. She said the fifth time was just living next to it.',
      'O Pedrouzo is not a pretty town — it\'s basically a highway stop that exists because pilgrims need somewhere to sleep before the final push to Santiago. But the albergue was fine, and the anticipation of tomorrow made everything feel charged.',
    ],
    photos: [],
    lodging: {
      name: 'Pensión Spa Cruceiro de Pedouzo',
      town: 'O Pedrouzo',
      note: '[Placeholder — Ryan to write]',
      googleMapsUrl: 'https://maps.app.goo.gl/eEDHBME73Ap3FG9Z6',
    },
    meals: [
      { label: 'LUNCH', name: 'Café-bar pensión Tasaga', location: 'On-trail', note: '[Placeholder — Ryan to write]', googleMapsUrl: 'https://maps.app.goo.gl/uiYY5WyRxScZEBY2A' },
      { label: 'DINNER', name: 'Ch Pizza', location: 'O Pedrouzo', note: '[Placeholder — Ryan to write]', googleMapsUrl: 'https://maps.app.goo.gl/tKCZU1jzBPPPWVuL8' },
    ],
  },
  {
    day: 5,
    date: '2026-05-22',
    from: 'pedrouzo',
    to: 'santiago',
    miles: 12.4,
    title: 'O Pedrouzo → Santiago',
    hours: 6.0,
    elevation: 520,
    townsCount: 2,
    narrative: [
      'Woke up at 5:30am. Nobody needed an alarm — the whole albergue was rustling in the dark, headlamps bobbing, dry bags being stuffed. Everyone wanted to reach Santiago early.',
      'The first hour was forest walking in pre-dawn light. Then the trail crossed the airport perimeter — planes taking off overhead while you walk through eucalyptus. A surreal transition from medieval pilgrimage to modern infrastructure.',
      'Monte do Gozo — the Hill of Joy — is where you first see Santiago\'s cathedral spires in the distance. I stood there for a few minutes. Two German pilgrims were crying. A Korean couple took a selfie. I just looked.',
      'Walked into the old city through the Porta do Camiño and followed the brass scallop shells embedded in the sidewalk to the cathedral. Arrived at 10:15am. The Praza do Obradoiro was full of pilgrims sitting on the ground, boots off, staring up at the facade. I joined them.',
    ],
    photos: [],
    lodging: {
      name: 'Albergue SP 55 by Bossh! Hotels',
      town: 'Santiago de Compostela',
      note: '[Placeholder — Ryan to write]',
      googleMapsUrl: 'https://maps.app.goo.gl/rMYgYeVTjr9h4dAp8',
    },
    meals: [
      { label: 'LUNCH', name: 'Restaurante O Tangueiro', location: 'Santiago de Compostela', note: '[Placeholder — Ryan to write]', googleMapsUrl: 'https://maps.app.goo.gl/xifzcPoPFJMfJFDGA' },
      { label: 'DINNER', name: 'Restaurante Sant Yago', location: 'Santiago de Compostela', note: '[Placeholder — Ryan to write]', googleMapsUrl: 'https://maps.app.goo.gl/E7qhAp7ofDjDGA478' },
    ],
  },
  {
    day: 6,
    date: '2026-05-23',
    from: 'santiago',
    to: 'santiago',
    miles: 0,
    title: 'Santiago de Compostela',
    restDay: true,
    hours: 0,
    elevation: 0,
    townsCount: 0,
    narrative: [
      '[Placeholder — Ryan will write this]',
    ],
    photos: [],
    lodging: {
      name: 'Studio Apartment',
      town: 'Santiago de Compostela',
      note: '[Placeholder — Ryan to write]',
      googleMapsUrl: '',
    },
    meals: [
      { label: 'LUNCH', name: 'Koa Poke', location: 'Santiago de Compostela', note: '[Placeholder — Ryan to write]', googleMapsUrl: 'https://maps.app.goo.gl/pzYcL7cUoedjocLr8' },
      { label: 'DINNER', name: 'Lúcuma', location: 'Santiago de Compostela', note: '[Placeholder — Ryan to write]', googleMapsUrl: 'https://maps.app.goo.gl/CM5dMojqrryJa4KX9' },
    ],
  },
];

export const tripHighlights: Array<{
  eyebrow: string;
  title: string;
  location: string;
  note: string;
}> = [
  {
    eyebrow: 'THE FOOD MOMENT',
    title: 'Pulpo at Ezequiel',
    location: 'Melide · Day 3',
    note: 'Octopus on a wooden plate, paprika, olive oil. The reason half the pilgrims stop in Melide.',
  },
  {
    eyebrow: 'THE ARRIVAL',
    title: 'Crossing the Miño bridge',
    location: 'Portomarín · Day 1',
    note: 'A long reservoir crossing into a town that was moved stone by stone when the dam flooded the valley.',
  },
  {
    eyebrow: 'THE QUIET',
    title: 'Eucalyptus forests at dawn',
    location: 'O Pedrouzo → Santiago · Day 5',
    note: 'Pre-dawn walking through fog and eucalyptus. Planes overhead, cathedral ahead. The strangest hour of the trip.',
  },
  {
    eyebrow: 'THE END',
    title: 'Praza do Obradoiro',
    location: 'Santiago · Day 5',
    note: 'Boots off, sitting on the stone, staring up at the cathedral facade with fifty other pilgrims. Nobody said much.',
  },
];

export const tripOverview = {
  lead: 'Five days on foot from Sarria to Santiago de Compostela. 71.4 miles through Galicia. This is what I carried, what I spent, where I slept, and what I thought about along the way.',
  paragraphs: [
    'The last 100 kilometers of the Camino Francés is the most walked section of the route — the minimum distance to receive the Compostela certificate. It runs through rural Galicia: eucalyptus forests, stone villages, muddy farm tracks, and the occasional stretch of highway shoulder. The terrain is rolling, not mountainous. The weather is unpredictable.',
    'I walked it in late May 2026 over five days, averaging about 14 miles per day. The pace was comfortable but deliberate — enough time to eat well, sleep early, and arrive before the albergues filled up. This site is the record of that walk.',
  ],
};

export const gear: GearItem[] = [
  { category: 'PACK', name: 'Osprey Stratos 34', note: '[Placeholder — Ryan to write]', photo: 'osprey-stratos-34.jpg' },
  { category: 'FOOTWEAR', name: 'Salomon Genesis Trail-Running Shoes', note: '[Placeholder — Ryan to write]', photo: 'salomon-genesis.jpg' },
  { category: 'FOOTWEAR', name: 'Darn Tough Hiker Micro Crew Socks ×3', note: '[Placeholder — Ryan to write]', photo: 'darn-tough-socks.jpg' },
  { category: 'BASE LAYER', name: 'Smartwool Merino Short Sleeve', note: '[Placeholder — Ryan to write]', photo: 'smartwool-short-sleeve.jpg' },
  { category: 'BASE LAYER', name: 'REI Merino Long Sleeve', note: '[Placeholder — Ryan to write]', photo: 'rei-long-sleeve.jpg' },
  { category: 'SHELL', name: 'REI Rainier Rain Jacket', note: '[Placeholder — Ryan to write]', photo: 'rei-rainier.jpg' },
  { category: 'PANTS', name: 'Gramicci Nylon Paneled Trek Pants', note: '[Placeholder — Ryan to write]', photo: 'gramicci-pants.jpg' },
  { category: 'HEADWEAR', name: 'Snow Peak Bucket Hat', note: '[Placeholder — Ryan to write]', photo: 'snowpeak-bucket-hat.jpg' },
  { category: 'SLEEP', name: 'Silk Sleeping Bag Liner', note: '[Placeholder — Ryan to write]', photo: 'silk-liner.jpg' },
  { category: 'ELECTRONICS', name: 'Anker Portable Charger', note: '[Placeholder — Ryan to write]', photo: 'anker-charger.jpg' },
  { category: 'ELECTRONICS', name: 'Olympus Stylus Tough Camera', note: '[Placeholder — Ryan to write]', photo: 'olympus-stylus.jpg' },
  { category: 'HYDRATION', name: 'Water Bladder / Camelback', note: '[Placeholder — Ryan to write]', photo: 'water-bladder.jpg' },
  { category: 'ACCESSORIES', name: 'Miller Sunglasses', note: '[Placeholder — Ryan to write]', photo: 'miller-sunglasses.jpg' },
  { category: 'ACCESSORIES', name: 'Journal + Pens', note: '[Placeholder — Ryan to write]', photo: 'journal.jpg' },
  { category: 'TOILETRIES', name: 'Eunzel Microfiber Quick-Dry Towel', note: '[Placeholder — Ryan to write]', photo: 'quickdry-towel.jpg' },
  { category: 'HEALTH', name: 'First Aid Pouch', note: '[Placeholder — Ryan to write]', photo: 'first-aid-pouch.jpg' },
];

export const stamps: CredencialStamp[] = [
  { location: 'Sarria', date: '2026-05-18', source: 'Albergue O Durmiñento' },
  { location: 'Portomarín', date: '2026-05-18', source: 'Iglesia de San Nicolás' },
  { location: 'Portomarín', date: '2026-05-18', source: 'Albergue Ferramenteiro' },
  { location: 'Palas de Rei', date: '2026-05-19', source: 'Albergue de Peregrinos' },
  { location: 'Palas de Rei', date: '2026-05-19', source: 'Pulpería Loly' },
  { location: 'Melide', date: '2026-05-20', source: 'Pulpería Ezequiel' },
  { location: 'Melide', date: '2026-05-20', source: 'Iglesia de Santa María' },
  { location: 'Arzúa', date: '2026-05-20', source: 'Albergue Don Quijote' },
  { location: 'Arzúa', date: '2026-05-21', source: 'Café Centro' },
  { location: 'O Pedrouzo', date: '2026-05-21', source: 'Albergue O Pino' },
  { location: 'Santiago', date: '2026-05-22', source: 'Catedral de Santiago' },
  { location: 'Santiago', date: '2026-05-22', source: 'Oficina del Peregrino' },
];

export const ROUTE_COLOR = '#C7521D';
