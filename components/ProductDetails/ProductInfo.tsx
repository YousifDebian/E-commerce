import Link from "next/link";
import {
  Star,
} from "lucide-react";

import ProductActions from "./ProductActions";
import { Product } from "@/types/product";

type ProductInfoProps = {
  product: Product;
};

export default function ProductInfo({
  product,
}: ProductInfoProps) {
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
    <div className="lg:w-2/3">
      <div className="bg-white rounded-xl shadow-sm p-6">

        {/* Category + Brand */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Link
            href={`/categories/${product.category?._id}`}
            className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-full hover:bg-emerald-100 transition"
          >
            {product.category?.name}
          </Link>

          {product.brand?.name && (
            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
              {product.brand.name}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
          {product.title}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={20}
                fill={
                  index < Math.round(product.ratingsAverage)
                    ? "currentColor"
                    : "none"
                }
              />
            ))}
          </div>

          <span className="text-sm text-gray-600">
            {product.ratingsAverage} ({product.ratingsQuantity} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center flex-wrap gap-3 mb-6">
          {hasDiscount ? (
            <>
              <span className="text-3xl font-bold text-emerald-600">
                {product.priceAfterDiscount} EGP
              </span>

              <span className="text-lg text-gray-400 line-through">
                {product.price} EGP
              </span>

              <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                Save {discount}%
              </span>
            </>
          ) : (
            <span className="text-3xl font-bold text-gray-900">
              {product.price} EGP
            </span>
          )}
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2 mb-6">
          <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            In Stock
          </span>
        </div>

        {/* Description */}
        <div className="border-t border-gray-100 pt-5 mb-6">
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>


<ProductActions
  price={
    hasDiscount
      ? product.priceAfterDiscount!
      : product.price
  }
  quantityAvailable={product.quantity}
/>
       

      </div>
    </div>
  );
}

