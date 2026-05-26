"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown, Calendar } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "About Us", href: "#about" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "General Dentistry",
  "Orthodontics",
  "Cosmetic Dentistry",
  "Children's Dentistry",
  "Oral Surgery",
  "Emergency Care",
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        scrolled ? "shadow-md shadow-gray-100" : "border-b border-gray-100"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-0 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-10">
          <Image
            src="/logo.png"
            alt="AP Dental"
            width={140}
            height={50}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <li key={link.label} className="relative group">
                <button
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  {link.label}
                  <ChevronDown size={15} className="transition-transform group-hover:rotate-180" />
                </button>
                {/* Dropdown */}
                <div
                  className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl shadow-primary/10 border border-primary-light/50 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0"
                >
                  {services.map((s) => (
                    <a
                      key={s}
                      href="#services"
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary-light/50 transition-colors"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </li>
            ) : (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            )
          )}
        </ul>

        {/* CTA */}
        <a
          href="#book"
          className="hidden lg:flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-[6px] bg-primary hover:bg-primary-dark text-white transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
        >
          <Calendar size={15} />
          Book Appointment
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen bg-white shadow-lg" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-medium text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#book"
            className="mt-2 bg-primary text-white font-semibold px-6 py-3 rounded-[6px] text-center transition-colors hover:bg-primary-dark"
            onClick={() => setIsOpen(false)}
          >
            Book Appointment
          </a>
        </div>
      </div>
    </header>
  );
}
