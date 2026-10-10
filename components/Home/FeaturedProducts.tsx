import { getProducts } from "@/lib/product.service";
import ProductCard from "@/components/Products/ProductCard";

export default async function FeaturedProducts() {
  const data = await getProducts();

  if (!data || !data.data) {
    return (
      <section className="py-10">
        <div className="container mx-auto px-4">
          <p className="text-center text-red-500">
            Failed to load products
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">

        {/* Title */}
        <div className="flex items-center gap-3 my-10">
          <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />

          <h2 className="text-3xl font-bold text-gray-800">
            Featured
            <span className="text-emerald-600">Products</span>
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data.data.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
}