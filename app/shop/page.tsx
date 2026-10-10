import Link from "next/link";
import { PackageOpen } from "lucide-react";
import FeaturedProducts from "@/components/Home/FeaturedProducts";


export default async function ShopPage() {


  return (
    <main>

      {/* Shop Header */}
      <section className="bg-linear-to-br from-[#16A34A] via-[#22C55E] to-[#4ADE80] text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">

            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              Home
            </Link>

            <span className="text-white/40">/</span>

            <span className="text-white font-medium">
              All Products
            </span>

          </nav>

          {/* Title */}
          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <PackageOpen size={32} />
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                All Products
              </h1>

              <p className="text-white/80 mt-1">
                Explore our complete product collection
              </p>
            </div>

          </div>

        </div>
      </section>

      <FeaturedProducts />

    
    </main>
  );
}