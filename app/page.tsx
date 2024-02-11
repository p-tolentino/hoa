import { Navbar } from "@/components/system/Navbar";
import Homepage from "./(routes)/(public)/homepage/page";
import { Footer } from "@/components/system/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Homepage />;
      <Footer />
    </>
  );
}
