"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Phone, Mail, MapPin, Clock, Send, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { supabase } from "@/lib/supabase";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: sbError } = await supabase
        .from("contacts")
        .insert([{ ...form, status: "new" }]);

      if (sbError) throw sbError;
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our team. We're here to help with all your dental needs."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]}
        badge="Get in Touch"
        image="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&q=80"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Have questions about our services or need to schedule an appointment? Our team is here to help. Reach out to us through any of the channels below or fill out the form and we'll get back to you within 24 hours.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                    <p className="text-gray-600">Msasani Clinic:</p>
                    <a href="tel:+255745542542" className="text-primary font-medium hover:underline">+255 745 542 542</a>
                    <br />
                    <a href="tel:+255787023252" className="text-primary font-medium hover:underline">+255 787 023 252</a>
                    <p className="text-gray-600 mt-2">Upanga Clinic:</p>
                    <a href="tel:+255685722200" className="text-primary font-medium hover:underline">+255 685 722 200</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                    <a href="mailto:info@apdental.com" className="text-primary font-medium hover:underline">info@apdental.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Hours</h3>
                    <p className="text-gray-600">Mon–Fri: 8:00 AM – 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 9:00 AM – 3:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 bg-gray-100 text-gray-600 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-3xl p-8">
              {success ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                    <Send size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+255 123 456 789"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 bg-white appearance-none"
                    >
                      <option value="">Select a subject...</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Appointment Request">Appointment Request</option>
                      <option value="Billing Question">Billing Question</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 bg-white resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl border border-red-100">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-bold py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    {loading ? "Sending..." : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Location Cards */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100">
              <div className="h-[200px] relative">
                <iframe
                  title="London Health Centre Map"
                  src="https://maps.google.com/maps?q=London%20Health%20Centre,%20Msasani,%20Dar%20es%20salaam&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-800 text-lg mb-2">Msasani Clinic</h3>
                <p className="text-gray-600 mb-4">London Health Centre, Msasani, Dar es Salaam</p>
                <a
                  href="https://maps.app.goo.gl/8xQZwXjy6g8V7F7M9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  <MapPin size={16} />
                  Get Directions
                </a>
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100">
              <div className="h-[200px] relative">
                <iframe
                  title="Dr. Imran's Polyclinic Map"
                  src="https://maps.google.com/maps?q=Dr%20Imrans%20Polyclinic,%20Upanga,%20Dar%20es%20salaam&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-800 text-lg mb-2">Upanga Clinic</h3>
                <p className="text-gray-600 mb-4">Dr Imrans Polyclinic, Upanga, Dar es Salaam</p>
                <a
                  href="https://maps.app.goo.gl/VyFeESBYCadtnNnCA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  <MapPin size={16} />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
