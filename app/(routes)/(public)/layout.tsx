import { Footer } from "@/components/system/Footer";
import { Navbar } from "@/components/system/Navbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-full">{children}</div>
      <Footer />
    </>
  );
};
export default PublicLayout;
