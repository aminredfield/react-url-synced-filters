import { Product } from '../../entities/product/model/types';

// List of categories used in the mock data set. These values are also
// referenced by the filters UI and query normalisation to ensure
// consistency.
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
 * Generates a deterministic list of products. Using deterministic formulas
 * for price, rating and stock means the data set is reproducible while
 * still appearing varied. There are 200 products by default, enough to
 * exercise pagination or large lists if needed.
 */
function generateProducts(count = 200): Product[] {
  const items: Product[] = [];
  for (let i = 1; i <= count; i++) {
    const category = categories[(i - 1) % categories.length];
    // Price cycles through a range between 5 and ~103 in increments of 2
    const price = 5 + ((i - 1) % 50) * 2;
    // Rating cycles through 1..5
    const rating = ((i - 1) % 5) + 1;
    // Roughly three quarters of products are in stock
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

/**
 * The local list of products used when no remote API is available. This
 * export is consumed by the API layer as a fallback as well as directly
 * imported in tests.
 */
export const products: Product[] = generateProducts();