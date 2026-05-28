import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "AP Dental - Professional Dental Care",
  description:
    "AP Dental provides exceptional, comprehensive dental care for the whole family. Book your appointment today.",
  keywords:
    "dental, dentist, teeth, oral care, dental clinic, AP Dental",
  icons: {
    icon: "/icon.jpg",
  },
  openGraph: {
    title: "AP Dental - Professional Dental Care",
    description:
      "Exceptional dental care for the whole family. Modern, compassionate, professional.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
