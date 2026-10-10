import Link from "next/link";
import Image from "next/image";


export default function PromoBanners() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Deal of the Day */}
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 p-8 text-white">

            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                <span>🔥</span>
                <span>Deal of the Day</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Fresh Organic Fruits
              </h3>

              {/* Description */}
              <p className="text-white/80 mb-4">
                Get up to 40% off on selected organic fruits
              </p>

              {/* Discount */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-bold">
                  40% OFF
                </div>

                <div className="text-sm text-white/70">
                  Use code:{" "}
                  <span className="font-bold text-white">
                    ORGANIC40
                  </span>
                </div>
              </div>

              {/* Button */}
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Now

                <Image
              src="/img/arrow-right.svg"
              alt="Arrow Right"
              width={16}
              height={16}
              className="w-4 h-4 ml-2"
              
            >
            </Image>
              </Link>

            </div>
          </div>


          {/* New Arrivals */}
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-orange-400 to-rose-500 p-8 text-white">

            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                <span>✨</span>
                <span>New Arrivals</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Exotic Vegetables
              </h3>

              {/* Description */}
              <p className="text-white/80 mb-4">
                Discover our latest collection of premium vegetables
              </p>

              {/* Discount */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-bold">
                  25% OFF
                </div>

                <div className="text-sm text-white/70">
                  Use code:{" "}
                  <span className="font-bold text-white">
                    FRESH25
                  </span>
                </div>
              </div>

              {/* Button */}
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Now

                <Image
              src="/img/arrow-right r.svg"
              alt="Arrow Right"
              width={16}
              height={16}
              className="w-4 h-4 ml-2"
              
            >
            </Image>
              </Link>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}