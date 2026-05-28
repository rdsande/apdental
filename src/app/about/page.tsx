"use client";

import PageHeader from "@/components/PageHeader";
import About from "@/components/About";
import DoctorHighlight from "@/components/DoctorHighlight";
import Testimonials from "@/components/Testimonials";
import { teamMembers } from "@/lib/data";
import { useInView } from "react-intersection-observer";
import { Star, Facebook, Linkedin, Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="Learn more about our clinic, our team, and our commitment to exceptional dental care."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us", href: "/about" }]}
        badge="Introduction"
        image="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=80"
      />
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Founded over 15 years ago, AP Dental has grown from a small family practice into one of Dar es Salaam's most trusted dental clinics. Our journey began with a simple vision: to provide world-class dental care that is accessible, affordable, and delivered with genuine compassion.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Today, we serve over 5,000 patients across two convenient locations in Msasani and Upanga. Our team of board-certified dentists and specialists combines cutting-edge technology with personalized care to ensure every patient leaves with a healthier, happier smile.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that dental visits should be stress-free, comfortable, and even enjoyable. That's why we've invested in creating warm, welcoming environments and using the latest techniques to minimize discomfort and maximize results.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                alt="AP Dental Clinic Interior"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl">
                <p className="text-4xl font-bold">15+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <About />

      <DoctorHighlight />

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of experienced dentists and specialists is dedicated to providing you with the best possible care.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}

function TeamCard({ member, index }: { member: typeof teamMembers[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="h-64 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="font-bold text-gray-800 text-lg mb-1">{member.name}</h3>
        <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
        <div className="flex gap-3">
          <a href="#" className="w-8 h-8 bg-gray-100 text-gray-600 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors">
            <Facebook size={16} />
          </a>
          <a href="#" className="w-8 h-8 bg-gray-100 text-gray-600 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors">
            <Linkedin size={16} />
          </a>
          <a href="#" className="w-8 h-8 bg-gray-100 text-gray-600 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors">
            <Mail size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
