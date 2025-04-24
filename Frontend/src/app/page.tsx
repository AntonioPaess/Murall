import PublicRouteChecker from "@/components/auth/PublicRouteChecker";
import Navbar from "../components/navbar";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <PublicRouteChecker>
      <main className="min-h-screen bg-background antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <div className="relative z-10">
          <Navbar />
          <Hero />
        </div>
      </main>
    </PublicRouteChecker>
  );
}
