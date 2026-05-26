"use client";

import { useInView } from "react-intersection-observer";
import { CheckCircle2 } from "lucide-react";
import SwashDivider from "./SwashDivider";

const services = [
  {
    title: "General Dentistry",
    subtitle: "For the Entire Family",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80",
    features: ["Exams, Cleanings & X-Rays", "Crowns & Fillings", "Extractions", "All General Procedures"],
    icon: "/icons/cleaning.svg",
  },
  {
    title: "Orthodontics",
    subtitle: "Align Your Smile",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80",
    features: ["Invisalign & Braces", "Phase I & II Treatments", "All-Digital Planning", "Free Consultation"],
    icon: "/icons/braces.svg",
  },
  {
    title: "Children's Dentistry",
    subtitle: "Gentle & Fun",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    features: ["Certified Pediatric Dentists", "Kid-Friendly Environment", "Sedation Options", "Orthodontics"],
    icon: "/icons/replace.svg",
  },
  {
    title: "Cosmetic Dentistry",
    subtitle: "Your Best Smile",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80",
    features: ["Teeth Whitening", "Veneers & Bonding", "Smile Makeovers", "Gum Contouring"],
    icon: "/icons/beforeafter.svg",
  },
  {
    title: "Oral Surgery",
    subtitle: "Specialty Services",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
    features: ["Wisdom Teeth Removal", "Implants", "Endodontics (Root Canals)", "Dentures"],
    icon: "/icons/implant.svg",
  },
  {
    title: "Emergency Care",
    subtitle: "We're Here When You Need Us",
    image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=600&q=80",
    features: ["Same-Day Appointments", "Walk-Ins Welcome", "Pain Management", "24/7 Phone Support"],
    icon: "/icons/rootcanal.svg",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl shadow-gray-100 border border-gray-100 hover:bg-primary hover:border-primary hover:shadow-primary/30 transition-all duration-500 card-hover flex ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="w-48 flex-shrink-0 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-center gap-3">
        <div className="flex items-center gap-2">
          <img src={service.icon} alt={service.title} className="w-10 h-10 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert" />
          <div>
            <h3 className="font-bold text-gray-700 text-lg leading-tight group-hover:text-white transition-colors duration-300">{service.title}</h3>
            <p className="text-sm text-primary font-medium group-hover:text-white/80 transition-colors duration-300">{service.subtitle}</p>
          </div>
        </div>
        <ul className="space-y-1">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-gray-600 group-hover:text-white/80 transition-colors duration-300">
              <CheckCircle2 size={14} className="text-primary flex-shrink-0 group-hover:text-white transition-colors duration-300" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Services() {
  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">
            What We Offer
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
            Comprehensive Dental Services
          </h2>
          <div className="flex justify-center mb-4">
            <SwashDivider color="#0B7C0D" width={180} height={10} />
          </div>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            From your first checkup to a complete smile transformation, we provide
            all the dental care your family needs under one roof.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#book"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-10 py-4 rounded-[6px] transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 text-base"
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
