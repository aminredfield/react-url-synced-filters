import { Product } from '../../entities/product/model/types';
import { products as localProducts } from '../mock/products';

/**
 * Пытается загрузить продукты из публичного API.
 * При ошибке возвращает локальные mock данные.
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
        description: p.description || '',
        category: p.category,
        price: Number(p.price),
        discountPercentage: Number(p.discountPercentage) || 0,
        rating: typeof p.rating === 'number' ? Math.min(5, Math.max(0, p.rating)) : 0,
        stock: Number(p.stock) || 0,
        tags: Array.isArray(p.tags) ? p.tags : [],
        brand: p.brand || undefined,
        sku: p.sku || '',
        weight: Number(p.weight) || 0,
        images: Array.isArray(p.images) ? p.images : [],
        thumbnail: p.thumbnail || '',
        availabilityStatus: p.availabilityStatus || 'Unknown',
        minimumOrderQuantity: Number(p.minimumOrderQuantity) || 1,
        inStock: typeof p.stock === 'number' ? p.stock > 0 : true,
      }));
      return apiProducts;
    }
    throw new Error('Unexpected response shape');
  } catch (e) {
    // При любой ошибке возвращаем локальные данные
    return localProducts;
  }
}
