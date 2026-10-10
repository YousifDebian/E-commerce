"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { getCart } from "@/lib/cart.service";
import { getWishlist } from "@/lib/wishlist.service";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    async function loadCounts() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setCartCount(0);
          setWishlistCount(0);
          return;
        }

        const [cartData, wishlistData] = await Promise.all([
          getCart(),
          getWishlist(),
        ]);

        setCartCount(cartData.numOfCartItems);
        setWishlistCount(wishlistData.count);
      } catch {
        setCartCount(0);
        setWishlistCount(0);
      }
    }

    loadCounts();

    function handleCartUpdated() {
      loadCounts();
    }

    function handleWishlistUpdated() {
      loadCounts();
    }

    window.addEventListener("cartUpdated", handleCartUpdated);

    window.addEventListener(
      "wishlistUpdated",
      handleWishlistUpdated
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        handleCartUpdated
      );

      window.removeEventListener(
        "wishlistUpdated",
        handleWishlistUpdated
      );
    };
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <header className="w-full border-t border-gray-200 border-b bg-white hidden lg:block">
        <div className="w-full px-5">
          <div className="flex items-center justify-between h-9">

            {/* Left Side */}
            <div className="flex items-center gap-8 text-[14px] font-medium text-[#6A7282]">

              {/* Free Shipping */}
              <div className="flex items-center gap-2">
                <Image
                  src="/img/Vector.svg"
                  alt="Shipping"
                  width={17}
                  height={17}
                  className="w-4.25 h-4.25 object-contain"
                />

                <span className="leading-none">
                  Free Shipping on Orders 500 EGP
                </span>
              </div>

              {/* New Arrivals */}
              <div className="flex items-center gap-2">
                <Image
                  src="/img/Component 1.svg"
                  alt="New Arrivals"
                  width={17}
                  height={17}
                  className="w-4.25 h-4.25 object-contain"
                />

                <span className="leading-none">
                  New Arrivals Daily
                </span>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center h-full text-[14px] font-medium text-[#6A7282]">

              {/* Phone */}
              <Link
                href="/"
                className="flex items-center gap-1 px-5 h-full border-gray-200 text-[#6A7282]"
              >
                <Image
                  src="/img/Vector (1).svg"
                  alt="Phone"
                  width={15}
                  height={12}
                  className="w-3.75 h-3 object-contain"
                />

                <span className="leading-none">
                  +1 (800) 123-4567
                </span>
              </Link>

              {/* Email */}
              <Link
                href="/"
                className="flex items-center gap-2 px-5 h-full border-r-[.013rem] border-gray-200 text-[#6A7282]"
              >
                <Image
                  src="/img/Component 2.svg"
                  alt="Email"
                  width={15}
                  height={12}
                  className="w-3.75 h-3 object-contain"
                />

                <span className="leading-none">
                  support@freshcart.com
                </span>
              </Link>

              {/* Sign In */}
              <Link
                href="/login"
                className="flex items-center gap-2 px-5 h-full border-gray-200 text-[#6A7282]"
              >
                <Image
                  src="/img/Vector (2).svg"
                  alt="Sign In"
                  width={15}
                  height={12}
                  className="w-3.75 h-3 object-contain"
                />

                <span className="leading-none">
                  Sign In
                </span>
              </Link>

              {/* Sign Up */}
              <Link
                href="/signup"
                className="flex items-center gap-2 px-5 h-full text-[#6A7282]"
              >
                <Image
                  src="/img/Vector (3).svg"
                  alt="Sign Up"
                  width={15}
                  height={12}
                  className="w-3.75 h-3 object-contain"
                />

                <span className="leading-none">
                  Sign Up
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50">
        <header className="w-full bg-white border-b border-gray-100 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center h-18 gap-5">

              {/* Logo */}
              <div className="shrink-0 ms-2">
                <Image
                  src="/img/FreshCart.svg"
                  alt="FreshCart"
                  width={165}
                  height={32}
                  className="w-41.25 h-8 object-contain"
                />
              </div>

              {/* Search */}
              <form className="hidden lg:flex flex-1 max-w-2xl">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search for products, brands and more..."
                    className="
                      w-full
                      h-11.5
                      px-6
                      pr-14
                      rounded-full
                      border
                      border-gray-200
                      bg-white
                      text-[15px]
                      text-gray-700
                      placeholder:text-gray-400
                      focus:outline-none
                      focus:border-gray-300
                      transition-all
                    "
                  />

                  <button
                    type="submit"
                    className="
                      absolute
                      right-1
                      top-1/2
                      -translate-y-1/2
                      w-9
                      h-9
                      rounded-full
                      bg-[#16a34a]
                      text-white
                      flex
                      items-center
                      justify-center
                      hover:bg-[#15803d]
                      transition-colors
                    "
                  >
                    <Image
                      src="/img/search (1).svg"
                      alt="Search"
                      width={18}
                      height={14}
                      className="w-[17.5px] h-3.5"
                    />
                  </button>
                </div>
              </form>

              {/* Main Menu */}
              <nav className="hidden xl:flex items-center gap-7 ml-auto">

                {/* Home */}
                <Link
                  href="/"
                  className="text-[17px] font-medium text-[#344054] hover:text-[#16a34a] transition-colors"
                >
                  Home
                </Link>

                {/* Shop */}
                <Link
                  href="/shop"
                  className="text-[17px] font-medium text-[#344054] hover:text-[#16a34a] transition-colors"
                >
                  Shop
                </Link>

                {/* Categories */}
                <div className="relative group">
                  <button
                    type="button"
                    className="
                      flex
                      items-center
                      gap-2
                      text-[17px]
                      font-medium
                      text-[#344054]
                      hover:text-[#16a34a]
                      transition-colors
                    "
                  >
                    Categories

                    <Image
                      src="/img/Vector (4).svg"
                      alt="Dropdown"
                      width={12}
                      height={7}
                      className="w-3 h-3"
                    />
                  </button>

                  {/* Dropdown */}
                  <div className="absolute top-full left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white border border-gray-100 rounded-xl shadow-xl py-2 min-w-52.5">

                      <Link
                        href="/categories"
                        className="block px-5 py-3 text-gray-600 hover:text-[#16a34a] hover:bg-green-50 transition-colors"
                      >
                        All Categories
                      </Link>

                      <Link
                        href="/categories"
                        className="block px-5 py-3 text-gray-600 hover:text-[#16a34a] hover:bg-green-50 transition-colors"
                      >
                        Electronics
                      </Link>

                      <Link
                        href="/categories"
                        className="block px-5 py-3 text-gray-600 hover:text-[#16a34a] hover:bg-green-50 transition-colors"
                      >
                        Womens Fashion
                      </Link>

                      <Link
                        href="/categories"
                        className="block px-5 py-3 text-gray-600 hover:text-[#16a34a] hover:bg-green-50 transition-colors"
                      >
                        Mens Fashion
                      </Link>

                      <Link
                        href="/categories"
                        className="block px-5 py-3 text-gray-600 hover:text-[#16a34a] hover:bg-green-50 transition-colors"
                      >
                        Beauty & Health
                      </Link>

                    </div>
                  </div>
                </div>

                {/* Brands */}
                <Link
                  href="/brands"
                  className="text-[17px] font-medium text-[#344054] hover:text-[#16a34a] transition-colors"
                >
                  Brands
                </Link>
              </nav>

              {/* Right Side */}
              <div className="flex items-center ml-auto xl:ml-2">

                {/* Support */}
                <Link
                  href="/support"
                  className="
                    hidden
                    lg:flex
                    items-center
                    gap-3
                    pr-5
                    mr-3
                    border-r
                    border-gray-200
                  "
                >
                  <div className="w-11 h-11 rounded-full bg-green-50 flex items-center justify-center">
                    <Image
                      src="/img/support.svg"
                      alt="Support"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  </div>

                  <div className="text-[13px] leading-4">
                    <div className="text-gray-400">
                      Support
                    </div>

                    <div className="font-semibold text-[#344054]">
                      24/7 Help
                    </div>
                  </div>
                </Link>

                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  title="Wishlist"
                  className="
                    relative
                    flex
                    items-center
                    justify-center
                    w-11
                    h-11
                    hover:bg-gray-50
                    rounded-full
                    transition-colors
                  "
                >
                  <Image
                    src="/img/heart.svg"
                    alt="Wishlist"
                    width={25}
                    height={25}
                    className="w-6.25 h-6.25 object-contain"
                  />

                  {wishlistCount > 0 && (
                    <span
                      className="
                        absolute
                        -top-1
                        -right-1
                        min-w-5
                        h-5
                        px-1
                        rounded-full
                        bg-red-500
                        text-white
                        text-[11px]
                        font-bold
                        flex
                        items-center
                        justify-center
                        border-2
                        border-white
                      "
                    >
                      {wishlistCount > 99
                        ? "99+"
                        : wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Cart */}
                <Link
                  href="/cart"
                  title="Cart"
                  className="
                    relative
                    flex
                    items-center
                    justify-center
                    w-11
                    h-11
                    hover:bg-gray-50
                    rounded-full
                    transition-colors
                  "
                >
                  <Image
                    src="/img/shopping.svg"
                    alt="Cart"
                    width={25}
                    height={25}
                    className="w-6.25 h-6.25 object-contain"
                  />

                  {/* Cart Count */}
                  {cartCount > 0 && (
                    <span
                      className="
                        absolute
                        -top-1
                        -right-1
                        min-w-5
                        h-5
                        px-1
                        rounded-full
                        bg-[#16a34a]
                        text-white
                        text-[11px]
                        font-bold
                        flex
                        items-center
                        justify-center
                        border-2
                        border-white
                      "
                    >
                      {cartCount > 99
                        ? "99+"
                        : cartCount}
                    </span>
                  )}
                </Link>

                {/* Account */}
                <Link
                  href="/profile"
                  title="profile"
                  className="
                    hidden
                    lg:flex
                    items-center
                    justify-center
                    w-11
                    h-11
                    hover:bg-gray-50
                    rounded-full
                    transition-colors
                  "
                >
                  <Image
                    src="/img/card.svg"
                    alt="Account"
                    width={25}
                    height={25}
                    className="w-6.25 h-6.25 object-contain"
                  />
                </Link>

                {/* Mobile Menu */}
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(true)}
                  className="
                    flex
                    lg:hidden
                    items-center
                    justify-center
                    w-9
                    h-9
                    ml-1
                    rounded-full
                    bg-[#16a34a]
                    text-white
                    hover:bg-[#15803d]
                    transition-colors
                  "
                >
                  <Image
                    src="/img/Vector (5).svg"
                    alt="Menu"
                    width={14}
                    height={12}
                    className="w-3.5 h-3 object-contain"
                  />
                </button>
              </div>
            </div>
          </div>
        </header>
      </nav>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-100 lg:hidden">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sidebar */}
          <aside
            className="
              absolute
              top-0
              right-0
              h-full
              w-75
              bg-white
              shadow-2xl
              overflow-y-auto
            "
          >

            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-3 h-24 border-b border-gray-100">

              <div
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-1.5"
              >
                <Image
                  src="/img/FreshCart.svg"
                  alt="FreshCart"
                  width={160}
                  height={40}
                  className="w-40 h-10 object-contain"
                />
              </div>

              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="
                  flex
                  items-center
                  justify-center
                  w-9
                  h-9
                  rounded-full
                  bg-gray-100
                  text-[#475467]
                  hover:bg-gray-200
                  transition-colors
                "
              >
                <Image
                  src="/img/Component 6 (1).svg"
                  alt="Close"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </button>
            </div>

            {/* Search */}
            <div className="px-5 py-5 border-b border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="
                    w-full
                    h-11
                    px-4
                    pr-12
                    rounded-xl
                    border
                    border-gray-200
                    focus:outline-none
                    focus:border-green-500
                  "
                />

                <button
                  type="button"
                  className="
                    absolute
                    right-1
                    top-1/2
                    -translate-y-1/2
                    w-9
                    h-9
                    rounded-lg
                    bg-[#16a34a]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Image
                    src="/img/search (1).svg"
                    alt="Search"
                    width={18}
                    height={14}
                    className="w-[17.5px] h-3.5"
                  />
                </button>
              </div>
            </div>

            {/* Mobile Links */}
            <div className="px-3 py-4">

              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-[18px] font-medium text-[#344054]"
              >
                Home
              </Link>

              <Link
                href="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-[18px] font-medium text-[#344054]"
              >
                Shop
              </Link>

              <Link
                href="/categories"
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-[18px] font-medium text-[#344054]"
              >
                Categories
              </Link>

              <Link
                href="/brands"
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-[18px] font-medium text-[#344054]"
              >
                Brands
              </Link>

            </div>

            {/* Wishlist & Cart */}
            <div className="mx-3 border-t border-gray-100 border-b">

              {/* Wishlist */}
              <Link
                href="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="
                  flex
                  items-center
                  gap-3
                  py-2
                  text-[18px]
                  font-medium
                  text-[#475467]
                "
              >
                <span className="relative flex items-center justify-center w-12 h-12 rounded-full bg-red-50">
                  <Image
                    src="/img/heart.svg"
                    alt="Wishlist"
                    width={25}
                    height={25}
                    className="w-4.5 h-4.5"
                  />

                  {wishlistCount > 0 && (
                    <span
                      className="
                        absolute
                        top-0
                        right-0
                        min-w-5
                        h-5
                        px-1
                        rounded-full
                        bg-red-500
                        text-white
                        text-[11px]
                        font-bold
                        flex
                        items-center
                        justify-center
                        border-2
                        border-white
                      "
                    >
                      {wishlistCount > 99
                        ? "99+"
                        : wishlistCount}
                    </span>
                  )}
                </span>

                <span>
                  Wishlist ({wishlistCount})
                </span>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="
                  flex
                  items-center
                  gap-3
                  py-2
                  text-[18px]
                  font-medium
                  text-[#475467]
                "
              >
                <span className="relative flex items-center justify-center w-12 h-12 rounded-full bg-green-50">

                  <Image
                    src="/img/shopping.svg"
                    alt="Cart"
                    width={25}
                    height={25}
                    className="w-4.5 h-4.5"
                  />

                  {cartCount > 0 && (
                    <span
                      className="
                        absolute
                        top-0
                        right-0
                        min-w-5
                        h-5
                        px-1
                        rounded-full
                        bg-[#16a34a]
                        text-white
                        text-[11px]
                        font-bold
                        flex
                        items-center
                        justify-center
                        border-2
                        border-white
                      "
                    >
                      {cartCount > 99
                        ? "99+"
                        : cartCount}
                    </span>
                  )}
                </span>

                <span>
                  Cart ({cartCount})
                </span>
              </Link>

            </div>

            {/* Auth Buttons */}
            <div className="px-3 py-3 flex gap-3">

              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="
                  flex-1
                  h-13.5
                  rounded-xl
                  bg-[#16a34a]
                  text-white
                  flex
                  items-center
                  justify-center
                  text-[18px]
                  font-semibold
                  hover:bg-[#15803d]
                  transition-colors
                "
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="
                  flex-1
                  h-13.5
                  rounded-xl
                  border-2
                  border-[#16a34a]
                  text-[#16a34a]
                  flex
                  items-center
                  justify-center
                  text-[18px]
                  font-semibold
                  hover:bg-green-50
                  transition-colors
                "
              >
                Sign Up
              </Link>

            </div>

            {/* Support */}
            <div className="mx-3 mb-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Image
                    src="/img/support.svg"
                    alt="Support"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </div>

                <div>
                  <p className="text-[17px] font-semibold text-[#344054]">
                    Need Help?
                  </p>

                  <Link
                    href="/support"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm text-gray-500 hover:text-[#16a34a]"
                  >
                    Contact Support
                  </Link>
                </div>

              </div>
            </div>

          </aside>
        </div>
      )}
    </>
  );
}