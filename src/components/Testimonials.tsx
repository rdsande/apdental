"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import SwashDivider from "./SwashDivider";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient since 2019",
    avatar: "SJ",
    rating: 5,
    text: "AP Dental completely transformed my smile! The team is incredibly professional and made me feel comfortable throughout every procedure. I couldn't be happier with my results.",
  },
  {
    name: "Michael Chen",
    role: "Patient since 2021",
    avatar: "MC",
    rating: 5,
    text: "I was terrified of dentists before I found AP Dental. Their gentle approach and state-of-the-art equipment made my treatment painless. Highly recommend!",
  },
  {
    name: "Emily Rodriguez",
    role: "Patient since 2020",
    avatar: "ER",
    rating: 5,
    text: "The entire staff is warm, welcoming, and knowledgeable. My kids actually look forward to their dental appointments now! That says it all.",
  },
  {
    name: "David Williams",
    role: "Patient since 2022",
    avatar: "DW",
    rating: 5,
    text: "Got my Invisalign done here and the results are amazing. The process was explained clearly and the team was always available to answer my questions.",
  },
  {
    name: "Priya Patel",
    role: "Patient since 2018",
    avatar: "PP",
    rating: 5,
    text: "After years of searching for the right dentist, I found AP Dental. They're thorough, caring, and truly invested in your long-term oral health.",
  },
  {
    name: "James Thompson",
    role: "Patient since 2023",
    avatar: "JT",
    rating: 5,
    text: "Same-day emergency appointment when I had a terrible toothache. They were efficient, kind, and solved the problem quickly. Lifesavers!",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const visible = [
    testimonials[activeIndex % testimonials.length],
    testimonials[(activeIndex + 1) % testimonials.length],
    testimonials[(activeIndex + 2) % testimonials.length],
  ];

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-primary-light/20 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">
            Patient Stories
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
            What Our Patients Say
          </h2>
          <div className="flex justify-center mb-4">
            <SwashDivider color="#0B7C0D" width={180} height={10} />
          </div>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Real stories from real patients who trust AP Dental with their smiles.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {visible.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 relative flex flex-col gap-4 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
            >
              <Quote className="text-primary-light/80 absolute top-6 right-6" size={36} />
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              {/* Text */}
              <p className="text-gray-600 leading-relaxed flex-1 text-sm">
                &ldquo;{t.text}&rdquo;
              </p>
              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() =>
              setActiveIndex((p) => (p - 1 + testimonials.length) % testimonials.length)
            }
            className="w-12 h-12 rounded-[6px] border-2 border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2 items-center">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === activeIndex % testimonials.length
                    ? "w-6 h-3 bg-primary"
                    : "w-3 h-3 bg-gray-200 hover:bg-primary/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() =>
              setActiveIndex((p) => (p + 1) % testimonials.length)
            }
            className="w-12 h-12 rounded-[6px] border-2 border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
