"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "@/lib/wishlist.service";

type WishlistContextType = {
  wishlistIds: string[];
  wishlistCount: number;
  loading: boolean;
  toggleWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
};

const WishlistContext = createContext<
  WishlistContextType | undefined
>(undefined);

type WishlistProviderProps = {
  children: ReactNode;
};

export default function WishlistProvider({
  children,
}: WishlistProviderProps) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchWishlist() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          if (!cancelled) {
            setWishlistIds([]);
            setLoading(false);
          }

          return;
        }

        const response = await getWishlist();

        if (!cancelled) {
          setWishlistIds(
            response.data.map((product) => product._id)
          );

          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setWishlistIds([]);
          setLoading(false);
        }
      }
    }

    void fetchWishlist();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    async function handleWishlistUpdated() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setWishlistIds([]);
          return;
        }

        const response = await getWishlist();

        setWishlistIds(
          response.data.map((product) => product._id)
        );
      } catch {
        setWishlistIds([]);
      }
    }

    window.addEventListener(
      "wishlistUpdated",
      handleWishlistUpdated
    );

    return () => {
      window.removeEventListener(
        "wishlistUpdated",
        handleWishlistUpdated
      );
    };
  }, []);

  async function toggleWishlist(productId: string) {
    const exists = wishlistIds.includes(productId);

    if (exists) {
      await removeFromWishlist(productId);

      setWishlistIds((current) =>
        current.filter((id) => id !== productId)
      );
    } else {
      await addToWishlist(productId);

      setWishlistIds((current) => [
        ...current,
        productId,
      ]);
    }

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  }

  function isInWishlist(productId: string) {
    return wishlistIds.includes(productId);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistCount: wishlistIds.length,
        loading,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}