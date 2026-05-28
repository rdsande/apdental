"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import SwashDivider from "./SwashDivider";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "Book Appointment", href: "/booking" },
];

const services = [
  "General Dentistry",
  "Orthodontics",
  "Cosmetic Dentistry",
  "Children's Dentistry",
  "Oral Surgery",
  "Emergency Care",
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#BEC6D1] text-[#0D2436]">
      {/* CTA Banner */}
      <div className="bg-primary-light py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Ready for Your Healthiest Smile?
            </h3>
            <p className="text-gray-600">
              Book your appointment today and take the first step.
            </p>
          </div>
          <a
            href="/booking"
            className="flex-shrink-0 bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-[6px] transition-all duration-200 hover:shadow-xl"
          >
            Book Appointment
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand & Global Contacts */}
        <div className="flex flex-col gap-5">
          <div>
            <Image
              src="/logo.png"
              alt="AP Dental"
              width={130}
              height={45}
              className="object-contain mb-4"
            />
            <SwashDivider color="#1B5E20" width={120} height={8} className="mb-4" />
            <p className="text-[#334155] text-sm leading-relaxed">
              Delivering exceptional dental care with compassion and cutting-edge
              technology. Your smile is our mission.
            </p>
          </div>

          {/* Global Contacts & Hours */}
          <div className="text-[#334155] text-xs space-y-2 border-t border-[#0D2436]/10 pt-4">
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-primary flex-shrink-0" />
              <a href="mailto:info@apdental.com" className="hover:text-primary transition-colors">
                info@apdental.com
              </a>
            </div>
            <div className="flex items-start gap-2">
              <Clock size={14} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#0D2436]">Global Hours</p>
                <p>Mon–Fri: 8:00 AM – 6:00 PM</p>
                <p>Saturday: 9:00 AM – 3:00 PM</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 bg-white/40 text-[#0D2436] hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:pl-6">
          <h4 className="font-bold text-[#0D2436] mb-5 text-lg">Quick Links</h4>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[#334155] hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-[#0D2436] transition-colors" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Location 1: London Health Centre */}
        <div className="flex flex-col">
          <h4 className="font-bold text-[#0D2436] mb-5 text-lg">Msasani Clinic</h4>
          
          {/* Card Container */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md border border-white/50 flex flex-col h-[340px] group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            {/* Live Interactive Map Iframe */}
            <div className="h-[160px] w-full relative">
              <iframe
                title="London Health Centre Map"
                src="https://maps.google.com/maps?q=London%20Health%20Centre,%20Msasani,%20Dar%20es%20salaam&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Info Body */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded inline-block mb-1.5 uppercase tracking-wider">
                  London Health Centre
                </div>
                <p className="text-[#0D2436] font-bold text-sm">Msasani</p>
                <p className="text-gray-500 text-[11px] leading-tight">Dar es Salaam, Tanzania</p>
              </div>

              <div className="border-t border-gray-100 pt-3 flex flex-col gap-1">
                <a href="tel:+255745542542" className="text-xs text-primary font-bold hover:underline">
                  📞 +255 745 542 542
                </a>
                <a href="tel:+255787023252" className="text-xs text-primary font-bold hover:underline">
                  📞 +255 787 023 252
                </a>
                <a 
                  href="https://maps.app.goo.gl/8xQZwXjy6g8V7F7M9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] text-gray-400 hover:text-primary underline mt-1 block"
                >
                  View on Google Maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Location 2: Dr. Imran's Polyclinic */}
        <div className="flex flex-col">
          <h4 className="font-bold text-[#0D2436] mb-5 text-lg">Upanga Clinic</h4>
          
          {/* Card Container */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md border border-white/50 flex flex-col h-[340px] group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            {/* Live Interactive Map Iframe */}
            <div className="h-[160px] w-full relative">
              <iframe
                title="Dr. Imran's Polyclinic Map"
                src="https://maps.google.com/maps?q=Dr%20Imrans%20Polyclinic,%20Upanga,%20Dar%20es%20salaam&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Info Body */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded inline-block mb-1.5 uppercase tracking-wider">
                  Dr Imrans Polyclinic
                </div>
                <p className="text-[#0D2436] font-bold text-sm">Upanga</p>
                <p className="text-gray-500 text-[11px] leading-tight">Ali Hassan Mwinyi Road, TZ</p>
              </div>

              <div className="border-t border-gray-100 pt-3 flex flex-col gap-1">
                <a href="tel:+255685722200" className="text-xs text-primary font-bold hover:underline">
                  📞 +255 685 722 200
                </a>
                <span className="text-[10px] text-gray-400 italic">Emergency services active</span>
                <a 
                  href="https://maps.app.goo.gl/VyFeESBYCadtnNnCA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] text-gray-400 hover:text-primary underline mt-1 block"
                >
                  View on Google Maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#0D2436]/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-[#475569]">
          <p>© {new Date().getFullYear()} AP Dental. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
