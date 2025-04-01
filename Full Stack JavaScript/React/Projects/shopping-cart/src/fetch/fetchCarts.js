export default async function fetchCarts() {
    try {
        const response = await fetch('https://fakestoreapi.com/carts');
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        console.log(data);
        return data;
      } catch (err) {
        console.error(`Error: ${err.message}`);
        return [];
      }
}
