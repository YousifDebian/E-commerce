"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type { Product } from "@/types/product";

type ProductGalleryProps = {
  product: Product;
};

export default function ProductGallery({
  product,
}: ProductGalleryProps) {
  const images = [
    product.imageCover,
    ...(product.images || []),
  ].filter(Boolean);

  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="lg:w-1/3">
      <div className="bg-white rounded-xl shadow-sm  sticky top-4">

        {/* Main Image */}
        <div className="relative h-100 flex items-center justify-center">
          <Image
            src={activeImage}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>

        {/* Thumbnails */}
        <Swiper
          slidesPerView={4.3}
          spaceBetween={10}
          className="mt-4"
        >
          {images.map((image: string, index: number) => (
            <SwiperSlide key={index}>
              <button
                type="button"
                onClick={() => setActiveImage(image)}
                className={`relative w-full h-20 rounded-lg border-2 overflow-hidden ${
                  activeImage === image
                    ? "border-blue-600"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
}