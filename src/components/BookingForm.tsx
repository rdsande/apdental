"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Calendar, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SwashDivider from "./SwashDivider";

const services = [
  "General Dentistry",
  "Orthodontics",
  "Cosmetic Dentistry",
  "Children's Dentistry",
  "Oral Surgery",
  "Emergency Care",
  "Teeth Whitening",
  "Dental Implants",
];

const times = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM",
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  message: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  preferred_date: "",
  preferred_time: "",
  message: "",
};

export default function BookingForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: formRef, inView: formInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: sbError } = await supabase
        .from("appointments")
        .insert([{ ...form, status: "pending" }]);

      if (sbError) throw sbError;
      setSuccess(true);
      setForm(initialForm);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="book" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left info */}
          <div
            ref={titleRef}
            className={`transition-all duration-700 ${
              titleInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">
              Get Started
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4 leading-tight">
              Book Your Appointment
            </h2>
            <SwashDivider color="#0B7C0D" width={180} height={10} className="mb-6" />
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              Take the first step toward your best smile. Fill out the form and
              our team will confirm your appointment within 24 hours.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                "Free consultation for new patients",
                "Flexible scheduling — including evenings & weekends",
                "All insurance plans accepted",
                "Instant confirmation via email & SMS",
              ].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={14} className="text-primary" />
                  </div>
                  <span className="text-gray-700">{f}</span>
                </div>
              ))}
            </div>

            {/* Visual */}
            <div className="mt-12 relative rounded-3xl overflow-hidden h-56 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                alt="Dental clinic"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end p-6">
                <p className="text-white font-semibold text-lg">
                  A healthier smile is just one click away.
                </p>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div
            ref={formRef}
            className={`transition-all duration-700 ${
              formInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {success ? (
              <div className="bg-primary-light/50 border border-primary/20 rounded-3xl p-12 text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-3">
                  Appointment Requested!
                </h3>
                <p className="text-gray-500 mb-6">
                  We&apos;ve received your request and will confirm your appointment
                  within 24 hours via email.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-primary text-white font-semibold px-8 py-3 rounded-[6px] hover:bg-primary-dark transition-colors"
                >
                  Book Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-gray-50 rounded-3xl p-8 border border-gray-100 space-y-5"
              >
                <h3 className="text-xl font-bold text-gray-700 flex items-center gap-2">
                  <Calendar className="text-primary" size={22} />
                  Schedule a Visit
                </h3>

                {/* Row 1 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900 text-sm bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+1 (234) 567-890"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900 text-sm bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900 text-sm bg-white transition-all"
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Required *
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900 text-sm bg-white transition-all"
                  >
                    <option value="">Select a service...</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Date & Time */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="preferred_date"
                      value={form.preferred_date}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900 text-sm bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Time *
                    </label>
                    <select
                      name="preferred_time"
                      value={form.preferred_time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900 text-sm bg-white transition-all"
                    >
                      <option value="">Select time...</option>
                      {times.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any specific concerns or requests..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900 text-sm bg-white transition-all resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-xl">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-semibold py-4 rounded-[6px] transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Calendar size={18} />
                      Confirm Appointment
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  By booking, you agree to our privacy policy. We will never
                  share your information.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
