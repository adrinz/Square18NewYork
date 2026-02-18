// Product Data for Square18 New York
// Products are synced from our Etsy store: https://www.etsy.com/shop/square18newyork

export const ETSY_SHOP_URL = 'https://www.etsy.com/shop/square18newyork';

export const categories = [
  { id: 'all', name: 'All Products', slug: 'all' },
];

// Add your Etsy products here with the following format:
// {
//   id: 1,
//   name: 'Product Name',
//   price: 29.99,
//   originalPrice: null, // or original price if on sale
//   image: 'https://i.etsystatic.com/...', // Etsy image URL
//   freeShipping: true,
//   etsyUrl: 'https://www.etsy.com/listing/...', // Direct link to listing
// }

export const products = [
  // Products will be added here from your Etsy store
  // Please provide your Etsy product details to populate this list
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'Brooklyn, NY',
    rating: 5,
    text: 'Absolutely love the quality of products from Square18! The shipping was fast and everything arrived in perfect condition. Will definitely be ordering again.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'Michael R.',
    location: 'Manhattan, NY',
    rating: 5,
    text: 'Found exactly what I was looking for at great prices. The customer service team was incredibly helpful when I had questions about my order.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    name: 'Jennifer L.',
    location: 'Queens, NY',
    rating: 5,
    text: 'The curated selection is impressive. Every item I\'ve purchased has exceeded my expectations in quality. Square18 is now my go-to online store.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
];

export const stats = [
  { label: 'Products', value: '100+' },
  { label: 'Happy Customers', value: '10,000+' },
  { label: 'Brand Partners', value: '50+' },
  { label: 'Years of Excellence', value: '4+' },
];

export const features = [
  {
    title: 'Curated Selection',
    description: 'Hand-picked products from trusted brands and suppliers, ensuring quality in every purchase.',
    icon: 'CheckCircle',
  },
  {
    title: 'Fast Shipping',
    description: 'Quick and reliable delivery across the nation with real-time tracking on all orders.',
    icon: 'Truck',
  },
  {
    title: 'Secure Shopping',
    description: 'Your data is protected with industry-leading security measures and encrypted transactions.',
    icon: 'Shield',
  },
  {
    title: 'Easy Returns',
    description: '30-day hassle-free return policy. Not satisfied? We\'ll make it right.',
    icon: 'RefreshCw',
  },
];
