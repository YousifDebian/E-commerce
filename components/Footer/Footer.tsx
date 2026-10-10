import Link from "next/link";
import { Phone, Mail, MapPin, CreditCard } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* About */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <div className="bg-white rounded-lg px-4 py-2">
                <span className="shrink-0 ">
                  <Image
                    src="/img/FreshCart.svg"
                    alt="FreshCart"
                    width={165.16000366210938}
                    height={32}
                    className="w-[165.16000366210938px] h-8 object-contain"
                  />
                </span>
              </div>
            </Link>

            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            {/* Contact */}
            <div className="space-y-3 mb-6">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors text-sm"
              >
                <Phone size={17} className="text-emerald-500" />
                <span>+1 (800) 123-4567</span>
              </a>

              <a
                href="mailto:support@freshcart.com"
                className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors text-sm"
              >
                <Mail size={17} className="text-emerald-500" />
                <span>support@freshcart.com</span>
              </a>

              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin
                  size={17}
                  className="text-emerald-500 mt-0.5 shrink-0"
                />

                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-colors"
              >
                f
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-colors"
              >
                𝕏
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-colors"
              >
                ◎
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-colors"
              >
                ▶
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Shop</h3>

            <ul className="space-y-3">
              <li>
                <Link href="/products" className="footer-link">
                  All Products
                </Link>
              </li>

              <li>
                <Link href="/categories" className="footer-link">
                  Categories
                </Link>
              </li>

              <li>
                <Link href="/brands" className="footer-link">
                  Brands
                </Link>
              </li>

              <li>
                <Link
                  href="/products?category=6439d58a0049ad0b52b9003f"
                  className="footer-link"
                >
                  Electronics
                </Link>
              </li>

              <li>
                <Link
                  href="/products?category=6439d2d167d9aa4ca970649f"
                  className="footer-link"
                >
                  Mens Fashion
                </Link>
              </li>

              <li>
                <Link
                  href="/products?category=6439d5b90049ad0b52b90048"
                  className="footer-link"
                >
                  Womens Fashion
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Account</h3>

            <ul className="space-y-3">
              <li>
                <Link href="/profile" className="footer-link">
                  My Account
                </Link>
              </li>

              <li>
                <Link href="/profile/orders" className="footer-link">
                  Order History
                </Link>
              </li>

              <li>
                <Link href="/wishlist" className="footer-link">
                  Wishlist
                </Link>
              </li>

              <li>
                <Link href="/cart" className="footer-link">
                  Shopping Cart
                </Link>
              </li>

              <li>
                <Link href="/login" className="footer-link">
                  Sign In
                </Link>
              </li>

              <li>
                <Link href="/signup" className="footer-link">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Support</h3>

            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="footer-link">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link href="/help" className="footer-link">
                  Help Center
                </Link>
              </li>

              <li>
                <Link href="/shipping" className="footer-link">
                  Shipping Info
                </Link>
              </li>

              <li>
                <Link href="/returns" className="footer-link">
                  Returns & Refunds
                </Link>
              </li>

              <li>
                <Link href="/track-order" className="footer-link">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Legal</h3>

            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="footer-link">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms" className="footer-link">
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link href="/cookies" className="footer-link">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2026 FreshCart. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <CreditCard size={18} />
                <span>Visa</span>
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <CreditCard size={18} />
                <span>Mastercard</span>
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <CreditCard size={18} />
                <span>PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
