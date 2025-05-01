import PublicRouteChecker from "@/components/auth/PublicRouteChecker";
import CTASection from "@/components/CTASection";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Globe, Users, TrendingUp, Shield, ArrowRight } from "lucide-react"
import Navbar from "@/components/Navbar";

const featureItemsList = [
  {
      icon: <Globe className="h-10 w-10" />,
      title: "Alcance Global",
      description: "Expandimos sua visibilidade para além das fronteiras locais, conectando você a leitores de todo o mundo.",
      hover: true,
      href: "/how-it-works"
  },
  {
      icon: <Users className="h-10 w-10" />,
      title: "Comunidade Engajada",
      description: "Faça parte de uma rede ativa de criadores que colaboram e apoiam o crescimento mútuo.",
      hover: true,
      href: "/how-it-works"
  },
  {
      icon: <TrendingUp className="h-10 w-10" />,
      title: "Métricas Avançadas",
      description: "Acompanhe o crescimento do seu conteúdo com análises detalhadas e insights valiosos.",
      hover: true,
      href: "/how-it-works"
  },
  {
      icon: <Shield className="h-10 w-10" />,
      title: "Proteção de Conteúdo",
      description: "Seu trabalho é valorizado e protegido em nossa plataforma, garantindo seus direitos autorais.",
      hover: true,
      href: "/how-it-works"
  },
]


export default function Home() {
  return (
    <PublicRouteChecker>
      <main className="bg-background antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <Features featureItems={featureItemsList} />
          <CTASection />
          <Footer />
        </div>
      </main>
    </PublicRouteChecker>
  );
}
