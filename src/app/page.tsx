import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import About from "@/components/About";
import VideoSection from "@/components/VideoSection";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import DoctorHighlight from "@/components/DoctorHighlight";
import BookingForm from "@/components/BookingForm";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <WhyUs />
      <VideoSection />
      <About />
      <Testimonials />
      <Gallery />
      <DoctorHighlight />
      <BookingForm />
    </main>
  );
}
