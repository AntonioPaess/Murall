"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import {
  Settings,
  Lock,
  MessagesSquare,
  MousePointerClick,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import Features from "@/components/Features";
import FAQSection from "@/components/FAQSection";
import StepsSection from "@/components/StepsSection";

const HowItWorksPage = () => {
  const featuresList = [
    {
      icon: <MousePointerClick className="h-10 w-10" />,
      title: "Alcance Direcionado",
      description:
        "Nossa tecnologia conecta seu conteúdo aos leitores que realmente têm interesse no seu nicho.",
      hover: false,
    },
    {
      icon: <MessagesSquare className="h-10 w-10" />,
      title: "Comentários Integrados",
      description:
        "Sistema de comentários que facilita o engajamento e o feedback dos leitores de forma centralizada.",
      hover: false,
    },
    {
      icon: <Settings className="h-10 w-10" />,
      title: "Personalização Completa",
      description:
        "Adapte sua presença na plataforma conforme sua identidade visual e preferências.",
      hover: false,
    },
    {
      icon: <Lock className="h-10 w-10" />,
      title: "Segurança Garantida",
      description:
        "Proteção de dados e conteúdo, assegurando que seu trabalho permaneça sempre seu.",
      hover: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar pageRefProp="Como Funciona" />

      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/50 z-0"></div>
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-primary-foreground tracking-tight">
              Como <span className="text-primary">Funciona</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground leading-relaxed">
              Descubra como o Murall pode transformar seu blog e conectar você a
              uma comunidade vibrante de criadores de conteúdo.
            </motion.p>
          </div>
        </div>
      </section>

      <StepsSection />
      <Features featureItems={featuresList} />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
