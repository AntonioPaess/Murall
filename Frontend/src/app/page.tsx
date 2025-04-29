import PublicRouteChecker from "@/components/auth/PublicRouteChecker";
import CTASection from "@/components/CTASection";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { Hero } from "@/components/hero";
import Navbar from "@/components/navbar";


export default function Home() {
  return (
    <PublicRouteChecker>
      <main className="bg-background antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <Features />
          <CTASection />
          <Footer />
        </div>
      </main>
    </PublicRouteChecker>
  );
}
