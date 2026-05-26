"use client";

import { useInView } from "react-intersection-observer";
import SwashDivider from "./SwashDivider";

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="pt-56 pb-24 bg-primary relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Left — images */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl overflow-hidden h-64 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&q=80"
                alt="Modern dental clinic"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-3xl overflow-hidden h-64 mt-8 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500&q=80"
                alt="Dental team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Badge */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-6 py-4 text-center shadow-2xl min-w-[180px]">
            <p className="text-3xl font-bold text-primary">15+</p>
            <p className="text-sm text-gray-500 font-medium">Years of Excellence</p>
          </div>
        </div>

        {/* Right — text */}
        <div className="text-white">
          <p className="text-primary-light font-semibold tracking-widest uppercase text-sm mb-3">
            About AP Dental
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            More Than Just a Dental Clinic
          </h2>
          <SwashDivider color="#D3F2D3" width={180} height={10} className="mb-6" />
          <p className="text-white/80 text-lg leading-relaxed mb-6">
            Founded over 15 years ago, AP Dental has been a cornerstone of oral
            health in our community. Our team of passionate, board-certified
            dentists believes that excellent dental care goes beyond just healthy
            teeth — it&apos;s about building relationships, restoring confidence, and
            improving quality of life.
          </p>
          <p className="text-white/70 leading-relaxed mb-8">
            We invest in the latest technology and continuous education to ensure
            every patient receives safe, modern, and effective treatment. Whether
            you&apos;re visiting for a routine cleaning or a complete smile makeover,
            we treat every patient like family.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "5,000+", label: "Patients Served" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "20+", label: "Specialist Doctors" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20"
              >
                <p className="text-2xl font-bold text-primary-light">{value}</p>
                <p className="text-xs text-white/70 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
