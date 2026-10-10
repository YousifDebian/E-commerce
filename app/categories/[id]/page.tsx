import Link from "next/link";
import { getCategoryById } from "@/lib/category.service";
import { getProductsByCategory } from "@/lib/product.service";
import ProductCard from "@/components/Products/ProductCard";
import Image from "next/image";

type CategoryPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;

  const [categoryData, productsData] = await Promise.all([
    getCategoryById(id),
    getProductsByCategory(id),
  ]);

  const category = categoryData.data;
  const products = productsData.data;

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Hero */}
      <section className="bg-linear-to-br from-emerald-600 via-emerald-500 to-emerald-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>

            <span className="text-white/40">/</span>

            <Link
              href="/categories"
              className="hover:text-white transition-colors"
            >
              Categories
            </Link>

            <span className="text-white/40">/</span>

            <span className="text-white font-medium">{category.name}</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <Image
                src={category.image}
                alt={category.name}
                width={40}
                height={40}
                unoptimized
                className="w-10 h-10 object-contain"
              />
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {category.name}
              </h1>

              <p className="text-white/80 mt-1">
                Browse products in {category.name}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="container mx-auto px-4 py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {category.name} Products
          </h2>

          <p className="text-gray-500 mt-1">{products.length} products</p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-20">
            No products found in this category.
          </p>
        )}
      </section>
    </main>
  );
}
