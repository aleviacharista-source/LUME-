import { PRODUCTS } from '../data/products';
import { Product, FilterState, OrderConfirmation, OrderInfo, CartItem } from '../types/product';
import { generateOrderNumber } from '../utils/formatters';

export const productService = {
  // Retrieve all products with optional delay simulation for testing
  async getProducts(): Promise<Product[]> {
    return Promise.resolve([...PRODUCTS]);
  },

  // Retrieve single product by id
  async getProductById(id: string): Promise<Product | undefined> {
    const product = PRODUCTS.find((p) => p.id === id);
    return Promise.resolve(product);
  },

  // Search products by name, description, or category
  async searchProducts(query: string): Promise<Product[]> {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return Promise.resolve(
      PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.subCategory?.toLowerCase().includes(q) ||
          p.finish?.toLowerCase().includes(q)
      )
    );
  },

  // Filter and sort products
  async filterProducts(filters: FilterState): Promise<Product[]> {
    let result = [...PRODUCTS];

    if (filters.category.length > 0) {
      result = result.filter((p) =>
        filters.category.some((c) => c.toLowerCase() === p.category.toLowerCase())
      );
    }

    if (filters.priceRange.length > 0) {
      result = result.filter((p) => {
        return filters.priceRange.some((range) => {
          if (range === 'under-100k') return p.price < 100000;
          if (range === '100k-250k') return p.price >= 100000 && p.price <= 250000;
          if (range === 'above-250k') return p.price > 250000;
          return true;
        });
      });
    }

    if (filters.finish.length > 0) {
      result = result.filter((p) => p.finish && filters.finish.includes(p.finish));
    }

    if (filters.shade.length > 0) {
      result = result.filter((p) => p.shadeFamily && filters.shade.includes(p.shadeFamily));
    }

    switch (filters.sortBy) {
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'recommended':
      default:
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
    }

    return Promise.resolve(result);
  },

  // Simulate order creation
  async createOrder(orderInfo: OrderInfo, items: CartItem[], shippingFee: number): Promise<OrderConfirmation> {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const total = subtotal + shippingFee;
    const confirmation: OrderConfirmation = {
      ...orderInfo,
      orderNumber: generateOrderNumber(),
      items,
      subtotal,
      shippingFee,
      total,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
    return Promise.resolve(confirmation);
  },

  // Future BEAUTY AI Assistant Architecture
  async getBeautyAiRecommendations(userQuery: string): Promise<{
    message: string;
    recommendedProducts: Product[];
  }> {
    const q = userQuery.toLowerCase();
    let matches: Product[] = [];

    if (q.includes('natural') || q.includes('everyday')) {
      matches = PRODUCTS.filter((p) =>
        ['lume-skin-tint', 'lume-cloud-blush', 'lume-glass-lip'].includes(p.id)
      );
    } else if (q.includes('glow') || q.includes('hydration') || q.includes('glass skin')) {
      matches = PRODUCTS.filter((p) =>
        ['lume-glow-serum', 'lume-radiance-cream', 'lume-skin-mist'].includes(p.id)
      );
    } else if (q.includes('glam') || q.includes('night') || q.includes('evening') || q.includes('bold')) {
      matches = PRODUCTS.filter((p) =>
        ['lume-velvet-lip', 'lume-nude-palette', 'lume-lash-volume'].includes(p.id)
      );
    } else {
      matches = PRODUCTS.slice(0, 3);
    }

    return Promise.resolve({
      message: `Curated for your request: "${userQuery}". Here is the recommended LUMÉ routine designed to harmonize with your skin.`,
      recommendedProducts: matches,
    });
  },
};
