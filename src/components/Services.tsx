"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import SwashDivider from "./SwashDivider";

const services = [
  {
    slug: "general-dentistry",
    title: "General Dentistry",
    subtitle: "For the Entire Family",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80",
    features: ["Exams, Cleanings & X-Rays", "Crowns & Fillings", "Extractions", "All General Procedures"],
    icon: "/icons/cleaning.svg",
  },
  {
    slug: "orthodontics",
    title: "Orthodontics",
    subtitle: "Align Your Smile",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80",
    features: ["Invisalign & Braces", "Phase I & II Treatments", "All-Digital Planning", "Free Consultation"],
    icon: "/icons/braces.svg",
  },
  {
    slug: "childrens-dentistry",
    title: "Children's Dentistry",
    subtitle: "Gentle & Fun",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    features: ["Certified Pediatric Dentists", "Kid-Friendly Environment", "Sedation Options", "Orthodontics"],
    icon: "/icons/replace.svg",
  },
  {
    slug: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    subtitle: "Your Best Smile",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80",
    features: ["Teeth Whitening", "Veneers & Bonding", "Smile Makeovers", "Gum Contouring"],
    icon: "/icons/beforeafter.svg",
  },
  {
    slug: "oral-surgery",
    title: "Oral Surgery",
    subtitle: "Specialty Services",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
    features: ["Wisdom Teeth Removal", "Implants", "Endodontics (Root Canals)", "Dentures"],
    icon: "/icons/implant.svg",
  },
  {
    slug: "emergency-care",
    title: "Emergency Care",
    subtitle: "We're Here When You Need Us",
    image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=600&q=80",
    features: ["Same-Day Appointments", "Walk-Ins Welcome", "Pain Management", "24/7 Phone Support"],
    icon: "/icons/rootcanal.svg",
  },
];

function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <Link href={`/services/${service.slug}`} className="block">
      <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 hover:border-primary/30 transition-all duration-500">
        {/* Image */}
        <div className="h-56 overflow-hidden relative">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4">
          <div>
            <p className="text-primary text-xs font-semibold tracking-wider uppercase mb-2">{service.subtitle}</p>
            <h3 className="font-bold text-gray-800 text-xl leading-tight group-hover:text-primary transition-colors duration-300">{service.title}</h3>
          </div>
          <ul className="space-y-2">
            {service.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 size={16} className="text-primary/70 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}

export default function Services() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', onSelect);
      onSelect();
    }
  }, [emblaApi, onSelect]);

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">
            What We Offer
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
            Comprehensive Dental Services
          </h2>
          <div className="flex justify-center mb-4">
            <SwashDivider color="#1B5E20" width={180} height={10} />
          </div>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            From your first checkup to a complete smile transformation, we provide
            all the dental care your family needs under one roof.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="flex-[0_0_calc(85%-9px)] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(100%/3-16px)] min-w-0"
                >
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-primary text-gray-800 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-primary text-gray-800 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'bg-primary w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/services"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-10 py-4 rounded-[6px] transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 text-base"
          >
            View All Services
          </a>
        </div>
      </div>
    </section>
  );
}
