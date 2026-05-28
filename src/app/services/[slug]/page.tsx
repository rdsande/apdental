import { servicesData } from "@/lib/data";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { CheckCircle2, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import RelatedServiceCard from "@/components/RelatedServiceCard";

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={service.title}
        subtitle={service.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
        badge="Service Details"
        image={service.image}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div className="relative">
              <img
                src={service.image}
                alt={service.title}
                className="rounded-3xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-white px-6 py-4 rounded-2xl shadow-xl">
                <p className="text-sm font-medium">Starting from</p>
                <p className="text-xl font-bold">{service.priceNote}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src={service.icon} alt={service.title} className="w-12 h-12 object-contain" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{service.title}</h2>
                  <p className="text-primary font-medium">{service.subtitle}</p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
                {service.fullDesc}
              </p>

              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-gray-800 mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Calendar size={18} />
                  Book This Service
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary font-semibold px-6 py-3 rounded-full transition-all duration-200"
                >
                  <ArrowLeft size={18} />
                  View All Services
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Other Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesData
                .filter((s) => s.slug !== service.slug)
                .slice(0, 3)
                .map((otherService) => (
                  <RelatedServiceCard key={otherService.slug} service={otherService} />
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
