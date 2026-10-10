import LeftSide from "@/components/Auth/Register/LeftSide";
import RightSide from "@/components/Auth/Register/RightSide";

export default function SignupPage() {
  return (
    <main className="py-10">
      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">
        <LeftSide />
        <RightSide />
      </div>
    </main>
  );
}