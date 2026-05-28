"use client";

import { useInView } from "react-intersection-observer";
import { Users, Award, Clock, Shield } from "lucide-react";
import SwashDivider from "./SwashDivider";

export default function DoctorHighlight() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const stats = [
    {
      value: "15+",
      label: "Years Experience",
      icon: Clock,
    },
    {
      value: "12+",
      label: "Accreditations",
      icon: Award,
    },
    {
      value: "24/7",
      label: "Emergency Support",
      icon: Shield,
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Doctor Bio & Stats */}
          <div
            className={`lg:col-span-7 transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            {/* Badge */}
            <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
              MEET OUR FOUNDER
            </p>

            {/* Title */}
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
              Dr Ammar Patwa
            </h2>

            {/* Swash Divider */}
            <SwashDivider color="#1B5E20" width={180} height={10} className="mb-6" />

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
              AP Dental was built on the foundation of compassionate, exceptional oral care. Led by Dr Ammar Patwa, our clinic utilizes state-of-the-art systems and the latest clinical insights to restore and maintain your brightest smile.
            </p>

            {/* Stats Grid */}
            <div className="flex gap-4 max-w-lg">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <stat.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-primary">{stat.value}</p>
                    <p className="text-[10px] font-medium text-gray-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image Showcase */}
          <div
            className={`lg:col-span-5 relative flex justify-center lg:justify-end transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {/* Background panel */}
            <div className="absolute right-0 bottom-0 top-[10%] left-[5%] bg-primary-light rounded-3xl -z-10 shadow-xl" />

            {/* Doctor portrait image container */}
            <div className="w-[90%] aspect-[4/5] rounded-3xl overflow-hidden border-[8px] border-white shadow-2xl relative bg-gray-50">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80"
                alt="Dr Ammar Patwa, DDS"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
