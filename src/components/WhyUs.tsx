"use client";

import React from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { Shield, Star, GraduationCap, HeartHandshake, Clock } from "lucide-react";
import SwashDivider from "./SwashDivider";

const reasons = [
  {
    icon: Shield,
    title: "Experienced Professionals",
    desc: "Our dentists are state-licensed and board-certified, committed to delivering high-quality, compassionate care.",
  },
  {
    icon: Star,
    title: "Board-Certified Specialists",
    desc: "Our team includes orthodontists and specialists who bring advanced expertise to every treatment plan.",
  },
  {
    icon: Shield,
    title: "Safety & Infection Control",
    desc: "We adhere to strict, accredited safety standards and infection control protocols to protect your health.",
  },
  {
    icon: GraduationCap,
    title: "Ongoing Education",
    desc: "Our professionals receive continuous training in the latest tools and techniques for the best possible care.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    desc: "Morning, evening, and weekend appointments available. Same-day emergency visits welcomed.",
  },
  {
    icon: HeartHandshake,
    title: "Patient-First Philosophy",
    desc: "We listen, we care, and we tailor every treatment plan to your individual needs and comfort level.",
  },
];

type Reason = { icon: React.ComponentType<{ className?: string; size?: number }>; title: string; desc: string };

function ReasonCard({ reason, index }: { reason: Reason; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const Icon = reason.icon;
  return (
    <div
      ref={ref}
      className={`flex gap-4 transition-all duration-500 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
        <Icon className="text-primary" size={22} />
      </div>
      <div>
        <h3 className="font-bold text-gray-700 mb-1">{reason.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{reason.desc}</p>
      </div>
    </div>
  );
}

export default function WhyUs() {
  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div
            ref={titleRef}
            className={`transition-all duration-700 ${
              titleInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4 leading-tight">
              Healthy Smiles, Backed by Dental Expertise
            </h2>
            <SwashDivider color="#0B7C0D" width={180} height={10} className="mb-6" />
            <div className="rounded-2xl overflow-hidden shadow-lg mt-8">
              <Image
                src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=700&q=80"
                alt="AP Dental clinic"
                width={700}
                height={420}
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Right — reasons grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason, i) => (
              <ReasonCard key={reason.title} reason={reason} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Background accent */}
      <div className="absolute right-0 w-1/3 h-96 bg-primary-light/20 -z-10 rounded-l-full" />
    </section>
  );
}
