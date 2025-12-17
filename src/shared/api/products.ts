import { Product } from '../../entities/product/model/types';
import { products as localProducts } from '../mock/products';

/**
 * Attempts to fetch products from a public API. If the request fails or
 * returns unexpected data, the local mock data set is returned instead.
 *
 * This function does not require any API keys or secrets and therefore
 * remains safe to include in a public repository.
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch('https://dummyjson.com/products?limit=100');
    if (!res.ok) throw new Error('Failed to fetch remote products');
    const data = await res.json();
    if (Array.isArray(data.products)) {
      const apiProducts: Product[] = data.products.map((p: any) => ({
        id: p.id,
        title: p.title,
        price: Number(p.price),
        category: p.category,
        inStock: typeof p.stock === 'number' ? p.stock > 0 : true,
        rating:
          typeof p.rating === 'number'
            ? Math.min(5, Math.max(0, p.rating))
            : 0,
      }));
      return apiProducts;
    }
    throw new Error('Unexpected response shape');
  } catch (e) {
    // If any error occurs (network, unexpected format), return local data.
    return localProducts;
  }
}