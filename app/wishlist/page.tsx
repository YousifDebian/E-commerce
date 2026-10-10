"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  LoaderCircle,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import type { Product } from "@/types/product";
import {
  getWishlist,
  removeFromWishlist,
} from "@/lib/wishlist.service";

import { addToCart } from "@/lib/cart.service";
import { useWishlist } from "@/components/Wishlist/WishlistProvider";

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [removingId, setRemovingId] = useState<string | null>(
    null
  );

  const [addingId, setAddingId] = useState<string | null>(
    null
  );

  const { wishlistCount } = useWishlist();

  useEffect(() => {
    async function loadWishlist() {
      try {
        setLoading(true);
        setError("");

        const response = await getWishlist();

        setProducts(response.data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load wishlist"
        );
      } finally {
        setLoading(false);
      }
    }

    loadWishlist();
  }, []);

  async function handleRemove(productId: string) {
    try {
      setRemovingId(productId);

      await removeFromWishlist(productId);

      setProducts((current) =>
        current.filter(
          (product) => product._id !== productId
        )
      );

      window.dispatchEvent(
        new Event("wishlistUpdated")
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to remove product"
      );
    } finally {
      setRemovingId(null);
    }
  }

  async function handleAddToCart(productId: string) {
    try {
      setAddingId(productId);

      await addToCart(productId);

      window.dispatchEvent(
        new Event("cartUpdated")
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to add product to cart"
      );
    } finally {
      setAddingId(null);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50/50">
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center">
            <LoaderCircle
              size={36}
              className="animate-spin text-emerald-600"
            />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50/50">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-lg mx-auto text-center bg-white rounded-2xl border border-gray-200 p-8">
            <Heart
              size={40}
              className="mx-auto mb-4 text-red-400"
            />

            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h2>

            <p className="text-gray-500 mb-6">
              {error}
            </p>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
            >
              Browse Products
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (products.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50/50">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-sm mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <Heart
                size={36}
                className="text-gray-400"
              />
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>

            <p className="text-gray-500 text-sm mb-6">
              Browse products and save your favorites here.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
              >
                Browse Products
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
          <Link
            href="/"
            className="hover:text-emerald-600 transition"
          >
            Home
          </Link>

          <span>/</span>

          <span className="text-gray-700">
            Wishlist
          </span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
            <Heart
              size={24}
              className="text-red-500"
              fill="currentColor"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              My Wishlist
            </h1>

            <p className="text-sm text-gray-500">
              {wishlistCount}{" "}
              {wishlistCount === 1
                ? "item"
                : "items"}{" "}
              saved
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Wishlist Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="hidden md:grid grid-cols-[1fr_140px_120px_160px] gap-4 px-4 py-4 bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
            <span>Product</span>
            <span>Price</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {products.map((product) => {
            const hasDiscount =
              product.priceAfterDiscount !==
                undefined &&
              product.priceAfterDiscount <
                product.price;

            const currentPrice = hasDiscount
              ? product.priceAfterDiscount
              : product.price;

            const inStock = product.quantity > 0;

            return (
              <div
                key={product._id}
                className="grid grid-cols-1 md:grid-cols-[1fr_140px_120px_160px] gap-4 items-center px-4 py-5 border-b border-gray-100 last:border-b-0"
              >
                {/* Product */}
                <div className="flex items-center gap-4">
                  <Link
                    href={`/products/${product._id}`}
                    className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0"
                  >
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </Link>

                  <div className="min-w-0">
                    <Link
                      href={`/products/${product._id}`}
                      className="font-medium text-gray-900 hover:text-emerald-600 transition line-clamp-2"
                    >
                      {product.title}
                    </Link>

                    <p className="text-xs text-gray-400 mt-1">
                      {product.category?.name}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <div className="font-semibold text-gray-900">
                    {currentPrice} EGP
                  </div>

                  {hasDiscount && (
                    <div className="text-xs text-gray-400 line-through mt-1">
                      {product.price} EGP
                    </div>
                  )}
                </div>

                {/* Status */}
                <div>
                  {inStock ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={
                      !inStock ||
                      addingId === product._id
                    }
                    onClick={() =>
                      handleAddToCart(product._id)
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {addingId === product._id ? (
                      <LoaderCircle
                        size={16}
                        className="animate-spin"
                      />
                    ) : (
                      <ShoppingCart size={16} />
                    )}

                    Add to Cart
                  </button>

                  <button
                    type="button"
                    title="Remove from wishlist"
                    disabled={
                      removingId === product._id
                    }
                    onClick={() =>
                      handleRemove(product._id)
                    }
                    className="w-10 h-10 shrink-0 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition disabled:opacity-50"
                  >
                    {removingId === product._id ? (
                      <LoaderCircle
                        size={17}
                        className="animate-spin"
                      />
                    ) : (
                      <Trash2 size={17} />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Shopping */}
        <div className="mt-5">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition"
          >
            <ArrowLeft size={15} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}