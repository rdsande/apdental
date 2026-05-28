"use client";

import PageHeader from "@/components/PageHeader";
import { servicesData } from "@/lib/data";
import { useInView } from "react-intersection-observer";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive dental care for the whole family, from routine checkups to advanced treatments."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]}
        badge="What We Offer"
        image="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1600&q=80"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Comprehensive Dental Care Under One Roof
            </h2>
            <p className="text-gray-600 text-lg">
              From preventive care to complex procedures, our team of specialists provides a full range of dental services to keep your smile healthy and beautiful.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary-light">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Not Sure What You Need?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Our team is here to help. Schedule a consultation and we'll assess your needs and recommend the best treatment plan for you.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Book a Consultation
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}

function ServiceCard({ service, index }: { service: typeof servicesData[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 group transition-all duration-300 hover:-translate-y-1 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <img src={service.icon} alt={service.title} className="w-10 h-10 object-contain" />
          <div>
            <h3 className="font-bold text-gray-800 text-lg">{service.title}</h3>
            <p className="text-primary font-medium text-sm">{service.subtitle}</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {service.shortDesc}
        </p>
        <ul className="space-y-2 mb-6">
          {service.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors group-hover:gap-3"
        >
          Learn More
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
