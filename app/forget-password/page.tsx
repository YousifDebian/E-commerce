import LeftSide from "@/components/Auth/foPassword/LeftSide";
import RightSide from "@/components/Auth/foPassword/RightSide";

export default function ForgotPasswordPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        <LeftSide />
        <RightSide />
      </div>
    </main>
  );
}