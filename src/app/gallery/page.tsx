"use client";

import PageHeader from "@/components/PageHeader";
import { galleryImages } from "@/lib/data";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(galleryImages.map((img) => img.category)))];

  const filteredImages = filter === "All" 
    ? galleryImages 
    : galleryImages.filter((img) => img.category === filter);

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="Take a virtual tour of our state-of-the-art facilities and meet our team."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery", href: "/gallery" }]}
        badge="Our Facility"
        image="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80"
      />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  filter === category
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <GalleryImage key={image.url} image={image} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary-light">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Visit Us in Person?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We'd love to show you around our clinics. Schedule a visit and experience the AP Dental difference firsthand.
          </p>
          <a
            href="/booking"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Book an Appointment
          </a>
        </div>
      </section>
    </>
  );
}

function GalleryImage({ image, index }: { image: typeof galleryImages[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`group relative h-80 rounded-2xl overflow-hidden shadow-md bg-white border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <img
        src={image.url}
        alt={image.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:from-primary/90 group-hover:via-primary/50 group-hover:opacity-90 transition-all duration-500" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-all duration-300">
        <span className="text-xs font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-2 inline-block">
          {image.category}
        </span>
        <h3 className="text-lg font-bold mb-1">{image.title}</h3>
        <p className="text-xs text-white/80 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          {image.desc}
        </p>
      </div>
    </div>
  );
}
