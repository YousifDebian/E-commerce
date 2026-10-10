"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    title: "Fresh Products Delivered to your Door",
    description: "Get 20% off your first order",
    button1: "Shop Now",
    button2: "View Deals",
    link1: "/shop",
    link2: "/deals",
  },
  {
    title: "Premium Quality Guaranteed",
    description: "Fresh from farm to your table",
    button1: "Shop Now",
    button2: "Learn More",
    link1: "/shop",
    link2: "/about",
  },
  {
    title: "Fast & Free Delivery",
    description: "Same day delivery available",
    button1: "Order Now",
    button2: "Delivery Info",
    link1: "/shop",
    link2: "/delivery",
  },
];

export default function HeroSlider() {
  return (

    <>
    

    <header id="HeroSlider" className=" relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
         
        }}
        navigation={{
          prevEl: ".hero-prev",
          nextEl: ".hero-next",
        }}
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-100 bg-cover bg-center"
              style={{
                backgroundImage: "url('/img/home-slider.png')",
              }}
            >
              
              <div className="w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
                <div className="container mx-auto h-full px-11">
                  <div className="flex items-center h-full">
                    <div className="text-white">

                      <h2 className="text-3xl md:text-4xl font-bold mb-4 max-w-105">
                        {slide.title}
                      </h2>

                      <p className="text-lg">
                        {slide.description}
                      </p>

                      <div className="mt-5 flex items-center gap-2">
                        <Link
                          href={slide.link1}
                          className="
                            inline-block
                            px-6
                            py-2
                            rounded-lg
                            bg-white
                            border-2
                            border-white/50
                            text-green-500
                            font-semibold
                            hover:scale-105
                            transition-transform
                          "
                        >
                          {slide.button1}
                        </Link>

                        <Link
                          href={slide.link2}
                          className="
                            inline-block
                            px-6
                            py-2
                            rounded-lg
                            bg-transparent
                            border-2
                            border-white/50
                            text-white
                            font-semibold
                            hover:bg-white/10
                            transition-colors
                          "
                        >
                          {slide.button2}
                        </Link>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Previous */}
      <button
        type="button"
        className="
          hero-prev
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          z-20
          hidden
          md:flex
          items-center
          justify-center
          w-12
          h-12
          rounded-full
          bg-white/90
          text-green-500
          shadow-lg
          hover:bg-white
          hover:scale-110
          transition-all
        "
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 320 512"
          fill="currentColor"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
        </svg>
      </button>

      {/* Next */}
      <button
        type="button"
        className="
          hero-next
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          z-20
          hidden
          md:flex
          items-center
          justify-center
          w-12
          h-12
          rounded-full
          bg-white/90
          text-green-500
          shadow-lg
          hover:bg-white
          hover:scale-110
          transition-all
        "
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 320 512"
          fill="currentColor"
        >
          <path d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
        </svg>
      </button>
    </header>


        <section className="py-10 px-11 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Free Shipping */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-blue-50 text-blue-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
              <Image
                src="/img/Free Shipping.svg"
                alt="Support"
                width={20}
                height={20}
                className="text-xl"
               ></Image>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-sm">
                Free Shipping
              </h3>

              <p className="text-xs text-gray-500">
                On orders over 500 EGP
              </p>
            </div>
          </div>

          {/* Secure Payment */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-emerald-50 text-emerald-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
              <Image
                src="/img/Secure Payment.svg"
                alt="Support"
                width={20}
                height={20}
                className="text-xl"
               ></Image>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-sm">
                Secure Payment
              </h3>

              <p className="text-xs text-gray-500">
                100% secure transactions
              </p>
            </div>
          </div>

          {/* Easy Returns */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-orange-50 text-orange-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
              <Image
                src="/img/Easy Returns.svg"
                alt="Support"
                width={20}
                height={20}
                className="text-xl"
               
              >
              </Image>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-sm">
                Easy Returns
              </h3>

              <p className="text-xs text-gray-500">
                14-day return policy
              </p>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-purple-50 text-purple-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
              <Image
                src="/img/Support2.svg"
                alt="Support"
                width={20}
                height={20}
                className="text-xl"
           
              >
              </Image>  
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-sm">
                24/7 Support
              </h3>

              <p className="text-xs text-gray-500">
                Dedicated support team
              </p>
            </div>
          </div>

        </div>
      </div>
        </section>
    </>


  );
}