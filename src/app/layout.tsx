import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AP Dental - Professional Dental Care",
  description:
    "AP Dental provides exceptional, comprehensive dental care for the whole family. Book your appointment today.",
  keywords:
    "dental, dentist, teeth, oral care, dental clinic, AP Dental",
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
