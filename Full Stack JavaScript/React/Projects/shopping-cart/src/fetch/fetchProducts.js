export default async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return [];
  }
}
