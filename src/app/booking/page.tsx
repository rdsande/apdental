import PageHeader from "@/components/PageHeader";
import BookingForm from "@/components/BookingForm";

export default function BookingPage() {
  return (
    <>
      <PageHeader
        title="Book an Appointment"
        subtitle="Schedule your visit online. Choose your preferred date, time, and service."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Book Appointment", href: "/booking" }]}
        badge="Schedule Now"
        image="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1600&q=80"
      />
      <BookingForm />
    </>
  );
}
