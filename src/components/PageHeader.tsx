"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href: string }[];
  badge?: string;
  image?: string;
}

export default function PageHeader({ title, subtitle, breadcrumbs, badge, image }: PageHeaderProps) {
  return (
    <section className="relative min-h-[400px] lg:min-h-[500px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('${image || "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1600&q=80"}')` 
        }}
      />
      
      {/* Grey Overlay */}
      <div className="absolute inset-0 bg-gray-900/75" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-24 pb-12">
        {/* Badge */}
        {badge && (
          <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/30 text-white font-medium px-5 py-2 rounded-full text-xs tracking-wider uppercase mb-6">
            {badge}
          </span>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight uppercase mb-4">
          {title}
        </h1>
        
        {/* Subtitle */}
        {subtitle && (
          <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">{subtitle}</p>
        )}
        
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-white/60 mt-6 pt-6 border-t border-white/10">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {index > 0 && <ChevronRight size={14} />}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-white">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
