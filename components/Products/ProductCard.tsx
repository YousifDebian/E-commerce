"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Heart,
  RefreshCw,
  Eye,
  Star,
  Check,
  LoaderCircle,
} from "lucide-react";

import type { Product } from "@/types/product";
import { addToCart } from "@/lib/cart.service";
import { useWishlist } from "@/components/Wishlist/WishlistProvider";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");
  const {
  toggleWishlist,
  isInWishlist,
} = useWishlist();
const wishlisted = isInWishlist(product._id);

  const hasDiscount =
    product.priceAfterDiscount !== undefined &&
    product.priceAfterDiscount < product.price;

  const discount = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100
      )
    : 0;

  async function handleAddToCart() {
    try {
      setAdding(true);
      setError("");

      await addToCart(product._id);

      setAdded(true);

      setTimeout(() => {
        setAdded(false);
      }, 2000);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to add product to cart"
      );
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-2 transition duration-300">
      {/* Image Section */}
      <div className="relative">
        {/* Discount */}
        {hasDiscount && (
          <span className="absolute top-4 left-4 z-10 bg-red-500 text-white text-sm font-sans px-2 py-0.5 rounded">
            -{discount}%
          </span>
        )}

        <Image
          src={product.imageCover}
          alt={product.title}
          width={300}
          height={300}
          className="w-full h-64 object-contain bg-white"
        />

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {/* Wishlist */}
         <button
  type="button"
  title={
    wishlisted
      ? "Remove from wishlist"
      : "Add to wishlist"
  }
  onClick={async () => {
    try {
      await toggleWishlist(product._id);
    } catch (error) {
      console.error(error);
    }
  }}
  className={`w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 transition ${
    wishlisted
      ? "text-red-500"
      : "text-gray-600 hover:text-red-500"
  }`}
>
  <Heart
    size={20}
    strokeWidth={1.8}
    fill={wishlisted ? "currentColor" : "none"}
  />
</button>

          {/* Compare */}
          <button
            type="button"
            title="Compare"
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-gray-600 hover:text-emerald-600 transition"
          >
            <RefreshCw size={20} strokeWidth={2} />
          </button>

          {/* View */}
          <Link
            href={`/products/${product._id}`}
            title="View product"
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-gray-600 hover:text-emerald-600 transition"
          >
            <Eye size={20} strokeWidth={2} />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3">
        {/* Category */}
        <div className="text-sm text-gray-500">
          {product.category?.name}
        </div>

        {/* Title */}
        <h3
          className="text-lg font-medium text-gray-900 line-clamp-2 min-h-14"
          title={product.title}
        >
          <Link href={`/products/${product._id}`}>
            {product.title}
          </Link>
        </h3>

        {/* Rating */}
        <div className="flex items-center">
          <div className="flex text-yellow-400 text-xl mr-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={18}
                strokeWidth={2}
                fill={
                  index < Math.round(product.ratingsAverage)
                    ? "currentColor"
                    : "none"
                }
              />
            ))}
          </div>

          <span className="text-sm text-gray-500">
            {product.ratingsAverage} ({product.ratingsQuantity})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="text-xl font-bold text-emerald-600">
                  {product.priceAfterDiscount} EGP
                </span>

                <span className="text-sm text-gray-500 line-through">
                  {product.price} EGP
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                {product.price} EGP
              </span>
            )}
          </div>

          {/* Add To Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={adding || added}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-emerald-600 text-white hover:bg-emerald-700 transition text-2xl disabled:cursor-not-allowed disabled:opacity-80"
          >
            {adding ? (
              <LoaderCircle
                size={22}
                className="animate-spin"
              />
            ) : added ? (
              <Check size={24} />
            ) : (
              "+"
            )}
          </button>
        </div>

        {/* Success Message */}
        {added && (
          <p className="text-sm text-emerald-600 font-medium text-right mt-2">
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-xs text-red-500 text-right mt-2">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}