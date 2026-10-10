import { Truck, RotateCcw, ShieldCheck, Headset } from "lucide-react";

const benefits = [
  {
    title: "Free Shipping",
    description: "On orders over 500 EGP",
    icon: Truck,
  },
  {
    title: "Easy Returns",
    description: "14-day return policy",
    icon: RotateCcw,
  },
  {
    title: "Secure Payment",
    description: "100% secure checkout",
    icon: ShieldCheck,
  },
  {
    title: "24/7 Support",
    description: "Contact us anytime",
    icon: Headset,
  },
];

export default function ProductBenefits() {
  return (
    <section className="bg-emerald-50 border-y border-emerald-100">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <Icon
                    size={22}
                    strokeWidth={2}
                    className="text-emerald-600"
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {benefit.title}
                  </h4>

                  <p className="text-gray-500 text-xs">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}