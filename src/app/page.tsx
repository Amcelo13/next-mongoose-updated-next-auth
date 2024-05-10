
export default async function Home() {

  const fetchProducts = async () => {
     const res = await fetch("http://localhost:3000/api/products")
     const data = await res.json()
     return data
  }

  const ProductsArray  = await fetchProducts()   

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {ProductsArray.map((product:any) => (
          <div key={product._id} className="bg-gray-200 p-4 rounded-lg">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
