import Image from "next/image";
import { Clock, ShieldCheck, Truck } from "lucide-react";

export default function LeftSide() {
  return (
    <div className="hidden lg:block">
      <div className="text-center space-y-6">
        <Image
          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/2e5810ff3e-e750761ebcd4ae5907db.png"
          alt="FreshCart"
          width={1200}
          height={384}
          className="h-96 w-full rounded-2xl object-cover shadow-lg"
        />

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            FreshCart - Your One-Stop Shop for Fresh Products
          </h2>

          <p className="text-lg text-gray-600">
            Join thousands of happy customers who trust FreshCart for their
            daily grocery needs
          </p>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Truck className="text-emerald-600 mr-2" size={18} />
              Free Delivery
            </div>

            <div className="flex items-center">
              <ShieldCheck className="text-emerald-600 mr-2" size={18} />
              Secure Payment
            </div>

            <div className="flex items-center">
              <Clock className="text-emerald-600 mr-2" size={18} />
              24/7 Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}