import { Suspense } from "react";

import LeftSide from "@/components/Auth/Login/LeftSide";
import RightSide from "@/components/Auth/Login/RightSide";

export default function LoginPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        <LeftSide />

        <Suspense
          fallback={
            <div className="flex min-h-100 items-center justify-center">
              Loading...
            </div>
          }
        >
          <RightSide />
        </Suspense>
      </div>
    </main>
  );
}