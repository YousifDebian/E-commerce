

"use client";

import Link from "next/link";
import {
  ShoppingCart,
  House,
  ArrowLeft,
  Apple,
  Carrot,
  Citrus,
  Sprout,
} from "lucide-react";

export default function NotFound() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <main className="min-h-screen bg-[#fafbfc] flex items-center justify-center px-4 py-16 relative overflow-hidden">

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Apple */}
        <div className="absolute top-[10%] left-[5%] text-emerald-200 text-4xl animate-[float_6s_ease-in-out_infinite]">
          <Apple size={42} />
        </div>

        {/* Carrot */}
        <div className="absolute top-[20%] right-[10%] text-emerald-200 text-3xl animate-[float_8s_ease-in-out_infinite_1s]">
          <Carrot size={38} />
        </div>

        {/* Lemon */}
        <div className="absolute bottom-[25%] left-[8%] text-emerald-200 text-3xl animate-[float_7s_ease-in-out_infinite_0.5s]">
          <Citrus size={38} />
        </div>

        {/* Sprout */}
        <div className="absolute bottom-[15%] right-[15%] text-emerald-200 text-4xl animate-[float_9s_ease-in-out_infinite_2s]">
          <Sprout size={42} />
        </div>

        {/* Apple */}
        <div className="absolute top-[50%] left-[15%] text-emerald-100 text-2xl animate-[float_5s_ease-in-out_infinite_1.5s]">
          <Apple size={30} />
        </div>

        {/* Carrot */}
        <div className="absolute top-[40%] right-[5%] text-emerald-100 text-2xl animate-[float_6s_ease-in-out_infinite_0.8s]">
          <Carrot size={30} />
        </div>

        {/* Glow Top */}
        <div className="absolute top-0 right-0 w-125 h-125 bg-linear-to-bl from-emerald-100/40 to-transparent rounded-full blur-3xl" />

        {/* Glow Bottom */}
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-linear-to-tr from-emerald-100/30 to-transparent rounded-full blur-3xl" />

      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-xl w-full">

        {/* 404 Illustration */}
        <div className="flex justify-center mb-10">

          <div className="relative">

            {/* Glow */}
            <div className="absolute inset-0 w-64 h-52 sm:w-72 sm:h-60 bg-emerald-100/50 rounded-4xl blur-2xl" />

            <div className="relative w-64 h-52 sm:w-72 sm:h-60">

              {/* Cart Box */}
              <div className="absolute inset-x-0 top-4 mx-auto w-52 h-40 sm:w-60 sm:h-44 bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 flex items-center justify-center overflow-hidden">

                {/* Background Gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-emerald-50/80 via-transparent to-emerald-100/40" />

                {/* Cart Icon */}
                <ShoppingCart
                  size={90}
                  strokeWidth={1.8}
                  className="relative text-emerald-400/80"
                />

              </div>

              {/* 404 Circle */}
              <div className="absolute -top-2 -right-2 sm:top-0 sm:right-0">

                <div className="relative">

                  {/* White Ring */}
                  <div className="absolute -inset-2 rounded-full bg-white shadow-lg" />

                  {/* 404 */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/40">

                    <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      404
                    </span>

                  </div>

                </div>

              </div>

              {/* Face */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4">

                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />

                <div className="w-8 h-4 border-b-[3px] border-emerald-400 rounded-b-full" />

                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />

              </div>

            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-10">

          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Oops! Nothing Here
          </h1>

          <p className="text-gray-500 text-lg leading-relaxed max-w-md mx-auto">
            Looks like this page went out of stock! Don&apos;t worry,
            there&apos;s plenty more fresh content to explore.
          </p>

        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">

          {/* Home */}
          <Link
            href="/"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30 hover:-translate-y-1"
          >
            <House
              size={20}
              className="group-hover:scale-110 transition-transform duration-300"
            />

            Go to Homepage
          </Link>

          {/* Go Back */}
          <button
            type="button"
            onClick={handleGoBack}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 hover:-translate-y-1"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />

            Go Back
          </button>

        </div>

        {/* Popular Destinations */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

          <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
            Popular Destinations
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">

            {/* Products */}
            <Link
              href="/products"
              className="px-5 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-semibold text-sm hover:bg-emerald-100 transition-colors"
            >
              All Products
            </Link>

            {/* Categories */}
            <Link
              href="/categories"
              className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors"
            >
              Categories
            </Link>

            {/* Brands */}
            <Link
              href="/brands"
              className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors"
            >
              Brands
            </Link>

            {/* Support */}
            <Link
              href="/support"
              className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </div>
    </main>
  );
}