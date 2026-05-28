"use client";

import { useInView } from "react-intersection-observer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { servicesData } from "@/lib/data";

interface RelatedServiceCardProps {
  service: typeof servicesData[0];
}

export default function RelatedServiceCard({ service }: RelatedServiceCardProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg border border-gray-100 group transition-all duration-300 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="h-40 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h4 className="font-bold text-gray-800 mb-1">{service.title}</h4>
        <p className="text-primary font-medium text-sm mb-3">{service.subtitle}</p>
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-primary-dark"
        >
          Learn More
          <ArrowLeft size={14} className="rotate-180" />
        </Link>
      </div>
    </div>
  );
}
