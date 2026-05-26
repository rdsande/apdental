"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";


export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = heroRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-gray-100"
      ref={heroRef}
    >
      {/* ── Green left panel (curved right edge) ── */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {/* Curved green panel: occupies ~58% width, concave right edge */}
          <path
            d="M0,0 L62,0 C42,25 42,75 62,100 L0,100 Z"
            fill="#0B7C0D"
          />
        </svg>
      </div>

      {/* Subtle dot texture on green panel */}
      <div className="absolute inset-y-0 left-0 w-[58%] opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── Right — family photo ── */}
      <div className="absolute top-[60px] bottom-0 right-0 w-[50%] flex items-end justify-center pointer-events-none">
        <Image
          src="/dental.png"
          alt="Happy family with healthy smiles"
          width={680}
          height={780}
          className="object-contain object-bottom w-full h-[95%]"
          priority
        />
      </div>

      {/* ── Left content (sits above the green layer) ── */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
          <div className="w-full lg:w-[48%] flex flex-col gap-5 py-28">

            {/* Headline */}
            <h1
              className="reveal opacity-0 text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] text-white"
              style={{ animationDelay: "0.1s" }}
            >
              Affordable,
              <br />
              <span className="text-primary-light">family-focused</span>
              <br />
              dental care.
            </h1>

            {/* Sub */}
            <p
              className="reveal opacity-0 text-white/80 text-sm leading-relaxed max-w-sm"
              style={{ animationDelay: "0.25s" }}
            >
              AP Dental delivers exceptional, compassionate care for the whole
              family — from routine cleanings to advanced cosmetic treatments.
            </p>

            {/* CTAs */}
            <div
              className="reveal opacity-0 flex flex-wrap gap-4"
              style={{ animationDelay: "0.4s" }}
            >
              <a
                href="#book"
                className="flex items-center gap-2 bg-white text-primary hover:bg-primary-light font-bold px-6 py-3 rounded-[6px] transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 text-sm"
              >
                <Calendar size={18} />
                Book an Appointment
              </a>
              <a
                href="#services"
                className="flex items-center gap-2 border-2 border-white/60 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-[6px] transition-all duration-200 text-sm"
              >
                View Services
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom white wave (same curve as reference) ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "100px" }}
        >
          <path
            d="M0,100 L0,60 C180,20 360,0 720,30 C1080,60 1260,80 1440,55 L1440,100 Z"
            fill="#F9FAFB"
          />
        </svg>
      </div>
    </section>
  );
}
