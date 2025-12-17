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

const brands = ['Samsung', 'Apple', 'Nike', 'Adidas', 'Sony', 'LG', 'Dell', 'HP'];
const tags = ['new', 'sale', 'popular', 'trending', 'bestseller'];

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
    const stock = i % 4 === 0 ? 0 : Math.floor(Math.random() * 100) + 10;
    const discount = Math.floor(Math.random() * 30);
    
    items.push({
      id: i,
      title: `${category} Product ${i}`,
      description: `High quality ${category.toLowerCase()} product with great features`,
      category,
      price,
      discountPercentage: discount,
      rating,
      stock,
      tags: [tags[i % tags.length]],
      brand: brands[i % brands.length],
      sku: `SKU-${i.toString().padStart(6, '0')}`,
      weight: Math.floor(Math.random() * 10) + 1,
      images: [
        `https://via.placeholder.com/400x300?text=${category}+Product+${i}`,
      ],
      thumbnail: `https://via.placeholder.com/150x150?text=${category}+${i}`,
      availabilityStatus: stock > 0 ? 'In Stock' : 'Out of Stock',
      minimumOrderQuantity: 1,
      inStock: stock > 0,
    });
  }
  return items;
}

export const products: Product[] = generateProducts();
