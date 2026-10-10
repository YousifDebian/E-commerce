"use client";

import { useEffect, useState } from "react";
import { Mail, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

type UserData = {
  name: string;
  email: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");

      if (!userData) {
        router.replace("/login");
        return;
      }

      const data: UserData = JSON.parse(userData);

      if (
        typeof data.name !== "string" ||
        typeof data.email !== "string" ||
        !data.name ||
        !data.email
      ) {
        localStorage.removeItem("user");
        router.replace("/login");
        return;
      }

      setName(data.name);
      setEmail(data.email);
      setLoading(false);
    } catch {
      localStorage.removeItem("user");
      router.replace("/login");
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="rounded-2xl border border-green-100 bg-white px-8 py-5 shadow-lg shadow-green-100/60">
          <p className="text-lg font-medium text-gray-600">Loading your profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-600">
            Home / Profile
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-gray-900">
            My Profile
          </h1>
          <p className="mt-2 text-base text-gray-600">
            View your account information and manage your account safely.
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-green-50">
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/15 ring-4 ring-white/20 backdrop-blur-sm">
                  <User size={34} className="text-white" />
                </div>

                <div>
                  <p className="text-sm font-medium text-green-100">Welcome back</p>
                  <h2 className="text-2xl font-bold text-white">{name}</h2>
                </div>
              </div>

              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                Active account
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                  <User size={22} className="text-green-600" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="truncate text-lg font-semibold text-gray-900">{name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Mail size={22} className="text-green-600" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="truncate text-lg font-semibold text-gray-900">{email}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-red-200 transition duration-200 hover:bg-red-600 hover:shadow-red-300"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
