import { ProductInput } from "../validators/product";

export const productsToSeed: ProductInput[] = [
  {
    name: "Surprise Mystery Box",
    slug: "surprise-mystery-box",
    category: "Mystery Gifts",
    description:
      "A box filled with a surprise assortment of items, handpicked to thrill and delight!",
    isPublished: true,
    countInStock: 50,
    tags: ["surprise", "gift", "mystery"],
    avgRaring: 4.7,
    numReviews: 120,
    reviews: [],
    numSeles: 200,
    price: 2999, // Price stored as integer (in cents, so $29.99)
  },
  {
    name: "Gourmet Chocolate Surprise",
    slug: "gourmet-chocolate-surprise",
    category: "Edible Gifts",
    description:
      "A selection of high-end gourmet chocolates, wrapped in a mystery box for an extra special touch.",
    isPublished: true,
    countInStock: 30,
    tags: ["chocolate", "gourmet", "sweet", "mystery"],
    avgRaring: 4.9,
    numReviews: 85,
    reviews: [],
    numSeles: 150,
    price: 4999, // Price stored as integer (in cents, so $49.99)
  },
  {
    name: "Mystery Jewelry Box",
    slug: "mystery-jewelry-box",
    category: "Jewelry",
    description:
      "A beautifully wrapped box containing a random piece of high-quality jewelry. A perfect gift for any occasion!",
    isPublished: true,
    countInStock: 40,
    tags: ["jewelry", "gift", "mystery", "luxury"],
    avgRaring: 4.5,
    numReviews: 60,
    reviews: [],
    numSeles: 120,
    price: 7999, // Price stored as integer (in cents, so $79.99)
  },
  {
    name: "The Adventure Kit",
    slug: "adventure-kit",
    category: "Outdoor & Adventure",
    description:
      "An exciting gift box for the adventurous soul, containing gear and surprises for your next outdoor expedition.",
    isPublished: true,
    countInStock: 25,
    tags: ["outdoor", "adventure", "mystery"],
    avgRaring: 4.6,
    numReviews: 70,
    reviews: [],
    numSeles: 90,
    price: 5999, // Price stored as integer (in cents, so $59.99)
  },
  {
    name: "Tech Mystery Gift",
    slug: "tech-mystery-gift",
    category: "Tech Gifts",
    description:
      "A gadget lover’s dream – a box filled with tech accessories and devices, all chosen at random!",
    isPublished: true,
    countInStock: 60,
    tags: ["tech", "gadgets", "mystery"],
    avgRaring: 4.8,
    numReviews: 150,
    reviews: [],
    numSeles: 250,
    price: 9999, // Price stored as integer (in cents, so $99.99)
  },
  {
    name: "Luxury Spa Mystery Set",
    slug: "luxury-spa-mystery-set",
    category: "Beauty & Wellness",
    description:
      "A pampering mystery box filled with luxurious spa products to help you unwind and relax.",
    isPublished: true,
    countInStock: 35,
    tags: ["spa", "wellness", "luxury", "mystery"],
    avgRaring: 4.7,
    numReviews: 55,
    reviews: [],
    numSeles: 110,
    price: 6999, // Price stored as integer (in cents, so $69.99)
  },
  {
    name: "Kids' Mystery Toy Box",
    slug: "kids-mystery-toy-box",
    category: "Toys & Games",
    description:
      "A mystery box filled with fun and engaging toys that children will love!",
    isPublished: true,
    countInStock: 75,
    tags: ["kids", "toys", "mystery"],
    avgRaring: 4.4,
    numReviews: 110,
    reviews: [],
    numSeles: 180,
    price: 2499, // Price stored as integer (in cents, so $24.99)
  },
  {
    name: "Luxury Candle Mystery Box",
    slug: "luxury-candle-mystery-box",
    category: "Home Decor",
    description:
      "A curated selection of luxury candles in a beautifully packaged mystery box.",
    isPublished: true,
    countInStock: 45,
    tags: ["candles", "luxury", "home", "mystery"],
    avgRaring: 4.6,
    numReviews: 95,
    reviews: [],
    numSeles: 140,
    price: 3999, // Price stored as integer (in cents, so $39.99)
  },
  {
    name: "Vintage Collectibles Mystery Box",
    slug: "vintage-collectibles-mystery-box",
    category: "Collectibles",
    description:
      "A treasure trove of vintage items, carefully selected for collectors.",
    isPublished: true,
    countInStock: 20,
    tags: ["vintage", "collectibles", "mystery"],
    avgRaring: 4.8,
    numReviews: 50,
    reviews: [],
    numSeles: 80,
    price: 14999, // Price stored as integer (in cents, so $149.99)
  },
  {
    name: "Personalized Mystery Gift",
    slug: "personalized-mystery-gift",
    category: "Custom Gifts",
    description:
      "A personalized gift box with items customized for the recipient. A truly one-of-a-kind surprise!",
    isPublished: true,
    countInStock: 25,
    tags: ["personalized", "custom", "gift", "mystery"],
    avgRaring: 4.9,
    numReviews: 120,
    reviews: [],
    numSeles: 210,
    price: 7999, // Price stored as integer (in cents, so $79.99)
  },
];
