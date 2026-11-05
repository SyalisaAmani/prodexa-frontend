const API_URL = 'https://dummyjson.com/products?limit=0';

// Get all product
export async function getAllProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Gagal mengambil data produk');
  }

  const data = await response.json();

  if (
  !Array.isArray(data.products) ||
  !data.products.every(
    (product) =>
      product &&
      typeof product.id === 'number' &&
      typeof product.title === 'string' &&
      typeof product.description === 'string' &&
      typeof product.price === 'number' &&
      typeof product.thumbnail === 'string' &&
      typeof product.category === 'string' &&
      typeof product.rating === 'number' &&
      typeof product.stock === 'number' &&
      Array.isArray(product.images)
  )
) {
  throw new Error('Data produk tidak valid');
}

  return data.products;
}

// Get detail product
export async function getProductById(id) {
  const response = await fetch(
  `https://dummyjson.com/products/${id}`
);

  if (!response.ok) {
    throw new Error('Gagal mengambil detail produk');
  }

  const product = await response.json();

  if (
    !product ||
    typeof product.id !== 'number' ||
    typeof product.title !== 'string' ||
    typeof product.description !== 'string' ||
    typeof product.price !== 'number' ||
    typeof product.thumbnail !== 'string' ||
    typeof product.category !== 'string' ||
    typeof product.rating !== 'number' ||
    typeof product.stock !== 'number' ||
    !Array.isArray(product.images)
  ) {
    throw new Error('Data detail produk tidak valid');
  }

  return product;
}