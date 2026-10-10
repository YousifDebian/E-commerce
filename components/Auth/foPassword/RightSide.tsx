"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft,  KeyRound, Lock } from "lucide-react";

import { forgotPassword } from "@/lib/auth.service";

export default function RightSide() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleForgotPassword(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      await forgotPassword(email);

      setSuccess(
        "Reset code has been sent to your email."
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-emerald-600">
              Fresh<span className="text-gray-800">Cart</span>
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Forgot Password?
          </h1>

          <p className="text-gray-600">
            No worries, well send you a reset code
          </p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center mb-8">

          <div className="flex items-center">
           

            <div className="w-16 h-0.5 mx-2 bg-gray-200" />
          </div>

          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-gray-100 text-gray-400">
              <KeyRound size={16} />
            </div>

            <div className="w-16 h-0.5 mx-2 bg-gray-200" />
          </div>

          <div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-gray-100 text-gray-400">
              <Lock size={16} />
            </div>
          </div>

        </div>

        {/* Form */}
        <form
          onSubmit={handleForgotPassword}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>

            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
              />

        
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          {/* Success */}
          {success && (
            <p className="text-sm text-emerald-600 text-center">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Sending..."
              : "Send Reset Code"}
          </button>

          {/* Back to Login */}
          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Sign In
            </Link>
          </div>
        </form>

        {/* Bottom */}
        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p className="text-gray-600">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}