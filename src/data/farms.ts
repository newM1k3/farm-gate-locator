import { Farm, ProductCategory } from '../types';

const seedTime = new Date();
const minutesAgo = (m: number) => new Date(seedTime.getTime() - m * 60000);
const hoursAgo = (h: number) => new Date(seedTime.getTime() - h * 3600000);
const daysAgo = (d: number) => new Date(seedTime.getTime() - d * 86400000);

export const CATEGORIES: { key: ProductCategory | 'all'; label: string; emoji: string }[] = [
  { key: 'all', label: 'All', emoji: '🏷️' },
  { key: 'eggs', label: 'Eggs', emoji: '🥚' },
  { key: 'produce', label: 'Produce', emoji: '🥬' },
  { key: 'baked-goods', label: 'Baked Goods', emoji: '🥖' },
  { key: 'maple', label: 'Maple', emoji: '🍁' },
  { key: 'flowers', label: 'Flowers', emoji: '🌻' },
  { key: 'seasonal', label: 'Seasonal', emoji: '🎃' },
];

export const FARMS: Farm[] = [
  {
    id: 'green-meadow',
    name: 'Green Meadow Eggs',
    description: 'Free-range eggs from pasture-raised hens. Freshly collected daily.',
    address: '1452 Heritage Line, Peterborough, ON',
    lat: 44.31,
    lng: -78.29,
    phone: '(705) 555-0101',
    products: [
      { name: 'Brown Eggs (dozen)', category: 'eggs', available: true },
      { name: 'Duck Eggs (half dozen)', category: 'eggs', available: false },
    ],
    lastUpdated: minutesAgo(45),
    favorited: true,
    alertEnabled: false,
    imagePlaceholder: '🥚',
  },
  {
    id: 'kawartha-berry',
    name: 'Kawartha Berry Patch',
    description: 'Pick-your-own and pre-picked berries in season. Strawberries, raspberries, blueberries.',
    address: '892 County Rd 36, Kawartha Lakes, ON',
    lat: 44.42,
    lng: -78.73,
    phone: '(705) 555-0202',
    products: [
      { name: 'Strawberries (quart)', category: 'produce', available: true },
      { name: 'Raspberries (pint)', category: 'produce', available: true },
      { name: 'Blueberries (pint)', category: 'produce', available: false },
      { name: 'Berry Jam', category: 'seasonal', available: true },
    ],
    lastUpdated: hoursAgo(2),
    favorited: false,
    alertEnabled: false,
    imagePlaceholder: '🫐',
  },
  {
    id: 'maple-ridge',
    name: 'Maple Ridge Farms',
    description: 'Family-run sugar bush producing pure maple syrup, maple butter, and candy since 1982.',
    address: '210 Sugar Bush Lane, Peterborough, ON',
    lat: 44.35,
    lng: -78.35,
    phone: '(705) 555-0303',
    products: [
      { name: 'Maple Syrup (500ml)', category: 'maple', available: true },
      { name: 'Maple Butter', category: 'maple', available: true },
      { name: 'Maple Candy', category: 'maple', available: true },
      { name: 'Pancake Mix', category: 'seasonal', available: false },
    ],
    lastUpdated: daysAgo(3),
    favorited: true,
    alertEnabled: false,
    imagePlaceholder: '🍁',
  },
  {
    id: 'sunflower-homestead',
    name: 'Sunflower Homestead',
    description: 'Cut flowers, dried bouquets, and seasonal blooms from our pesticide-free fields.',
    address: '67 Bloomfield Rd, Kawartha Lakes, ON',
    lat: 44.38,
    lng: -78.65,
    phone: '(705) 555-0404',
    products: [
      { name: 'Mixed Bouquet', category: 'flowers', available: true },
      { name: 'Sunflowers (bunch)', category: 'flowers', available: true },
      { name: 'Dried Arrangement', category: 'flowers', available: true },
      { name: 'Pumpkins', category: 'seasonal', available: true },
    ],
    lastUpdated: hoursAgo(5),
    favorited: false,
    alertEnabled: false,
    imagePlaceholder: '🌻',
  },
  {
    id: 'lakeside-bakes',
    name: 'Lakeside Bakes',
    description: 'Artisan sourdough, pastries, and pies baked fresh Thursday through Sunday.',
    address: '412 Lakeshore Dr, Peterborough, ON',
    lat: 44.29,
    lng: -78.32,
    phone: '(705) 555-0505',
    products: [
      { name: 'Sourdough Loaf', category: 'baked-goods', available: false },
      { name: 'Butter Croissants (4pk)', category: 'baked-goods', available: false },
      { name: 'Apple Pie', category: 'baked-goods', available: false },
      { name: 'Cinnamon Buns', category: 'baked-goods', available: false },
    ],
    lastUpdated: daysAgo(1),
    favorited: false,
    alertEnabled: false,
    imagePlaceholder: '🥖',
  },
];

export function getAvailabilityState(farm: Farm): 'available' | 'sold-out' | 'stale' {
  const hoursSinceUpdate = (Date.now() - farm.lastUpdated.getTime()) / 3600000;
  if (hoursSinceUpdate > 48) return 'stale';
  if (farm.products.some((p) => p.available)) return 'available';
  return 'sold-out';
}

export function timeAgo(date: Date): string {
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
