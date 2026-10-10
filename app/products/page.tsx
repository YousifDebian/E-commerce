import Link from "next/link";
import { getProductsByBrand } from "@/lib/product.service";
import { getBrandById } from "@/lib/brand.service";
import ProductCard from "@/components/Products/ProductCard";

type ProductsPageProps = {
  searchParams: Promise<{
    brand?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const brandId = params.brand;

  if (!brandId) {
    return (
      <main className="min-h-screen bg-gray-50/50">
        <section className="container mx-auto px-4 py-20">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Products
          </h1>

          <p className="text-gray-500 text-center mt-3">
            Please select a brand first.
          </p>
        </section>
      </main>
    );
  }

  const [brandData, productsData] = await Promise.all([
    getBrandById(brandId),
    getProductsByBrand(brandId),
  ]);

  const brand = brandData.data;
  const products = productsData.data;

  return (
    <main className="min-h-screen bg-gray-50/50">

      {/* Hero */}
      <section className="bg-linear-to-br from-violet-600 via-violet-500 to-purple-400 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              Home
            </Link>

            <span className="text-white/40">/</span>

            <Link
              href="/brands"
              className="hover:text-white transition-colors"
            >
              Brands
            </Link>

            <span className="text-white/40">/</span>

            <span className="text-white font-medium">
              {brand.name}
            </span>
          </nav>

          {/* Brand Title */}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {brand.name}
          </h1>

          <p className="text-white/80 mt-2">
            Products from {brand.name}
          </p>

        </div>
      </section>

      {/* Products */}
      <section className="container mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {brand.name} Products
            </h2>

            <p className="text-gray-500 mt-1">
              {products.length} products
            </p>
          </div>

          <Link
            href="/brands"
            className="text-violet-600 hover:text-violet-700 font-medium transition-colors"
          >
            ← All Brands
          </Link>

        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-500">
              No products found for this brand.
            </p>
          </div>
        )}

      </section>

    </main>
  );
}