"use client";

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

const facilities = [
  {
    url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=1200&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=1200&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1200&q=80",
  },
];

export default function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const lightboxPrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? facilities.length - 1 : prev - 1));
  };

  const lightboxNext = () => {
    setLightboxIndex((prev) => (prev === facilities.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      {/* Full width container */}
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-12 px-6">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
            Our Facility
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Gallery
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take a virtual tour of our state-of-the-art facilities
          </p>
        </div>

        {/* Carousel */}
        <div className="relative w-full">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {facilities.map((item, index) => (
                <div
                  key={index}
                  className="flex-[0_0_calc(100%-16px)] md:flex-[0_0_calc(100%/3-16px)] min-w-0"
                >
                  <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg cursor-pointer group" onClick={() => openLightbox(index)}>
                    <img
                      src={item.url}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <ZoomIn className="text-white" size={32} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 hover:text-primary p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 hover:text-primary p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {facilities.map((_, index) => (
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
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2 z-10"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          <button
            onClick={lightboxPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors p-3 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={40} />
          </button>

          <button
            onClick={lightboxNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors p-3 z-10"
            aria-label="Next image"
          >
            <ChevronRight size={40} />
          </button>

          <div className="relative max-w-5xl max-h-[90vh] px-4">
            <img
              src={facilities[lightboxIndex].url}
              alt={`Gallery image ${lightboxIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {lightboxIndex + 1} / {facilities.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
