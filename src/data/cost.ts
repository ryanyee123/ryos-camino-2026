export type CostItem = {
  name: string;
  amountEur: number;
  note?: string;
  url?: string;
};

export type CostCategory = {
  name: string;
  totalEur: number;
  items: CostItem[];
};

export const cost = {
  totalEur: 1552.5,
  conversionRate: 1.08,
  narrative: '[Placeholder — Ryan to write]',
  categories: [
    {
      name: 'Lodging',
      totalEur: 217.5,
      items: [
        { name: 'Albergue O Durmiñento (Sarria)', amountEur: 11, url: 'https://maps.app.goo.gl/ibwbpkAcxDRHBrwk7' },
        { name: 'Novo Porto Albergue (Portomarín)', amountEur: 15.5, url: 'https://maps.app.goo.gl/1pmaLY8iV38QBpoE8' },
        { name: 'Albergue Restaurante Castro (Palas de Rei)', amountEur: 15.5, url: 'https://maps.app.goo.gl/dVxLwFcGSV3U3uWs6' },
        { name: 'O Albergue deSelmo (Arzúa)', amountEur: 15.5, url: 'https://maps.app.goo.gl/rYkE9vr8WCEdXYs79' },
        { name: 'Pensión Spa Cruceiro de Pedouzo', amountEur: 30, url: 'https://maps.app.goo.gl/eEDHBME73Ap3FG9Z6' },
        { name: 'Albergue SP 55 by Bossh! Hotels (Santiago)', amountEur: 40, url: 'https://maps.app.goo.gl/rMYgYeVTjr9h4dAp8' },
        { name: 'Studio Apartment (Santiago)', amountEur: 90 },
      ],
    },
    {
      name: 'Food',
      totalEur: 221,
      items: [
        { name: 'Day 1 — meals + café', amountEur: 32 },
        { name: 'Day 2 — meals + café', amountEur: 32 },
        { name: 'Day 3 — pulpo lunch + dinner + café', amountEur: 35 },
        { name: 'Day 4 — meals + café', amountEur: 32 },
        { name: 'Day 5 — celebration lunch + dinner + café', amountEur: 40 },
        { name: 'Day 6 — Koa Poke + Lúcuma', amountEur: 50 },
      ],
    },
    {
      name: 'Transit',
      totalEur: 100,
      items: [
        { name: 'Madrid → Sarria (train)', amountEur: 50 },
        { name: 'Santiago → Madrid (train)', amountEur: 50 },
      ],
    },
    {
      name: 'Misc',
      totalEur: 35,
      items: [
        { name: 'Credencial del Peregrino', amountEur: 2 },
        { name: 'Compostela certificate', amountEur: 3 },
        { name: 'Laundry', amountEur: 10 },
        { name: 'Donations (churches, stamps)', amountEur: 10 },
        { name: 'Snacks & convenience items', amountEur: 10 },
      ],
    },
    {
      name: 'Gear',
      totalEur: 979,
      items: [
        { name: 'Osprey Stratos 34', amountEur: 185 },
        { name: 'Salomon Genesis Trail-Running Shoes', amountEur: 139 },
        { name: 'Darn Tough Hiker Micro Crew Socks ×3', amountEur: 72 },
        { name: 'Smartwool Merino Short Sleeve', amountEur: 60 },
        { name: 'REI Merino Long Sleeve', amountEur: 60 },
        { name: 'REI Rainier Rain Jacket', amountEur: 93 },
        { name: 'Gramicci Nylon Paneled Trek Pants', amountEur: 137 },
        { name: 'Snow Peak Bucket Hat', amountEur: 46 },
        { name: 'Sleeping Bag Liner', amountEur: 28 },
        { name: 'Anker Portable Charger', amountEur: 43 },
{ name: 'Water Bladder / Camelback', amountEur: 32 },
        { name: 'Meller Sunglasses', amountEur: 28 },
        { name: 'Journal + Pens', amountEur: 23 },
        { name: 'Eunzel Microfiber Quick-Dry Towel', amountEur: 14 },
        { name: 'First Aid Pouch', amountEur: 19 },
      ],
    },
  ] as CostCategory[],
};
