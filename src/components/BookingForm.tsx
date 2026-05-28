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
    <section id="book" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Media & Flow Chart */}
          <div
            ref={titleRef}
            className={`lg:col-span-5 transition-all duration-700 space-y-10 ${
              titleInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div>
              <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
                Seamless booking
              </p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0D2436] tracking-tight mb-4">
                Schedule Your Smile Today
              </h2>
              <SwashDivider color="#1B5E20" width={140} height={8} className="mb-4" />
            </div>

            {/* Premium Overlapping Images */}
            <div className="relative h-[280px] w-full max-w-[400px] mx-auto lg:mx-0">
              {/* Back Main Image */}
              <div className="w-[75%] h-[230px] rounded-[24px] overflow-hidden shadow-lg border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&q=80"
                  alt="Happy smiling patient"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Front Overlapping Image */}
              <div className="absolute right-0 bottom-0 w-[55%] h-[160px] rounded-[20px] overflow-hidden shadow-2xl border-4 border-white translate-y-2">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80"
                  alt="Modern clinic chair"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Quick 3-Step Process (Less content, structured) */}
            <div className="space-y-6 pt-2">
              <h4 className="text-[#0D2436] font-bold text-sm uppercase tracking-wider">How it works:</h4>
              {[
                { step: "1", title: "Fill Details", desc: "Select your required dental service" },
                { step: "2", title: "Choose Slot", desc: "Pick your preferred date and hour" },
                { step: "3", title: "Confirmation", desc: "We'll confirm within 24 hours" },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary font-bold text-xs rounded-full flex items-center justify-center">
                    {s.step}
                  </div>
                  <div>
                    <h5 className="font-bold text-[#0D2436] text-sm">{s.title}</h5>
                    <p className="text-gray-400 text-xs mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Premium Booking Card */}
          <div
            ref={formRef}
            className={`lg:col-span-7 transition-all duration-700 ${
              formInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {success ? (
              <div className="bg-white rounded-[32px] p-12 text-center shadow-xl border border-gray-100/50 max-w-xl mx-auto">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                  <CheckCircle2 size={42} />
                </div>
                <h3 className="text-2xl font-extrabold text-[#0D2436] mb-3">
                  Booking Request Received!
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                  We have received your appointment request. Our clinical team will reach out to you within 24 hours to confirm your slot.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-primary-dark transition-all shadow-md hover:shadow-lg text-sm"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-[32px] p-8 lg:p-10 shadow-xl border border-gray-100/50 space-y-6 max-w-2xl mx-auto"
              >
                <div className="border-b border-gray-100 pb-5">
                  <h3 className="text-2xl font-extrabold text-[#0D2436] flex items-center gap-3">
                    <Calendar className="text-primary" size={24} />
                    Schedule a Visit
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">
                    Please provide your contact and scheduling preferences below.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Row 1: Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 text-sm bg-gray-50/50 hover:bg-gray-50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 text-sm bg-gray-50/50 hover:bg-gray-50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Service */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="+255 7XX XXX XXX"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 text-sm bg-gray-50/50 hover:bg-gray-50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                        Required Service *
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 text-sm bg-gray-50/50 hover:bg-gray-50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select service...</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Date & Time */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="preferred_date"
                        value={form.preferred_date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 text-sm bg-gray-50/50 hover:bg-gray-50 transition-all cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                        Preferred Time *
                      </label>
                      <select
                        name="preferred_time"
                        value={form.preferred_time}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 text-sm bg-gray-50/50 hover:bg-gray-50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select time...</option>
                        {times.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Additional Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Share any special requests, allergies, or concerns..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 text-sm bg-gray-50/50 hover:bg-gray-50 transition-all resize-none"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-xs bg-red-50 px-4 py-2.5 rounded-xl border border-red-100">{error}</p>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-bold py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 text-sm"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting Your Request...
                      </>
                    ) : (
                      <>
                        <Calendar size={16} />
                        Confirm Booking
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                  🔒 Secure submission. By submitting, you agree to our privacy policy. Your credentials are fully protected and never shared.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
