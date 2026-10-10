"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  User,
} from "lucide-react";

import {
  clearCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "@/lib/cart.service";

import type { CartResponse } from "@/types/cart";

export default function CartPage() {
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const [updatingId, setUpdatingId] = useState("");
  const [removingId, setRemovingId] = useState("");
  const [clearing, setClearing] = useState(false);

  const [error, setError] = useState("");

  async function loadCart() {
    try {
      setLoading(true);
      setError("");

      const data = await getCart();

      setCartData(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load your cart"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchCart() {
      try {
        setError("");

        const data = await getCart();

        setCartData(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load your cart"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  async function handleUpdateQuantity(
    productId: string,
    count: number
  ) {
    if (count < 1) {
      return;
    }

    try {
      setUpdatingId(productId);
      setError("");

      const data = await updateCartQuantity(
        productId,
        count
      );

      setCartData(data);

      window.dispatchEvent(
        new Event("cartUpdated")
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update quantity"
      );
    } finally {
      setUpdatingId("");
    }
  }

  async function handleRemove(productId: string) {
    try {
      setRemovingId(productId);
      setError("");

      const data = await removeFromCart(productId);

      setCartData(data);

      window.dispatchEvent(
        new Event("cartUpdated")
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to remove product"
      );
    } finally {
      setRemovingId("");
    }
  }

  async function handleClearCart() {
    try {
      setClearing(true);
      setError("");

      const data = await clearCart();

      setCartData(data);

      window.dispatchEvent(
        new Event("cartUpdated")
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to clear cart"
      );
    } finally {
      setClearing(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <LoaderCircle
            size={42}
            className="animate-spin text-emerald-600"
          />

          <p className="text-gray-500">
            Loading your cart...
          </p>
        </div>
      </main>
    );
  }

  if (error && !cartData) {
    return (
      <main className="min-h-[70vh] bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingCart
              size={38}
              className="text-red-500"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Something went wrong
          </h2>

          <p className="text-gray-500 mb-6">
            {error}
          </p>

          <button
            type="button"
            onClick={loadCart}
            className="
              px-6
              py-3
              rounded-xl
              bg-emerald-600
              text-white
              font-semibold
              hover:bg-emerald-700
              transition
            "
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  const products = cartData?.data?.products ?? [];

  const totalPrice = products.reduce(
    (total, item) =>
      total + item.price * item.count,
    0
  );

  const totalItems = products.reduce(
    (total, item) => total + item.count,
    0
  );

  /*
   * Empty Cart
   */
  if (products.length === 0) {
    return (
      <main className="min-h-[70vh] bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
              <ShoppingCart
                size={56}
                strokeWidth={1.5}
                className="text-gray-400"
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mb-8 leading-relaxed">
            Looks like you havent added anything to
            your cart yet.
            <br />
            Start exploring our products!
          </p>

          <Link
            href="/"
            className="
              inline-flex
              items-center
              gap-2
              bg-emerald-600
              text-white
              py-3.5
              px-8
              rounded-xl
              font-semibold
              hover:bg-emerald-700
              transition-all
              shadow-lg
              active:scale-[0.98]
            "
          >
            Start Shopping

            <ArrowRight size={20} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link
              href="/"
              className="hover:text-emerald-600 transition"
            >
              Home
            </Link>

            <span>/</span>

            <span className="text-gray-900 font-medium">
              Shopping Cart
            </span>
          </nav>

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span
                  className="
                    bg-emerald-600
                    text-white
                    w-12
                    h-12
                    rounded-xl
                    flex
                    items-center
                    justify-center
                  "
                >
                  <ShoppingCart size={25} />
                </span>

                Shopping Cart
              </h1>

              <p className="text-gray-500 mt-2">
                You have{" "}
                <span className="font-semibold text-emerald-600">
                  {totalItems} items
                </span>{" "}
                in your cart
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Products */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {products.map((item) => {
                const productId = item.product._id;

                const isUpdating =
                  updatingId === productId;

                const isRemoving =
                  removingId === productId;

                const itemTotal =
                  item.price * item.count;

                return (
                  <div
                    key={item._id}
                    className="
                      bg-white
                      rounded-2xl
                      shadow-sm
                      border
                      border-gray-100
                      p-4
                      sm:p-5
                    "
                  >
                    <div className="flex gap-4 sm:gap-6">
                      {/* Product Image */}
                      <Link
                        href={`/products/${productId}`}
                        className="relative shrink-0 group"
                      >
                        <div
                          className="
                            w-28
                            h-28
                            sm:w-32
                            sm:h-32
                            rounded-xl
                            bg-gray-50
                            p-3
                            border
                            border-gray-100
                            overflow-hidden
                          "
                        >
                          <Image
                            src={
                              item.product.imageCover
                            }
                            alt={item.product.title}
                            width={128}
                            height={128}
                            unoptimized
                            className="
                              w-full
                              h-full
                              object-contain
                              transition-transform
                              duration-300
                              group-hover:scale-110
                            "
                          />
                        </div>
                      </Link>

                      {/* Product Information */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="mb-3">
                          <Link
                            href={`/products/${productId}`}
                            className="group/title"
                          >
                            <h3
                              className="
                                font-semibold
                                text-gray-900
                                group-hover/title:text-emerald-600
                                transition-colors
                                leading-relaxed
                                text-base
                                sm:text-lg
                              "
                            >
                              {item.product.title}
                            </h3>
                          </Link>

                          <div className="flex items-center gap-2 mt-2">
                            <span
                              className="
                                inline-block
                                px-2.5
                                py-1
                                bg-emerald-50
                                text-emerald-700
                                text-xs
                                font-medium
                                rounded-full
                              "
                            >
                              {item.product.category?.name}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                          <span className="text-emerald-600 font-bold text-lg">
                            {item.price} EGP
                          </span>
                        </div>

                        {/* Bottom Controls */}
                        <div
                          className="
                            mt-auto
                            flex
                            flex-wrap
                            items-center
                            justify-between
                            gap-4
                          "
                        >
                          {/* Quantity */}
                          <div
                            className="
                              flex
                              items-center
                              bg-gray-50
                              rounded-xl
                              p-1
                              border
                              border-gray-200
                            "
                          >
                            <button
                              type="button"
                              disabled={
                                isUpdating ||
                                item.count <= 1
                              }
                              onClick={() =>
                                handleUpdateQuantity(
                                  productId,
                                  item.count - 1
                                )
                              }
                              className="
                                h-8
                                w-8
                                rounded-lg
                                bg-white
                                shadow-sm
                                flex
                                items-center
                                justify-center
                                text-gray-500
                                hover:text-gray-700
                                disabled:opacity-40
                                transition-all
                              "
                            >
                              {isUpdating ? (
                                <LoaderCircle
                                  size={14}
                                  className="animate-spin"
                                />
                              ) : (
                                <Minus size={14} />
                              )}
                            </button>

                            <span className="w-12 text-center font-bold text-gray-900">
                              {item.count}
                            </span>

                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() =>
                                handleUpdateQuantity(
                                  productId,
                                  item.count + 1
                                )
                              }
                              className="
                                h-8
                                w-8
                                rounded-lg
                                bg-emerald-600
                                shadow-sm
                                flex
                                items-center
                                justify-center
                                text-white
                                hover:bg-emerald-700
                                disabled:opacity-50
                                transition-all
                              "
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Total + Remove */}
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-xs text-gray-400 mb-0.5">
                                Total
                              </p>

                              <p className="text-xl font-bold text-gray-900">
                                {itemTotal}{" "}
                                <span className="text-sm font-medium text-gray-400">
                                  EGP
                                </span>
                              </p>
                            </div>

                            <button
                              type="button"
                              title="Remove item"
                              disabled={isRemoving}
                              onClick={() =>
                                handleRemove(productId)
                              }
                              className="
                                h-10
                                w-10
                                rounded-xl
                                border
                                border-red-200
                                bg-red-50
                                text-red-500
                                hover:bg-red-500
                                hover:text-white
                                hover:border-red-500
                                flex
                                items-center
                                justify-center
                                transition-all
                                duration-200
                                disabled:opacity-50
                              "
                            >
                              {isRemoving ? (
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
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div
              className="
                mt-6
                pt-6
                border-t
                border-gray-200
                flex
                items-center
                justify-between
              "
            >
              <Link
                href="/"
                className="
                  text-emerald-600
                  hover:text-emerald-700
                  font-medium
                  text-sm
                  flex
                  items-center
                  gap-2
                "
              >
                <ArrowLeft size={17} />

                Continue Shopping
              </Link>

              <button
                type="button"
                disabled={clearing}
                onClick={handleClearCart}
                className="
                  group
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-gray-400
                  hover:text-red-500
                  transition-colors
                  disabled:opacity-50
                "
              >
                {clearing ? (
                  <LoaderCircle
                    size={14}
                    className="animate-spin"
                  />
                ) : (
                  <Trash2
                    size={14}
                    className="group-hover:scale-110 transition-transform"
                  />
                )}

                <span>Clear all items</span>
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div
              className="
                bg-white
                rounded-2xl
                shadow-sm
                border
                border-gray-100
                overflow-hidden
                sticky
                top-24
              "
            >
              {/* Summary Header */}
              <div className="bg-gray-900 p-5">
                <h2 className="text-white font-bold text-lg">
                  Order Summary
                </h2>
              </div>

              <div className="p-5 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between text-gray-600">
                  <span>
                    Subtotal ({totalItems} items)
                  </span>

                  <span className="font-semibold">
                    {totalPrice} EGP
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>

                  <span className="text-emerald-600 font-medium">
                    Calculated at checkout
                  </span>
                </div>

                <hr className="border-gray-200" />

                {/* Total */}
                <div className="flex justify-between text-lg font-bold">
                  <span>Estimated Total</span>

                  <span className="text-emerald-600">
                    {totalPrice} EGP
                  </span>
                </div>

                {/* Checkout */}
                <div className="pt-4 space-y-3">
                  <Link
                    href="/login?redirect=/checkout"
                    className="
                      w-full
                      flex
                      items-center
                      justify-center
                      gap-2
                      bg-emerald-600
                      text-white
                      py-3.5
                      rounded-xl
                      font-semibold
                      hover:bg-emerald-700
                      transition-all
                    "
                  >
                    <User size={18} />

                    Login to Checkout
                  </Link>

                  <p className="text-xs text-gray-400 text-center">
                    Dont have an account?{" "}
                    <Link
                      href="/signup?redirect=/cart"
                      className="text-emerald-600 hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>

                {/* Benefits */}
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <p className="text-xs text-gray-500">
                    ✓ Your cart items will be saved
                  </p>

                  <p className="text-xs text-gray-500">
                    ✓ Track your orders easily
                  </p>

                  <p className="text-xs text-gray-500">
                    ✓ Access exclusive member deals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}