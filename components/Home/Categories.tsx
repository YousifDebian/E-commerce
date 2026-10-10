import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/category.service";

export default async function Categories() {
  const data = await getCategories();

  console.log("CATEGORIES DATA:", data);

  return (
    <section id="categories" className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
          <div className="flex items-center gap-3 my-8">
            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Shop By <span className="text-emerald-600">Category</span>
            </h2>
          </div>

          <Link
            href="/categories"
            className="text-emerald-600 self-end sm:self-auto hover:text-emerald-700 font-medium"
          >
            View All Categories
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.data.map(
            (category: { _id: string; name: string; image: string }) => (
              <Link
                key={category._id}
                href={`/categories/${category._id}`}
                className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition group"
              >
                <div className="h-20 w-20 overflow-hidden bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-100 transition">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-medium text-gray-800">{category.name}</h3>
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
