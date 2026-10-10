"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, RefreshCw, Eye, Plus, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { Product } from "@/types/product";


type SimilarProductsProps = {
  products: Product[];
  currentProductId: string;
};

export default function SimilarProducts({
  products,
  currentProductId,
}: SimilarProductsProps) {
  const similarProducts = products
    .filter((product) => product._id !== currentProductId)
    .slice(0, 8);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          <div className="flex items-center gap-3">
            <div className="w-1.5 h-7 bg-emerald-600 rounded-full" />

            <h2 className="text-xl font-bold text-gray-800">
              You May Also{" "}
              <span className="text-emerald-600">
                Like
              </span>
            </h2>
          </div>

          {/* Slider Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              className="similar-prev w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-emerald-100 hover:text-emerald-600 transition"
            >
              ‹
            </button>

            <button
              type="button"
              className="similar-next w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-emerald-100 hover:text-emerald-600 transition"
            >
              ›
            </button>
          </div>

        </div>

        {/* Products */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".similar-prev",
            nextEl: ".similar-next",
          }}
          spaceBetween={12}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
          className="pb-2"
        >
          {similarProducts.map((product) => {
            const hasDiscount =
              product.priceAfterDiscount !== undefined &&
              product.priceAfterDiscount < product.price;

            const discount = hasDiscount
              ? Math.round(
                  ((product.price - product.priceAfterDiscount!) /
                    product.price) *
                    100
                )
              : 0;

            return (
              <SwiperSlide key={product._id}>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">

                  {/* Image */}
                  <div className="relative">

                    {/* Discount */}
                    {hasDiscount && (
                      <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                        -{discount}%
                      </span>
                    )}

                    <div className="relative h-44 bg-white">
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2">

                      <button
                        type="button"
                        title="Add to wishlist"
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-gray-600 hover:text-red-500 transition"
                      >
                        <Heart size={17} strokeWidth={2} />
                      </button>

                      <button
                        type="button"
                        title="Compare"
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-gray-600 hover:text-emerald-600 transition"
                      >
                        <RefreshCw size={17} strokeWidth={2} />
                      </button>

                      <Link
                        href={`/products/${product._id}`}
                        title="View product"
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-gray-600 hover:text-emerald-600 transition"
                      >
                        <Eye size={17} strokeWidth={2} />
                      </Link>

                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3">

                    {/* Category */}
                    <p className="text-[10px] text-gray-500 mb-1">
                      {product.category?.name}
                    </p>

                    {/* Title */}
                    <h3
                      className="text-sm font-medium text-gray-900 line-clamp-2 min-h-10"
                      title={product.title}
                    >
                      <Link href={`/products/${product._id}`}>
                        {product.title}
                      </Link>
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center mt-2 mb-2">

                      <div className="flex items-center text-yellow-400 mr-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            size={14}
                            strokeWidth={2}
                            fill={
                              index <
                              Math.round(product.ratingsAverage)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        ))}
                      </div>

                      <span className="text-[10px] text-gray-500">
                        {product.ratingsAverage} (
                        {product.ratingsQuantity})
                      </span>

                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-1">

                        {hasDiscount ? (
                          <>
                            <span className="text-sm font-bold text-emerald-600">
                              {product.priceAfterDiscount} EGP
                            </span>

                            <span className="text-[10px] text-gray-500 line-through">
                              {product.price} EGP
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-bold text-gray-900">
                            {product.price} EGP
                          </span>
                        )}

                      </div>

                      <button
                        type="button"
                        className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition"
                      >
                        <Plus size={18} />
                      </button>

                    </div>

                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

      </div>
    </section>
  );
}