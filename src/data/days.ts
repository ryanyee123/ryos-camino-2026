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
  weight?: number; // grams
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

export type TextBlock = {
  type: 'text';
  content: string;
};

export type ImageBlock = {
  type: 'image';
  filename: string;  // resolves to /photos/day-{N}/{filename}
  aspectRatio?: '3/4' | '4/5' | '3/2' | 'square';  // default to '3/2' if omitted
};

export type ImagePairBlock = {
  type: 'image-pair';
  left: { filename: string; aspectRatio?: '3/4' | '4/5' | '3/2' | 'square' };
  right: { filename: string; aspectRatio?: '3/4' | '4/5' | '3/2' | 'square' };
};

export type NarrativeBlock = TextBlock | ImageBlock | ImagePairBlock;

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
  transit?: 'train' | 'bus';
  narrative: NarrativeBlock[];
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
  madrid:     { id: 'madrid',     name: 'Madrid',       coords: [-3.7038, 40.4168], type: 'end'   },
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
      { type: 'text', content: 'Woke up early in Sarria around 6:30am and started walking by 7:30am. The weather was beautiful. Blue sky, cool air. I had a really good walk to Portomarín. The walk itself moved through a mix of farmland and forest. Mostly small dirt paths, some sections on quiet country roads.' },
      { type: 'text', content: 'The occasional stone marker carved with a scallop and a yellow arrow pointing the way. The yellow arrows are everywhere on the Camino. Painted on rocks, sprayed on asphalt, nailed to trees. You really can\'t get lost.' },
      { type: 'image', filename: 'day-1-sarria.jpeg' },
      { type: 'text', content: 'I didn\'t stop the entire route, maybe one or two short rest breaks where I sat on a stone wall, but I didn\'t eat anything the whole way. First day energy carried me through. I think I underestimated how much fuel I\'d need. By the time I got into town I was starving.' },
      { type: 'image', filename: 'day-1-100km.jpeg' },
      { type: 'image', filename: 'day-1-portomarin.jpeg' },
      { type: 'text', content: 'When I got into Portomarín I went straight to Restaurante Pérez and ordered a pilgrim menu. These are fixed price menus you see everywhere on the Camino, usually around 14 to 17 euros, where you pick two courses, a dessert, and a drink. I got pasta with meat sauce, pork chops and fries, and flan. Bread on the side. Honest food, served fast, exactly what I needed after walking thirteen miles on a KIND bar.' },
      { type: 'image-pair', left: { filename: 'day-1-pasta.jpeg' }, right: { filename: 'day-1-pastagone.jpeg' } },
      { type: 'image-pair', left: { filename: 'day-1-pork.jpeg' }, right: { filename: 'day-1-porkgone.jpeg' } },
      { type: 'image-pair', left: { filename: 'day-1-flan.jpeg' }, right: { filename: 'day-1-flangone.jpeg' } },
      { type: 'text', content: 'Portomarín turned out to be a really cute town. It sits right on the water, on a reservoir. The original village was relocated stone by stone in the 1960s when they built the dam below. The new town is up on the hill with narrow streets and a fortress-looking church right in the middle. I spent the afternoon walking around exploring.' },
      { type: 'image', filename: 'day-1-portomarinsign.jpeg' },
      { type: 'text', content: 'I hadn\'t booked a bed for the night, which I figured would be fine because the Camino has albergues every few hundred meters. It was not fine. I tried about six different places before I found a bed. A few of the hosts started calling other hosts on my behalf to help me find a spot. Eventually I landed at Novo Porto. Got my Credencial stamped, found my bunk, grabbed dinner at the restaurant next door, then went to bed early.' },
    ],
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
      { type: 'text', content: 'Started around 7:30 from Portomarín. It rained most of the day, but I was well equipped, and honestly it became one of my favorite walks of the trip. Quiet, in my own head, cathartic, with fewer people on the trail. The rain wasn\'t super heavy, more of a steady drizzle.' },
      { type: 'image', filename: 'day-2-selfie.jpeg' },
      { type: 'text', content: 'There\'s a big climb right out of Portomarín. You cross a long pedestrian bridge over the reservoir and then the trail just keeps going up for the first kilometer or so. That\'s the push at the beginning, and after that it settles into rolling farmland. Pigs, cows, sheep, the occasional village that\'s three stone houses and a chapel. A few more technical sections.' },
      { type: 'image', filename: 'day-2-sign.jpeg' },
      { type: 'text', content: 'By the time I got to Palas de Rei the sun had broken back through. I checked into the albergue and the room had only one other person in it. Javi, 50, from Palencia. I\'d actually met him briefly the night before in Portomarín because we were bunk mates. He helped me look for a lost earbud that morning.' },
      { type: 'image', filename: 'day-2-beer.jpeg' },
      { type: 'text', content: 'We went to a hardware store, found some, and on the way back he introduced me to Sisco, 32, another Spaniard he\'d met in Sarria. Sisco was quieter, a little gruff at first, warmed up over the course of the evening. Then Javi introduced me to Paula, 25, from Barcelona, who\'d been walking on her own and joined the three of us.' },
      { type: 'image-pair', left: { filename: 'day-2-dinner.jpeg' }, right: { filename: 'day-2-dinner2.jpeg' } },
      { type: 'text', content: 'The four of us shared beers and snacks in a plaza before dinner. At dinner I accidentally ordered an extra side of fries and aioli when I just meant to order some aioli. Everyone was very chill about it.' },
      { type: 'image', filename: 'day-2-dinner3.jpeg' },
    ],
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
      { type: 'text', content: 'The longest day. I\'d originally planned to split it into two, stopping in Melide for the night, but Javi mentioned the whole group was going all the way to Arzúa. I figured it could be fun to get the extra day in Santiago and spend a bit more time with them, so I sent it.' },
      { type: 'text', content: 'The walk that day was through proper eucalyptus forest. Quiet, tranquil, the kind of walking where you can just stop thinking and let your legs do the work. Sometimes I\'d be walking with Paula. Sometimes with Javi.' },
      { type: 'text', content: 'We stopped in Melide for lunch and had pulpo at Pulpería A Garnacha. Melide is the town famous for octopus on the Camino. Tender, dressed with paprika and olive oil and coarse salt, served on a wooden plate. The pulperia was full of pilgrims and locals. The kind of place where you eat at communal tables. We each ordered our own quarter octopus.' },
      { type: 'image-pair', left: { filename: 'day-3-pulpo.jpeg' }, right: { filename: 'day-3-pulpogroup.jpeg' } },
      { type: 'text', content: 'Past Melide, we stopped at a river. The water was freezing. We took our shoes off and dunked our feet, and then Sisco got us ice cream.' },
      { type: 'image-pair', left: { filename: 'day-3-river.jpeg' }, right: { filename: 'day-3-sweettreat.jpeg' } },

    ],
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
      { type: 'text', content: 'A shorter day. The trail out of Arzúa drops back into eucalyptus forest pretty quickly and stays there for most of the morning. The path was busier than the previous days, with more pilgrims who\'d started in Sarria a day or two behind us, plus some tour groups with clean backpacks and matching shirts. The last hundred kilometers of the Camino Francés is the most walked section of any Camino route, because it\'s the minimum distance you need to complete to get the Compostela certificate at the end.' },
      { type: 'text', content: 'Partway through we stopped at a bar for a few beers. While we were there a bunch of Spanish locals were dancing and singing. Really good vibes. The kind of stop you couldn\'t plan for, where you walk in for one beer and stay for three.' },
      { type: 'image-pair', left: { filename: 'day-4-beer.jpeg' }, right: { filename: 'day-4-beer2.jpeg' } },
      { type: 'image', filename: 'day-4-group.jpeg' },
      { type: 'text', content: 'The albergue in O Pedrouzo turned out to be a pension spa. Hot sauna, steam room, hot tubs. I used all of it. I sat in the sauna for as long as I could, then cold plunged. Felt rejuvenated after.' },
      { type: 'text', content: 'For dinner we ate pizza. I got one with ham, mushrooms, onions and oregano. It was solid. Not Italian pizza, not American pizza. Galician pizza, which is its own thing.' },
      { type: 'image', filename: 'day-4-pizza.jpeg' },
    ],
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
      { type: 'text', content: 'We started around 8am. The trail out of O Pedrouzo runs through more eucalyptus forest, and for the first hour it\'s still cool and damp and quiet. Then it got quite hot and sunny.' },
      { type: 'text', content: 'About an hour in I met Jacob, 23, from Florida. He\'d been walking on his own too. The five of us walked the final leg together.' },
      { type: 'image', filename: 'day-5-group.jpeg' },
      { type: 'text', content: 'Somewhere along the way I finally got my concha, the scallop shell that pilgrims attach to their packs. It\'s the symbol of the Camino, you see them on every albergue and every trail marker, and most pilgrims pick one up at the start. I procrastinated but wanted it by the end.' },
      { type: 'image', filename: 'day-5-concha.jpeg' },
      { type: 'text', content: 'About an hour out from Santiago I asked the group if I could finish the last stretch on my own. I finished the final hour and a half solo. Stopped for lunch at a pulpería for a burger with a fat slice of cheese.' },
      { type: 'image', filename: 'day-5-burger.jpeg' },
      { type: 'text', content: 'I got to the Praza do Obradoiro around 3:30. The cathedral was stunning. I sat on the ground for a while looking at it and taking it in before I did anything. There were pilgrims everywhere doing the same thing.' },
      { type: 'image-pair', left: { filename: 'day-5-jumpshot.jpeg' }, right: { filename: 'day-5-credential.jpeg' } },
      { type: 'text', content: 'Then I went back to the hostel, rested for a bit, and we all got dinner together. I had a huge steak.' },
      { type: 'image', filename: 'day-5-steak.jpeg' },
    ],
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
      { type: 'text', content: 'Slept in for the first time in a week. Migrated from the albergue to a studio apartment for the night. It was a huge upgrade from a bunk bed in a room with twenty people.' },
      { type: 'text', content: 'On the way I met a guy named Carlos who had this really cool vintage camera he\'d built himself. He took my photo.' },
      { type: 'image-pair', left: { filename: 'day-6-camera.jpeg' }, right: { filename: 'day-6-photo.jpeg' } },
      { type: 'text', content: 'Spent the rest of the day exploring Santiago. Wandered through some of the parks, which were beautiful with the weather we had. Parque da Alameda was full of locals on a Saturday afternoon, kids playing, old couples walking arm in arm.' },
      { type: 'image', filename: 'day-6-park.jpeg' },
      { type: 'text', content: 'Had dinner at a Peruvian restaurant before turning in early. Slept in a private room for the first time in a week. The bed felt enormous.' },
    ],
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
  {
    day: 7,
    date: '2026-05-24',
    from: 'santiago',
    to: 'madrid',
    miles: 0,
    title: 'Santiago → Madrid',
    restDay: true,
    transit: 'train',
    hours: 0,
    elevation: 0,
    townsCount: 0,
    narrative: [
      { type: 'text', content: 'Checked out of the studio apartment in the morning. Walked to a really cute cafe, got a sandwich and a coffee, and journaled for a bit. Wrote about the people I met along the way and what I\'d learned about myself.' },
      { type: 'image', filename: 'day-7-cafe.jpeg' },
      { type: 'text', content: 'After that I went to Parque da Música and laid out in the sun for a while. Took my shoes off. Watched the geese. Napped.' },
      { type: 'image', filename: 'day-7-park.png' },
      { type: 'text', content: 'Train back to Madrid was around 8pm. Got in around 11:30pm. Leo, a coworker, let me crash on his couch.' },
    ],
    lodging: {
      name: 'Leo\'s couch',
      town: 'Madrid',
      note: '[Placeholder — Ryan to write]',
      googleMapsUrl: '',
    },
    meals: [
      { label: 'LUNCH', name: 'Costa Vella Garden Cafe', location: 'Santiago de Compostela', note: 'Acai bowl in the garden before the train.', googleMapsUrl: 'https://maps.app.goo.gl/McUrh6AJBy87GafKA' },
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
  paragraphs: [
    'The Camino de Santiago is a network of pilgrimage routes across Europe that all end at the Cathedral of Santiago de Compostela in northwest Spain. People have been walking it for over a thousand years.',
    'The final stretch of the Camino Francés runs through rural Galicia: eucalyptus forests, stone villages, muddy farm tracks, and the occasional stretch of highway shoulder. The terrain is rolling, not mountainous. The weather is unpredictable.',
    'It\'s the most walked section of the route and the minimum distance required to receive the Compostela certificate. Most people start in Sarria. I averaged about 14 miles a day, arriving in Santiago on day five.',
  ],
};



export const gear: GearItem[] = [
  { category: 'PACK', name: 'Osprey Stratos 34', weight: 1190, note: '[Placeholder — Ryan to write]', photo: 'osprey-stratos-34.jpg' },
  { category: 'FOOTWEAR', name: 'Salomon Genesis Trail-Running Shoes', weight: 595, note: '[Placeholder — Ryan to write]', photo: 'salomon-genesis.jpg' },
  { category: 'FOOTWEAR', name: 'Darn Tough Hiker Micro Crew Socks ×3', weight: 255, note: '[Placeholder — Ryan to write]', photo: 'darn-tough-socks.jpg' },
  { category: 'BASE LAYER', name: 'Smartwool Merino Short Sleeve', weight: 156, note: '[Placeholder — Ryan to write]', photo: 'smartwool-short-sleeve.jpg' },
  { category: 'BASE LAYER', name: 'REI Merino Long Sleeve', weight: 184, note: '[Placeholder — Ryan to write]', photo: 'rei-long-sleeve.jpg' },
  { category: 'SHELL', name: 'REI Rainier Rain Jacket', weight: 354, note: '[Placeholder — Ryan to write]', photo: 'rei-rainier.jpg' },
  { category: 'PANTS', name: 'Gramicci Nylon Paneled Trek Pants', weight: 340, note: '[Placeholder — Ryan to write]', photo: 'gramicci-pants.jpg' },
  { category: 'HEADWEAR', name: 'Snow Peak Bucket Hat', weight: 71, note: '[Placeholder — Ryan to write]', photo: 'snowpeak-bucket-hat.jpg' },
  { category: 'SLEEP', name: 'Sleeping Bag Liner', weight: 142, note: '[Placeholder — Ryan to write]', photo: 'silk-liner.jpg' },
  { category: 'ELECTRONICS', name: 'Anker Portable Charger', weight: 181, note: '[Placeholder — Ryan to write]', photo: 'anker-charger.jpg' },
  { category: 'HYDRATION', name: 'Water Bladder / Camelback', weight: 170, note: '[Placeholder — Ryan to write]', photo: 'water-bladder.jpg' },
  { category: 'ACCESSORIES', name: 'Meller Sunglasses', weight: 28, note: '[Placeholder — Ryan to write]', photo: 'miller-sunglasses.jpg' },
  { category: 'ACCESSORIES', name: 'Journal + Pens', weight: 227, note: '[Placeholder — Ryan to write]', photo: 'journal.jpg' },
  { category: 'TOILETRIES', name: 'Eunzel Microfiber Quick-Dry Towel', weight: 113, note: '[Placeholder — Ryan to write]', photo: 'quickdry-towel.jpg' },
  { category: 'HEALTH', name: 'First Aid Pouch', weight: 170, note: '[Placeholder — Ryan to write]', photo: 'first-aid-pouch.jpg' },
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
