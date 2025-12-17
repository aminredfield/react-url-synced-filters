import { Product } from '../../entities/product/model/types';

const categories = [
  'Electronics',
  'Clothing',
  'Books',
  'Home',
  'Beauty',
  'Sports',
  'Toys',
  'Grocery',
];

/**
 * Генерирует детерминированный список продуктов.
 * Используется как fallback когда API недоступен.
 */
function generateProducts(count = 200): Product[] {
  const items: Product[] = [];
  for (let i = 1; i <= count; i++) {
    const category = categories[(i - 1) % categories.length];
    const price = 5 + ((i - 1) % 50) * 2;
    const rating = ((i - 1) % 5) + 1;
    const inStock = i % 4 !== 0;
    items.push({
      id: i,
      title: `${category} Product ${i}`,
      price,
      category,
      inStock,
      rating,
    });
  }
  return items;
}

export const products: Product[] = generateProducts();
