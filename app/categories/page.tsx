import Link from "next/link";
import { Layers3 } from "lucide-react";
import { getCategories } from "@/lib/category.service";
import Image from "next/image";

export default async function CategoriesPage() {
  const data = await getCategories();

  const categories = data?.data ?? [];

  return (
    <main className="min-h-screen bg-gray-50/50">

      {/* Hero */}
      <section className="bg-linear-to-br from-emerald-600 via-emerald-500 to-emerald-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              Home
            </Link>

            <span>/</span>

            <span className="text-white">
              Categories
            </span>
          </nav>

          {/* Title */}
          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <Layers3 size={34} />
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                All Categories
              </h1>

              <p className="text-white/80 mt-1">
                Browse our wide range of product categories
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-10">

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">

          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="
                group
                bg-white
                rounded-2xl
                border
                border-gray-100
                p-4
                sm:p-6
                text-center
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >

              {/* Category Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">

              <Image
  src={category.image}
  alt={category.name}
  fill
  unoptimized
  className="
    object-cover
    transition-transform
    duration-300
    group-hover:scale-105
  "
/>
              </div>

              {/* Category Name */}
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                {category.name}
              </h2>

              {/* View Category */}
              <p className="text-sm text-emerald-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                View Category →
              </p>

            </Link>
          ))}

        </div>

      </section>

    </main>
  );
}