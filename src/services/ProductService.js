const API_URL = 'https://dummyjson.com/products?limit=0';

export async function getProducts() {
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
      typeof product.thumbnail === 'string'
  )
) {
  throw new Error('Data produk tidak valid');
}

  return data.products;
}