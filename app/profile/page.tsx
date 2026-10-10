"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { Mail, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

type UserData = {
  name: string;
  email: string;
  role: string;
};

type StoredUser = {
  name: string;
  email: string;
  role?: unknown;
};

const isStoredUser = (value: unknown): value is StoredUser => {
  if (typeof value !== "object" || value === null) return false;

  const v = value as Record<string, unknown>;

  return (
    typeof v.name === "string" &&
    v.name.length > 0 &&
    typeof v.email === "string" &&
    v.email.length > 0
  );
};

const parseUser = (raw: string | null | undefined): UserData | null => {
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);

    if (!isStoredUser(parsed)) return null;

    return {
      name: parsed.name,
      email: parsed.email,
      role: typeof parsed.role === "string" ? parsed.role : "user",
    };
  } catch {
    return null;
  }
};

// localStorage كـ external store
const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getSnapshot = (): string | null => localStorage.getItem("user");

// undefined = لسا ما قرينا (السيرفر / وقت الـ hydration)
const getServerSnapshot = (): string | null | undefined => undefined;

export default function ProfilePage() {
  const router = useRouter();

  const storedUser = useSyncExternalStore<string | null | undefined>(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const user = useMemo(() => parseUser(storedUser), [storedUser]);

  useEffect(() => {
    if (storedUser === undefined) return; // لسا loading

    if (!user) {
      localStorage.removeItem("user");
      router.replace("/login");
    }
  }, [storedUser, user, router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-gray-500">Home / Profile</p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">My Profile</h1>

          <p className="mt-2 text-gray-500">View your account information</p>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          {/* User Header */}
          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <User size={30} className="text-green-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>

              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* User Information */}
          <div className="mt-6 space-y-5">
            {/* Name */}
            <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                <User size={20} className="text-green-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Full Name</p>

                <p className="font-semibold text-gray-900">{user.name}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                <Mail size={20} className="text-green-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Email Address</p>

                <p className="font-semibold text-gray-900">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
            >
              <LogOut size={19} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}