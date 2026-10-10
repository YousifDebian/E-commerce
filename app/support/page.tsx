"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Headphones,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CircleHelp,
} from "lucide-react";

export default function SupportPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Hero */}
      <section className="bg-linear-to-br from-emerald-600 via-emerald-500 to-emerald-400 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              Home
            </Link>

            <span className="text-white/40">/</span>

            <span className="text-white font-medium">
              Contact Us
            </span>
          </nav>

          {/* Hero Content */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <Headphones size={32} />
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Contact Us
              </h1>

              <p className="text-white/80 mt-1">
                Wed love to hear from you. Get in touch with our team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Side */}
          <div className="lg:col-span-1 space-y-6">

            {/* Phone */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <Phone
                    size={20}
                    className="text-emerald-600"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Phone
                  </h3>

                  <p className="text-gray-500 text-sm mb-2">
                    Mon-Fri from 8am to 6pm
                  </p>

                  <a
                    href="tel:+18001234567"
                    className="text-emerald-600 font-medium hover:underline"
                  >
                    +1 (800) 123-4567
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <Mail
                    size={20}
                    className="text-emerald-600"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Email
                  </h3>

                  <p className="text-gray-500 text-sm mb-2">
                    Well respond within 24 hours
                  </p>

                  <a
                    href="mailto:support@freshcart.com"
                    className="text-emerald-600 font-medium hover:underline"
                  >
                    support@freshcart.com
                  </a>
                </div>
              </div>
            </div>

            {/* Office */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <MapPin
                    size={20}
                    className="text-emerald-600"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Office
                  </h3>

                  <p className="text-gray-500 text-sm">
                    123 Commerce Street
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <Clock
                    size={20}
                    className="text-emerald-600"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Business Hours
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Monday - Friday: 8am - 6pm
                    <br />
                    Saturday: 9am - 4pm
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">
                Follow Us
              </h3>

              <div className="flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-emerald-600 hover:text-white transition-colors font-bold"
                >
                  f
                </a>

                <a
                  href="#"
                  aria-label="Twitter"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-emerald-600 hover:text-white transition-colors font-bold"
                >
                  𝕏
                </a>

                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-emerald-600 hover:text-white transition-colors font-bold"
                >
                  ◎
                </a>

                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-emerald-600 hover:text-white transition-colors font-bold"
                >
                  in
                </a>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-2">

            {/* Contact Form / Success */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm">

              {sent ? (
                /* Success Message */
                <div className="min-h-125 flex flex-col items-center justify-center text-center">

                  {/* Success Icon */}
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-emerald-600"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Message Sent Successfully!
                  </h2>

                  <p className="text-gray-500 max-w-md mb-6 leading-relaxed">
                    Thank you for contacting us. Your message has been
                    sent successfully. Our support team will get back
                    to you as soon as possible.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* Contact Form */
                <>
                  {/* Form Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Headphones
                        size={20}
                        className="text-emerald-600"
                      />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Send us a Message
                      </h2>

                      <p className="text-gray-500 text-sm">
                        Fill out the form and well get back to you
                      </p>
                    </div>
                  </div>

                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      setSent(true);
                    }}
                    className="space-y-5"
                  >
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Full Name
                        </label>

                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email Address
                        </label>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Subject
                      </label>

                      <select
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white"
                      >
                        <option value="">
                          Select a subject
                        </option>

                        <option value="general">
                          General Inquiry
                        </option>

                        <option value="order">
                          Order Support
                        </option>

                        <option value="shipping">
                          Shipping Question
                        </option>

                        <option value="returns">
                          Returns & Refunds
                        </option>

                        <option value="product">
                          Product Information
                        </option>

                        <option value="feedback">
                          Feedback & Suggestions
                        </option>

                        <option value="other">
                          Other
                        </option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Message
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="How can we help you?"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-600/20"
                    >
                      <Send size={18} />
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Help Center */}
            <div className="mt-6 bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <CircleHelp
                    size={22}
                    className="text-emerald-600"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Looking for quick answers?
                  </h3>

                  <p className="text-gray-600 text-sm mb-3">
                    Check out our Help Center for frequently asked
                    questions about orders, shipping, returns, and more.
                  </p>

                  <Link
                    href="/help"
                    className="text-emerald-600 font-medium text-sm hover:underline inline-flex items-center gap-1"
                  >
                    Visit Help Center →
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}