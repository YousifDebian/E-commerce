import { ShieldCheck, Star, Truck } from "lucide-react";

export default function LeftSide() {
  return (
    <div>
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800">
        Welcome to{" "}
        <span className="text-emerald-600">FreshCart</span>
      </h1>

      <p className="text-xl mt-2 mb-4 text-gray-600">
        Join thousands of happy customers who enjoy fresh groceries
        delivered right to their doorstep.
      </p>

      {/* Features */}
      <ul className="space-y-6 my-8">
        {/* Premium Quality */}
        <li className="flex items-start gap-4">
          <div className="w-12 h-12 shrink-0 bg-emerald-100 text-emerald-600 rounded-full flex justify-center items-center">
            <Star size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Premium Quality
            </h2>

            <p className="text-gray-600">
              Premium quality products sourced from trusted suppliers.
            </p>
          </div>
        </li>

        {/* Fast Delivery */}
        <li className="flex items-start gap-4">
          <div className="w-12 h-12 shrink-0 bg-emerald-100 text-emerald-600 rounded-full flex justify-center items-center">
            <Truck size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Fast Delivery
            </h2>

            <p className="text-gray-600">
              Same-day delivery available in most areas
            </p>
          </div>
        </li>

        {/* Secure Shopping */}
        <li className="flex items-start gap-4">
          <div className="w-12 h-12 shrink-0 bg-emerald-100 text-emerald-600 rounded-full flex justify-center items-center">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Secure Shopping
            </h2>

            <p className="text-gray-600">
              Your data and payments are completely secure
            </p>
          </div>
        </li>
      </ul>

      {/* Customer Review */}
      <div className="bg-white shadow-sm p-4 rounded-md">
        {/* Author */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-semibold">
            SJ
          </div>

          <div>
            <h3 className="text-gray-800 font-medium">
              Sarah Johnson
            </h3>

            <div className="flex text-yellow-300">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  fill="currentColor"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Review */}
        <blockquote>
          <p className="italic text-gray-600">
            FreshCart has transformed my shopping experience. The quality
            of the products is outstanding, and the delivery is always on
            time. Highly recommend!
          </p>
        </blockquote>
      </div>
    </div>
  );
}