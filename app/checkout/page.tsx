"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowLeft,
  Banknote,
  Check,
  CircleAlert,
  CreditCard,
  House,
  LoaderCircle,
  MapPin,
  Package,
  Phone,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Truck,
  WalletCards,
} from "lucide-react";

import { getCart } from "@/lib/cart.service";
import { createCashOrder } from "@/lib/order.service";
import type { CartProduct } from "@/types/cart";

export default function CheckoutPage() {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [city, setCity] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    async function loadCart() {
      try {
        setLoading(true);
        setError("");

        const response = await getCart();

        setProducts(response.data.products);
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

    loadCart();
  }, []);

  const subtotal = products.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  const shipping = 100;
  const tax = 20;
  const total = subtotal + shipping + tax;

  const totalItems = products.reduce(
    (total, item) => total + item.count,
    0
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!city.trim()) {
      setError("Please enter your city");
      return;
    }

    if (!details.trim()) {
      setError("Please enter your street address");
      return;
    }

    if (!phone.trim()) {
      setError("Please enter your phone number");
      return;
    }

    if (!/^01[0125][0-9]{8}$/.test(phone)) {
      setError("Please enter a valid Egyptian phone number");
      return;
    }

    if (!postalCode.trim()) {
      setError("Please enter your postal code");
      return;
    }

    if (products.length === 0) {
      setError("Your cart is empty");
      return;
    }

    try {
      setPlacingOrder(true);

      const cartResponse = await getCart();
      const cartId = cartResponse.cartId;

      if (!cartId) {
        throw new Error("Cart ID not found");
      }

      const response = await createCashOrder(cartId, {
        details: details.trim(),
        phone: phone.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
      });

      setOrderId(response.data._id);
      setSuccess(true);

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create your order"
      );
    } finally {
      setPlacingOrder(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <LoaderCircle
            size={42}
            className="mx-auto text-emerald-600 animate-spin"
          />
          <p className="mt-4 text-gray-500">
            Loading checkout...
          </p>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
            <Check
              size={42}
              className="text-emerald-600"
              strokeWidth={2.5}
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mt-6">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-500 mt-3">
            Thank you for your order. Your order has been
            successfully created.
          </p>

          <div className="bg-gray-50 rounded-xl p-5 mt-6 text-left">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">
                Order ID
              </span>

              <span className="font-semibold text-gray-900 text-sm">
                {orderId}
              </span>
            </div>

            <div className="flex justify-between items-center mt-3">
              <span className="text-gray-500">
                Payment
              </span>

              <span className="font-semibold text-emerald-600">
                Cash on Delivery
              </span>
            </div>

            <div className="flex justify-between items-center mt-3">
              <span className="text-gray-500">
                Total
              </span>

              <span className="font-bold text-xl text-emerald-600">
                {total.toLocaleString()} EGP
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            <Link
              href="/orders"
              className="bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
            >
              View My Orders
            </Link>

            <Link
              href="/"
              className="border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (products.length === 0) {
    return (
      <main className="min-h-screen bg-linear-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
            <ShoppingBag
              size={64}
              className="mx-auto text-gray-300"
              strokeWidth={1.5}
            />

            <h1 className="text-2xl font-bold text-gray-900 mt-5">
              Your Cart Is Empty
            </h1>

            <p className="text-gray-500 mt-2">
              Add some products to your cart before checking out.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-6 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link
              href="/"
              className="hover:text-emerald-600 transition"
            >
              Home
            </Link>

            <span className="text-gray-300">/</span>

            <Link
              href="/cart"
              className="hover:text-emerald-600 transition"
            >
              Cart
            </Link>

            <span className="text-gray-300">/</span>

            <span className="text-gray-900 font-medium">
              Checkout
            </span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-linear-to-br from-emerald-600 to-emerald-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
                  <ReceiptText size={25} />
                </span>

                Complete Your Order
              </h1>

              <p className="text-gray-500 mt-2">
                Review your items and complete your purchase
              </p>
            </div>

            <Link
              href="/cart"
              className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all"
            >
              <ArrowLeft size={18} />
              Back to Cart
            </Link>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700">
            <CircleAlert
              size={20}
              className="shrink-0 mt-0.5"
            />

            <p className="text-sm font-medium">
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-linear-to-r from-emerald-600 to-emerald-700 px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <House size={20} />
                    Shipping Address
                  </h2>

                  <p className="text-emerald-100 text-sm mt-1">
                    Where should we deliver your order?
                  </p>
                </div>

                <div className="p-6 space-y-5">
                  {/* Info */}
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <CircleAlert
                        size={16}
                        className="text-blue-600"
                      />
                    </div>

                    <div>
                      <p className="text-sm text-blue-800 font-medium">
                        Delivery Information
                      </p>

                      <p className="text-xs text-blue-600 mt-0.5">
                        Please ensure your address is accurate
                        for smooth delivery
                      </p>
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      City{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <MapPin
                          size={17}
                          className="text-gray-500"
                        />
                      </div>

                      <input
                        id="city"
                        type="text"
                        value={city}
                        onChange={(event) =>
                          setCity(event.target.value)
                        }
                        placeholder="e.g. Cairo, Alexandria, Giza"
                        className="w-full px-4 py-3.5 pl-14 border-2 border-gray-200 rounded-xl focus:outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label
                      htmlFor="details"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Street Address{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <div className="absolute left-4 top-4 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <MapPin
                          size={17}
                          className="text-gray-500"
                        />
                      </div>

                      <textarea
                        id="details"
                        rows={3}
                        value={details}
                        onChange={(event) =>
                          setDetails(event.target.value)
                        }
                        placeholder="Street name, building number, floor, apartment..."
                        className="w-full px-4 py-3.5 pl-14 border-2 border-gray-200 rounded-xl focus:outline-none transition-all resize-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone Number{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Phone
                          size={17}
                          className="text-gray-500"
                        />
                      </div>

                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(event) =>
                          setPhone(event.target.value)
                        }
                        placeholder="01xxxxxxxxx"
                        className="w-full px-4 py-3.5 pl-14 pr-36 border-2 border-gray-200 rounded-xl focus:outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      />

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hidden sm:block">
                        Egyptian numbers only
                      </span>
                    </div>
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Postal Code{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="postalCode"
                      type="text"
                      value={postalCode}
                      onChange={(event) =>
                        setPostalCode(event.target.value)
                      }
                      placeholder="e.g. 12345"
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-linear-to-r from-emerald-600 to-emerald-700 px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <WalletCards size={20} />
                    Payment Method
                  </h2>

                  <p className="text-emerald-100 text-sm mt-1">
                    Choose how youd like to pay
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  {/* Cash */}
                  <div className="w-full p-5 rounded-xl border-2 border-emerald-500 bg-linear-to-r from-emerald-50 to-green-50 shadow-sm flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-linear-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30">
                      <Banknote size={25} />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-emerald-700">
                        Cash on Delivery
                      </h3>

                      <p className="text-sm text-gray-500 mt-0.5">
                        Pay when your order arrives at your
                        doorstep
                      </p>
                    </div>

                    <div className="w-7 h-7 rounded-full flex items-center justify-center bg-emerald-600 text-white">
                      <Check size={15} />
                    </div>
                  </div>

                  {/* Online - Coming Soon */}
                  <div className="w-full p-5 rounded-xl border-2 border-gray-200 bg-gray-50 opacity-70 flex items-center gap-4 ">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gray-100 text-gray-400">
                      <CreditCard size={25} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-700">
                          Pay Online
                        </h3>

                        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-gray-200 text-gray-500">
                          SOON
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 mt-0.5">
                        Secure payment with Credit/Debit Card
                      </p>
                    </div>
                  </div>

                  {/* Security */}
                  <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <ShieldCheck
                        size={21}
                        className="text-green-600"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Secure & Encrypted
                      </p>

                      <p className="text-xs text-green-600 mt-0.5">
                        Your order information is securely
                        processed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-20">
                <div className="bg-linear-to-r from-emerald-600 to-emerald-700 px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShoppingBag size={20} />
                    Order Summary
                  </h2>

                  <p className="text-emerald-100 text-sm mt-1">
                    {totalItems}{" "}
                    {totalItems === 1 ? "item" : "items"}
                  </p>
                </div>

                <div className="p-5">
                  {/* Products */}
                  <div className="space-y-3 max-h-64 overflow-y-auto mb-5 pr-1">
                    {products.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            width={56}
                            height={56}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.product.title}
                          </p>

                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.count} × {item.price} EGP
                          </p>
                        </div>

                        <p className="text-sm font-bold text-gray-900 shrink-0">
                          {(
                            item.price * item.count
                          ).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <hr className="border-gray-100 my-4" />

                  {/* Prices */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>

                      <span className="font-medium">
                        {subtotal.toLocaleString()} EGP
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span className="flex items-center gap-2">
                        <Truck
                          size={16}
                          className="text-gray-400"
                        />
                        Shipping
                      </span>

                      <span className="font-medium">
                        {shipping} EGP
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>

                      <span className="font-medium">
                        {tax} EGP
                      </span>
                    </div>

                    <hr className="border-gray-100" />

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>

                      <div className="text-right">
                        <span className="text-2xl font-bold text-emerald-600">
                          {total.toLocaleString()}
                        </span>

                        <span className="text-sm text-gray-500 ml-1">
                          EGP
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Place Order */}
                  <button
                    type="submit"
                    disabled={placingOrder}
                    className="w-full mt-6 bg-linear-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-bold hover:from-emerald-700 hover:to-emerald-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-[0.98]"
                  >
                    {placingOrder ? (
                      <>
                        <LoaderCircle
                          size={20}
                          className="animate-spin"
                        />
                        Placing Order...
                      </>
                    ) : (
                      <>
                        <Package size={20} />
                        Place Order
                      </>
                    )}
                  </button>

                  {/* Benefits */}
                  <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <ShieldCheck
                        size={14}
                        className="text-green-500"
                      />
                      <span>Secure</span>
                    </div>

                    <div className="w-px h-4 bg-gray-200" />

                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Truck
                        size={14}
                        className="text-blue-500"
                      />
                      <span>Fast Delivery</span>
                    </div>

                    <div className="w-px h-4 bg-gray-200" />

                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Package
                        size={14}
                        className="text-orange-500"
                      />
                      <span>Easy Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}