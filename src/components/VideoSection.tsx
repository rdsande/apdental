"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Play } from "lucide-react";

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="bg-white relative z-10 pt-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">
            Clinic Tour
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700">
            See AP Dental in Action
          </h2>
        </div>

        {/* Video — overlaps into the green section below */}
        <div
          ref={ref}
          className={`-mb-32 relative z-10 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {playing ? (
            <div className="aspect-video w-full">
              {/* Replace YOUR_VIDEO_ID with your actual YouTube video ID */}
              <iframe
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&rel=0"
                className="w-full h-full"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                title="AP Dental Clinic Promo"
              />
            </div>
          ) : (
            <div
              className="relative aspect-video cursor-pointer group"
              onClick={() => setPlaying(true)}
            >
              {/* Thumbnail */}
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1400&q=80"
                alt="AP Dental clinic"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Animated ping ring */}
                <span className="absolute w-28 h-28 rounded-full bg-primary/30 animate-ping" />
                <span className="absolute w-24 h-24 rounded-full bg-primary/20" />
                <div className="relative w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Play className="text-white ml-1" size={30} fill="white" />
                </div>
              </div>

              {/* Caption */}
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-bold text-lg drop-shadow">AP Dental — Clinic Promo</p>
                <p className="text-sm text-white/70 drop-shadow">Click to play</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
