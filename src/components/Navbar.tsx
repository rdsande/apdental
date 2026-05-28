"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown, Calendar, Search } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "General Dentistry", href: "/services/general-dentistry", desc: "Routine checkups, cleanings, fillings, and preventive care" },
  { label: "Orthodontics", href: "/services/orthodontics", desc: "Braces, Invisalign, and teeth alignment" },
  { label: "Cosmetic Dentistry", href: "/services/cosmetic-dentistry", desc: "Whitening, veneers, and smile makeovers" },
  { label: "Children's Dentistry", href: "/services/childrens-dentistry", desc: "Gentle dental care for kids" },
  { label: "Oral Surgery", href: "/services/oral-surgery", desc: "Extractions, implants, and surgical procedures" },
  { label: "Emergency Care", href: "/services/emergency-care", desc: "Same-day urgent dental treatment" },
];

const allPages = [
  { label: "Home", href: "/", desc: "Welcome to AP Dental" },
  { label: "About Us", href: "/about", desc: "Learn about our clinic and team" },
  { label: "Services", href: "/services", desc: "Browse our dental services" },
  { label: "Gallery", href: "/gallery", desc: "View our clinic and facilities" },
  { label: "Contact", href: "/contact", desc: "Get in touch with us" },
  { label: "Book Appointment", href: "/booking", desc: "Schedule your visit" },
  ...services,
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResults = searchQuery.length > 1
    ? allPages.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
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
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-primary/10 border border-primary-light/50 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0"
                >
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary-light/50 transition-colors"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Search + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2.5 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-full transition-all"
            title="Search"
          >
            <Search size={20} />
          </button>
          <Link
            href="/booking"
            className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-[6px] bg-primary hover:bg-primary-dark text-white transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
          >
            <Calendar size={15} />
            Book Appointment
          </Link>
        </div>

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
          <button
            onClick={() => { setIsOpen(false); setSearchOpen(true); }}
            className="flex items-center gap-2 font-medium text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100"
          >
            <Search size={18} />
            Search
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-medium text-gray-700 hover:text-primary transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="mt-2 bg-primary text-white font-semibold px-6 py-3 rounded-[6px] text-center transition-colors hover:bg-primary-dark block"
            onClick={() => setIsOpen(false)}
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </header>

    {/* Search Overlay */}
    {searchOpen && (
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setSearchOpen(false); setSearchQuery(""); }} />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
            <Search size={22} className="text-gray-400 flex-shrink-0" />
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services, pages..."
              className="flex-1 text-lg outline-none text-gray-800 placeholder:text-gray-400"
            />
            <button
              onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {searchQuery.length > 1 ? (
              filteredResults.length > 0 ? (
                <div className="py-2">
                  {filteredResults.map((result) => (
                    <Link
                      key={result.href}
                      href={result.href}
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                      className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-gray-800">{result.label}</p>
                        <p className="text-sm text-gray-500">{result.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-8 text-center text-gray-500">
                  <p className="text-lg font-medium mb-1">No results found</p>
                  <p className="text-sm">Try searching for "dentistry", "booking", or "contact"</p>
                </div>
              )
            ) : (
              <div className="px-6 py-6 text-gray-500 text-sm">
                <p className="font-medium text-gray-700 mb-3">Popular searches</p>
                <div className="flex flex-wrap gap-2">
                  {["General Dentistry", "Book Appointment", "Emergency", "Orthodontics"].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
    </>
  );
}
