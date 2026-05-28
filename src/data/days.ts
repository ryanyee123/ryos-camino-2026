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
      name: 'Albergue Ferramenteiro',
      town: 'Portomarín',
      note: 'Large municipal-style place with terraces overlooking the Miño river. The shower line was no joke.',
      googleMapsUrl: '',
    },
    meals: [
      { label: 'DINNER', name: 'Pilgrim Menu at Casa Curro', location: 'Portomarín', note: 'Three courses and a bottle of wine for €13. Lentil stew, pork, flan. Slept hard after.', googleMapsUrl: '' },
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
      name: 'Albergue de Palas de Rei',
      town: 'Palas de Rei',
      note: 'Municipal albergue on the main road. Clean, quiet, half-empty by late afternoon.',
      googleMapsUrl: '',
    },
    meals: [
      { label: 'LUNCH', name: 'Bocadillo at Hospital de la Cruz', location: 'Hospital de la Cruz', note: 'Ham and cheese on crusty bread, bottle of Aquarius. The bartender\'s dog followed me to the edge of town.', googleMapsUrl: '' },
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
      name: 'Albergue Don Quijote',
      town: 'Arzúa',
      note: 'Private albergue, small and well-run. Hot showers (if you arrive early). Good kitchen.',
      googleMapsUrl: '',
    },
    meals: [
      { label: 'LUNCH', name: 'Pulpo at Ezequiel', location: 'Melide', note: 'The pulpo is the reason you stop in Melide. Tender, paprika, olive oil, salt. Don\'t overthink it.', googleMapsUrl: '' },
      { label: 'DINNER', name: 'Tetilla cheese and bread', location: 'Arzúa', note: 'Quiet dinner alone on the main square. Galicia does simple food better than anywhere.', googleMapsUrl: '' },
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
      name: 'Albergue O Pino',
      town: 'O Pedrouzo',
      note: 'The last bunk before Santiago. Slept like a stone, woke up nervous.',
      googleMapsUrl: '',
    },
    meals: [
      { label: 'LUNCH', name: 'Tortilla and coffee at Santa Irene', location: 'Santa Irene', note: 'Small chapel café. The hospitalera had walked the Camino four times.', googleMapsUrl: '' },
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
      name: 'Seminario Menor',
      town: 'Santiago de Compostela',
      note: 'Enormous seminary converted to albergue. 200 beds. Worth it for the location — 5 minutes from the cathedral.',
      googleMapsUrl: '',
    },
    meals: [
      { label: 'CELEBRATION', name: 'Lunch at O Curro da Parra', location: 'Santiago', note: 'Proper sit-down lunch after five days of pilgrim menus. Galician beef, Albariño wine, tarta de Santiago. Earned every bite.', googleMapsUrl: '' },
      { label: 'MORNING', name: 'Last café con leche', location: 'O Pedrouzo', note: 'The final 5am coffee before the last push. €1.50. Same as every other morning.', googleMapsUrl: '' },
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
      name: 'TBD',
      town: 'Santiago de Compostela',
      note: '',
      googleMapsUrl: '',
    },
    meals: [
      { label: 'LUNCH', name: 'TBD', location: 'Santiago de Compostela', note: '', googleMapsUrl: '' },
      { label: 'DINNER', name: 'TBD', location: 'Santiago de Compostela', note: '', googleMapsUrl: '' },
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
  { category: 'PACK', name: 'Osprey Talon 33', weight: '950g', note: 'The whole life on my back.' },
  { category: 'FOOTWEAR', name: 'Hoka Speedgoat 5', note: 'Trail runners, not boots. Controversial. Right call.' },
  { category: 'BASE LAYER', name: 'Smartwool merino long sleeve', note: 'Worn five days straight. Hand-washed twice. Didn\'t smell.' },
  { category: 'TREKKING', name: 'Black Diamond trekking poles', note: 'Saved my knees on the descent into Portomarín.' },
  { category: 'SHELL', name: 'Patagonia Houdini', weight: '100g', note: 'Packs to nothing. Used it once, glad I had it.' },
  { category: 'BASE', name: 'Saxx Kinetic boxers (×2)', note: 'Two pairs. Hand-wash rotation. No chafing, ever.' },
  { category: 'SLEEP', name: 'Sea to Summit silk liner', note: 'Lighter than a sleeping bag, warmer than nothing.' },
  { category: 'ELECTRONICS', name: 'Anker 10000mAh battery', note: 'Charged the phone every night. Never died.' },
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
