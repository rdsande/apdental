"use client";

import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { servicesData } from "@/lib/data";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    type: "enquiry",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "255745542542";
    const message = `Hello AP Dental!\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service || "General enquiry"}\nType: ${formData.type === "booking" ? "Booking Request" : "General Enquiry"}\n\nPlease assist me.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group animate-bounce"
        style={{ animationDuration: "3s" }}
        title="Chat on WhatsApp"
      >
        {/* Pulse Rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
        <span className="absolute inset-0 rounded-full bg-[#25D366]/20" />

        {/* Icon */}
        <MessageSquare size={26} className="relative z-10 fill-white stroke-none" />

        {/* Tooltip / Label */}
        <span className="absolute right-16 bg-white text-gray-800 text-xs font-semibold px-3 py-2 rounded-xl shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Chat with us!
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Card */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="bg-[#25D366] px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageSquare size={20} className="text-white fill-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">WhatsApp Chat</h3>
                  <p className="text-white/80 text-xs">AP Dental</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 outline-none transition-all text-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+255 7XX XXX XXX"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 outline-none transition-all text-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Interested In
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 outline-none transition-all text-gray-800 bg-white"
                >
                  <option value="">Select a service...</option>
                  {servicesData.map((service) => (
                    <option key={service.slug} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inquiry Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "booking" })}
                    className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      formData.type === "booking"
                        ? "border-[#25D366] bg-[#25D366]/10 text-[#25D366]"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    Book Appointment
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "enquiry" })}
                    className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      formData.type === "enquiry"
                        ? "border-[#25D366] bg-[#25D366]/10 text-[#25D366]"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    General Enquiry
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 mt-2"
              >
                <Send size={18} />
                Start Chat on WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
