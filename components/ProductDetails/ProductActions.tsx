"use client";

import { useState } from "react";
import {
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  Heart,
  Share2,
} from "lucide-react";

type ProductActionsProps = {
  price: number;
  quantityAvailable: number;
};

export default function ProductActions({
  price,
  quantityAvailable,
}: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity < quantityAvailable) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const totalPrice = price * quantity;

  return (
    <>
      {/* Quantity */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>

        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">

            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={quantity === 1}
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition disabled:opacity-40"
            >
              <Minus size={18} />
            </button>

            <span className="w-16 text-center text-lg font-medium">
              {quantity}
            </span>

            <button
              type="button"
              onClick={increaseQuantity}
              disabled={quantity >= quantityAvailable}
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition disabled:opacity-40"
            >
              <Plus size={18} />
            </button>

          </div>

          <span className="text-sm text-gray-500">
            {quantityAvailable} available
          </span>
        </div>
      </div>

      {/* Total Price */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">
            Total Price:
          </span>

          <span className="text-2xl font-bold text-emerald-600">
            {totalPrice.toFixed(2)} EGP
          </span>
        </div>
      </div>

      {/* Add Cart / Buy Now */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">

        <button
          type="button"
          className="flex-1 bg-emerald-600 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-emerald-700 transition flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>

        <button
          type="button"
          className="flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2"
        >
          <Zap size={20} />
          Buy Now
        </button>

      </div>

      {/* Wishlist / Share */}
      <div className="flex gap-3 mb-6">

        <button
          type="button"
          className="flex-1 border-2 border-gray-200 py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:border-emerald-300 hover:text-emerald-600 transition"
        >
          <Heart size={20} />
          Add to Wishlist
        </button>

        <button
          type="button"
          className="border-2 border-gray-200 px-4 rounded-xl hover:border-emerald-300 hover:text-emerald-600 transition"
        >
          <Share2 size={20} />
        </button>

      </div>
    </>
  );
}