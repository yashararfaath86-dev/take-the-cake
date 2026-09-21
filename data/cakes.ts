export interface CakeProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  basePrice: number; // For 0.5 kg
  rating: number;
  reviewsCount: number;
  badge?: string;
  isBestseller?: boolean;
  isEgglessAvailable: boolean;
  flavorNotes: string[];
  ingredients: string[];
  colorHex: string;
  accentHex: string;
  weightOptions: {
    weight: string;
    multiplier: number;
    serves: string;
  }[];
  heroImage: string;
}

export const SIGNATURE_CAKES: CakeProduct[] = [
  {
    id: 'exotic-raspberry-mousse',
    name: 'Exotic Raspberry Mousse',
    tagline: 'Valrhona White Chocolate & Wild Raspberry Coulis',
    description: 'Silky whipped white chocolate mousse layered over almond joconde sponge, filled with hand-simmered Nilgiris wild raspberry coulis and topped with ruby glaze.',
    basePrice: 850,
    rating: 4.95,
    reviewsCount: 342,
    badge: 'Chef Signature',
    isBestseller: true,
    isEgglessAvailable: true,
    flavorNotes: ['Wild Raspberry', 'Valrhona White Ganache', 'Almond Dacquoise'],
    ingredients: ['French Butter', 'Fresh Nilgiri Berries', '34% White Chocolate', 'Organic Madagascar Vanilla'],
    colorHex: '#DD3724',
    accentHex: '#FAD4D8',
    weightOptions: [
      { weight: '0.5 kg', multiplier: 1.0, serves: '4-5 people' },
      { weight: '1.0 kg', multiplier: 1.85, serves: '8-10 people' },
      { weight: '1.5 kg', multiplier: 2.7, serves: '12-14 people' },
      { weight: '2.0 kg', multiplier: 3.5, serves: '18-20 people' },
    ],
    heroImage: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'belgian-chocolate-truffle',
    name: 'Belgian Chocolate Truffle',
    tagline: '70% Callebaut Dark Ganache & Moist Fudge',
    description: 'An intensely decadent dark chocolate creation made with 70% single-origin Belgian Callebaut, infused with hazelnut praline crunch and encased in glossy mirror glaze.',
    basePrice: 750,
    rating: 4.98,
    reviewsCount: 520,
    badge: 'All-Time Favorite',
    isBestseller: true,
    isEgglessAvailable: true,
    flavorNotes: ['70% Dark Truffle', 'Piedmont Hazelnut', 'Espresso Bloom'],
    ingredients: ['Callebaut Dark Chocolate', 'Normandy Cream', 'Pure Cocoa Butter', 'Roasted Hazelnut Flakes'],
    colorHex: '#2A1713',
    accentHex: '#E5A338',
    weightOptions: [
      { weight: '0.5 kg', multiplier: 1.0, serves: '4-5 people' },
      { weight: '1.0 kg', multiplier: 1.85, serves: '8-10 people' },
      { weight: '1.5 kg', multiplier: 2.7, serves: '12-14 people' },
      { weight: '2.0 kg', multiplier: 3.5, serves: '18-20 people' },
    ],
    heroImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'classic-red-velvet-glaze',
    name: 'Classic Red Velvet Glaze',
    tagline: 'Philadelphia Cream Cheese & Crimson Sponge',
    description: 'Velvety crimson cocoa sponge with buttermilk softness, piped with tangy, authentic Philadelphia cream cheese frosting and dusted with delicate red velvet sponge crumble.',
    basePrice: 650,
    rating: 4.92,
    reviewsCount: 289,
    badge: 'Bestseller',
    isBestseller: true,
    isEgglessAvailable: true,
    flavorNotes: ['Tangy Cream Cheese', 'Velvet Buttermilk', 'Cocoa Undertones'],
    ingredients: ['Philadelphia Cream Cheese', 'Dutch Process Cocoa', 'Farm Fresh Buttermilk', 'Madagascar Vanilla'],
    colorHex: '#C02816',
    accentHex: '#FFF0ED',
    weightOptions: [
      { weight: '0.5 kg', multiplier: 1.0, serves: '4-5 people' },
      { weight: '1.0 kg', multiplier: 1.85, serves: '8-10 people' },
      { weight: '1.5 kg', multiplier: 2.7, serves: '12-14 people' },
      { weight: '2.0 kg', multiplier: 3.5, serves: '18-20 people' },
    ],
    heroImage: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'royal-rasamalai-saffron',
    name: 'Royal Rasamalai Saffron',
    tagline: 'Kashmiri Kesar Mousse & Spongy Chenna Dumplings',
    description: 'An artisanal fusion masterpiece celebrating South Indian celebratory flavors: cardamom infused vanilla sponge soaked in saffron anglo-cream, topped with pistachio slivers and edible 24k gold.',
    basePrice: 900,
    rating: 4.97,
    reviewsCount: 415,
    badge: 'Festive Special',
    isBestseller: false,
    isEgglessAvailable: true,
    flavorNotes: ['Kashmiri Saffron', 'Green Cardamom', 'Pistachio Crunch', 'Chenna Bites'],
    ingredients: ['Kashmir Mogra Saffron', 'Fresh Chenna Rasamalai', 'Pistachio Flakes', 'Cardamom Pods'],
    colorHex: '#F0A500',
    accentHex: '#FAF0D7',
    weightOptions: [
      { weight: '0.5 kg', multiplier: 1.0, serves: '4-5 people' },
      { weight: '1.0 kg', multiplier: 1.85, serves: '8-10 people' },
      { weight: '1.5 kg', multiplier: 2.7, serves: '12-14 people' },
      { weight: '2.0 kg', multiplier: 3.5, serves: '18-20 people' },
    ],
    heroImage: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'lotus-biscoff-caramel',
    name: 'Lotus Biscoff Salted Caramel',
    tagline: 'Spiced Speculoos Crunch & Fleur De Sel Buttercream',
    description: 'Layers of moist vanilla sponge folded with Belgian Speculoos biscuit crumble, filled with creamy Biscoff spread and finished with handcrafted salted caramel drippings.',
    basePrice: 800,
    rating: 4.91,
    reviewsCount: 230,
    badge: 'Trending',
    isBestseller: false,
    isEgglessAvailable: true,
    flavorNotes: ['Belgian Biscoff', 'Fleur de Sel Caramel', 'Crunchy Biscuit Crumbs'],
    ingredients: ['Lotus Speculoos', 'House Salted Caramel', 'French Cream Butter', 'Pure Vanilla'],
    colorHex: '#B86F28',
    accentHex: '#F5E7D8',
    weightOptions: [
      { weight: '0.5 kg', multiplier: 1.0, serves: '4-5 people' },
      { weight: '1.0 kg', multiplier: 1.85, serves: '8-10 people' },
      { weight: '1.5 kg', multiplier: 2.7, serves: '12-14 people' },
      { weight: '2.0 kg', multiplier: 3.5, serves: '18-20 people' },
    ],
    heroImage: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'passionfruit-mango-chiffon',
    name: 'Passionfruit Mango Chiffon',
    tagline: 'Alphonso Compote & Tropical Passion Curd',
    description: 'Featherlight Japanese chiffon sponge layered with tangy tropical passionfruit curd, sweet Ratnagiri Alphonso mango jelly, and white mascarpone clouds.',
    basePrice: 750,
    rating: 4.88,
    reviewsCount: 174,
    badge: 'Seasonal Harvest',
    isBestseller: false,
    isEgglessAvailable: true,
    flavorNotes: ['Alphonso Mango', 'Tart Passionfruit', 'Mascarpone Cream'],
    ingredients: ['Alphonso Mango Puree', 'Passionfruit Pulp', 'Italian Mascarpone', 'Organic Eggs / Eggless Chiffon'],
    colorHex: '#E27B12',
    accentHex: '#FDEFD6',
    weightOptions: [
      { weight: '0.5 kg', multiplier: 1.0, serves: '4-5 people' },
      { weight: '1.0 kg', multiplier: 1.85, serves: '8-10 people' },
      { weight: '1.5 kg', multiplier: 2.7, serves: '12-14 people' },
      { weight: '2.0 kg', multiplier: 3.5, serves: '18-20 people' },
    ],
    heroImage: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=900&q=80',
  },
];

export const COIMBATORE_LOCALITIES = [
  'RS Puram',
  'Race Course',
  'Peelamedu',
  'Gandhipuram',
  'Saravanampatti',
  'Ramanathapuram',
  'Saibaba Colony',
  'Singanallur',
  'Vadavalli',
  'Kovaipudur',
  'Kalapatti',
  'Town Hall',
  'Ukkadam',
  'Kuniyamuthur',
  'Ganapathy',
  'Thudiyalur',
];
