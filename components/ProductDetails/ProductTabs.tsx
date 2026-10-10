"use client";

import { useState } from "react";
import {
  Box,
  Star,
  Truck,
  Check,
} from "lucide-react";
import { Product } from "@/types/product";

type ProductTabsProps = {
  product: Product;
};

export default function ProductTabs({
  product,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">

              <button
                type="button"
                onClick={() => setActiveTab("details")}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition ${
                  activeTab === "details"
                    ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50"
                    : "text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                }`}
              >
                <Box size={18} />
                Product Details
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("reviews")}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition ${
                  activeTab === "reviews"
                    ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50"
                    : "text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                }`}
              >
                <Star size={18} />
                Reviews ({product.ratingsQuantity})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("shipping")}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition ${
                  activeTab === "shipping"
                    ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50"
                    : "text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                }`}
              >
                <Truck size={18} />
                Shipping & Returns
              </button>

            </div>
          </div>

          {/* Content */}
          <div className="p-6">

            {/* Product Details */}
            {activeTab === "details" && (
              <div className="space-y-6">

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    About this Product
                  </h3>

                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Product Information */}
                  <div className="bg-gray-50 rounded-lg p-4">

                    <h4 className="font-medium text-gray-900 mb-3">
                      Product Information
                    </h4>

                    <ul className="space-y-3">

                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          Category
                        </span>

                        <span className="text-gray-900 font-medium">
                          {product.category?.name}
                        </span>
                      </li>

                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          Brand
                        </span>

                        <span className="text-gray-900 font-medium">
                          {product.brand?.name || "N/A"}
                        </span>
                      </li>

                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          Items Sold
                        </span>

                        <span className="text-gray-900 font-medium">
                          {product.sold}+ sold
                        </span>
                      </li>

                    </ul>

                  </div>

                  {/* Key Features */}
                  <div className="bg-gray-50 rounded-lg p-4">

                    <h4 className="font-medium text-gray-900 mb-3">
                      Key Features
                    </h4>

                    <ul className="space-y-3">

                      <li className="flex items-center text-sm text-gray-600">
                        <Check
                          size={16}
                          className="text-emerald-600 mr-2"
                        />
                        Premium Quality Product
                      </li>

                      <li className="flex items-center text-sm text-gray-600">
                        <Check
                          size={16}
                          className="text-emerald-600 mr-2"
                        />
                        100% Authentic Guarantee
                      </li>

                      <li className="flex items-center text-sm text-gray-600">
                        <Check
                          size={16}
                          className="text-emerald-600 mr-2"
                        />
                        Fast & Secure Packaging
                      </li>

                      <li className="flex items-center text-sm text-gray-600">
                        <Check
                          size={16}
                          className="text-emerald-600 mr-2"
                        />
                        Quality Tested
                      </li>

                    </ul>

                  </div>

                </div>
              </div>
            )}

            {/* Reviews */}
            {activeTab === "reviews" && (
              <div>

                <div className="flex items-center gap-4 mb-6">

                  <div className="text-4xl font-bold text-gray-900">
                    {product.ratingsAverage}
                  </div>

                  <div>
                    <div className="flex text-yellow-400">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={20}
                          fill={
                            index <
                            Math.round(product.ratingsAverage)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      ))}
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      Based on {product.ratingsQuantity} reviews
                    </p>
                  </div>

                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-gray-500 text-sm">
                    Customer reviews will appear here.
                  </p>
                </div>

              </div>
            )}

            {/* Shipping */}
            {activeTab === "shipping" && (
              <div className="space-y-6">

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Shipping Information
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    We offer fast and secure delivery to your address.
                    Orders over 500 EGP are eligible for free shipping.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Return Policy
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    You can return your product within 14 days according
                    to our return policy.
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">

                  <div className="bg-gray-50 rounded-lg p-4">
                    <Truck className="text-emerald-600 mb-2" size={22} />
                    <h4 className="font-medium">
                      Fast Delivery
                    </h4>
                    <p className="text-sm text-gray-500">
                      Quick shipping
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <Check className="text-emerald-600 mb-2" size={22} />
                    <h4 className="font-medium">
                      Easy Returns
                    </h4>
                    <p className="text-sm text-gray-500">
                      14-day return
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <Box className="text-emerald-600 mb-2" size={22} />
                    <h4 className="font-medium">
                      Secure Packaging
                    </h4>
                    <p className="text-sm text-gray-500">
                      Safe delivery
                    </p>
                  </div>

                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}