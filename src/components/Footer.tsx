"use client";

import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import SwashDivider from "./SwashDivider";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Book Appointment", href: "#book" },
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
    <footer id="contact" className="bg-gray-900 text-white">
      {/* CTA Banner */}
      <div className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Ready for Your Healthiest Smile?
            </h3>
            <p className="text-white/80">
              Book your appointment today and take the first step.
            </p>
          </div>
          <a
            href="#book"
            className="flex-shrink-0 bg-white text-primary hover:bg-primary-light font-bold px-8 py-4 rounded-[6px] transition-all duration-200 hover:shadow-xl"
          >
            Book Appointment
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Image
            src="/logo.png"
            alt="AP Dental"
            width={130}
            height={45}
            className="object-contain mb-4 brightness-0 invert"
          />
          <SwashDivider color="#D3F2D3" width={120} height={8} className="mb-4" />
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Delivering exceptional dental care with compassion and cutting-edge
            technology. Your smile is our mission.
          </p>
          <div className="flex gap-3">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-primary rounded-xl flex items-center justify-center transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-white mb-5 text-lg">Quick Links</h4>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-gray-400 hover:text-primary-light transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-primary-light transition-colors" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-bold text-white mb-5 text-lg">Our Services</h4>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s}>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-primary-light transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-primary-light transition-colors" />
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-white mb-5 text-lg">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span className="text-gray-400 text-sm">
                123 Smile Street, Suite 400
                <br />
                New York, NY 10001
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-primary flex-shrink-0" />
              <a
                href="tel:+1234567890"
                className="text-gray-400 hover:text-primary-light text-sm transition-colors"
              >
                +1 (234) 567-890
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-primary flex-shrink-0" />
              <a
                href="mailto:info@apdental.com"
                className="text-gray-400 hover:text-primary-light text-sm transition-colors"
              >
                info@apdental.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="text-gray-400 text-sm">
                <p>Mon–Fri: 8:00 AM – 6:00 PM</p>
                <p>Saturday: 9:00 AM – 3:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} AP Dental. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-light transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-light transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-light transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
