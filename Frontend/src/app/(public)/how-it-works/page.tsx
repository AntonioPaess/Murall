"use client";

import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import StepsSection from "@/components/StepsSection";
import { motion } from "framer-motion";

import {
  Settings,
  Lock,
  MessagesSquare,
  MousePointerClick,
  ChevronDown,
} from "lucide-react";


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
    <div className="min-h-screen flex flex-col bg-[#0f172a]">
      <Navbar pageRefProp="Como Funciona" />

      {/* Hero Section */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#131c31] to-[#1a2234] z-0"></div>

        {/* Animated Blobs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 0.15,
            scale: 1.2,
            x: [0, 10, 0],
            y: [0, -15, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-20 left-10 w-96 h-96 rounded-full bg-[#2f86c8]/30 blur-[100px]"
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 0.15,
            scale: 1.3,
            x: [0, -15, 0],
            y: [0, 10, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5
          }}
          className="absolute bottom-20 right-10 w-[30rem] h-[30rem] rounded-full bg-primary/20 blur-[120px]"
        ></motion.div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white tracking-tight">
                Como <span className="text-[#2f86c8] inline-block relative"> Funciona </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto"
            >
              Descubra como o Murall pode transformar seu blog e conectar você a
              uma comunidade vibrante de criadores de conteúdo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10"
            >
              <a href="#steps" className="inline-flex items-center justify-center">
                <motion.div
                  className="flex flex-col items-center"
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                >
                  <span className="text-gray-400 mb-1">Saiba mais</span>
                  <ChevronDown />
                </motion.div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <div id="steps">
        <StepsSection />
      </div>
      <Features featureItems={featuresList} />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HowItWorksPage;