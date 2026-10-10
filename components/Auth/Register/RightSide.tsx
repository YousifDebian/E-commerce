"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  UserPlus,
} from "lucide-react";

import { signup } from "@/lib/auth.service";

export default function RightSide() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phone, setPhone] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [terms, setTerms] = useState(false);

  const passwordStrength =
    password.length === 0
      ? 0
      : password.length < 8
        ? 25
        : /[A-Z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password)
          ? 100
          : 60;

  const strengthText =
    passwordStrength === 100
      ? "Strong"
      : passwordStrength === 60
        ? "Medium"
        : "Weak";

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (!terms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    if (password !== rePassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const data = await signup(
        name,
        email,
        password,
        rePassword,
        phone
      );

      localStorage.setItem("token", data.token);

      router.push("/");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg px-6 py-10">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-2 text-gray-800">
          Create Your Account
        </h2>

        <p className="text-gray-600">
          Start your fresh journey with us today
        </p>
      </div>

      {/* Social Login */}
      <div className="flex gap-2 my-10">
        <button
          type="button"
          className="grow flex justify-center items-center gap-2 py-2.5 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition"
        >
        

          <span>Google</span>
        </button>

        <button
          type="button"
          className="grow flex justify-center items-center gap-2 py-2.5 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition"
        >
       

          <span>Facebook</span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative w-full h-px bg-gray-300/30 my-6 flex items-center">
        <span className="absolute left-1/2 -translate-x-1/2 bg-white px-4 text-sm text-gray-500">
          or
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSignup} className="space-y-7">

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-700"
          >
            Name*
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Ali"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700"
          >
            Email*
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="ali@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password*
          </label>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="create a strong password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {/* Password Strength */}
          <div className="flex items-center gap-2">
            <div
              className="grow h-1 bg-gray-200 rounded-md overflow-hidden"
              role="progressbar"
              aria-valuenow={passwordStrength}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={`h-full transition-all duration-300 ${
                  passwordStrength === 100
                    ? "bg-green-500"
                    : passwordStrength === 60
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                style={{ width: `${passwordStrength}%` }}
              />
            </div>

            <span className="text-sm font-medium min-w-12.5">
              {strengthText}
            </span>
          </div>

          <p className="text-gray-500 -mt-1 text-xs">
            Must be at least 8 characters with numbers and symbols
          </p>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="rePassword"
            className="text-sm font-medium text-gray-700"
          >
            Confirm Password*
          </label>

          <div className="relative">
            <input
              id="rePassword"
              name="rePassword"
              type={showRePassword ? "text" : "password"}
              placeholder="confirm your password"
              autoComplete="new-password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              required
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition"
            />

            <button
              type="button"
              onClick={() =>
                setShowRePassword(!showRePassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showRePassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="phone"
            className="text-sm font-medium text-gray-700"
          >
            Phone Number*
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 234 567 8900"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition"
          />
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            className="w-4 h-4 mt-1 accent-emerald-600"
          />

          <label
            htmlFor="terms"
            className="text-sm text-gray-600"
          >
            I agree to the{" "}
            <a
              href="/terms"
              className="text-emerald-600 hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy-policy"
              className="text-emerald-600 hover:underline"
            >
              Privacy Policy
            </a>{" "}
            *
          </label>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 px-4 rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <UserPlus size={18} />

          <span>
            {loading ? "Creating Account..." : "Create My Account"}
          </span>
        </button>
      </form>

      {/* Login Link */}
      <p className="border-t pt-8 mt-6 border-gray-300/30 text-center text-gray-600">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-emerald-600 hover:underline font-medium"
        >
          Sign In
        </a>
      </p>
    </div>
  );
}