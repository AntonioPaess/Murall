"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { Users, Target, Rocket, Award, Quote } from "lucide-react";

import CTASection from "@/components/CTASection";
import MissionSection from "@/components/MissionSection";
import Features from "@/components/Features";

const OurMissionPage = () => {
  const valuesRef = useRef(null);
  const timelineRef = useRef(null);

  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.3 });

  const values = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Comunidade",
      description:
        "Acreditamos no poder da colaboração e no apoio mútuo entre criadores de conteúdo.",
      hover: false,
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Visibilidade",
      description:
        "Trabalhamos para que todo conteúdo de qualidade tenha a chance de alcançar seu público ideal.",
      hover: false,
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Inovação",
      description:
        "Buscamos constantemente novas maneiras de conectar criadores e leitores de forma significativa.",
      hover: false,
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Qualidade",
      description:
        "Promovemos a excelência e autenticidade em todos os conteúdos compartilhados na plataforma.",
      hover: false,
    },
  ];

  const timelineEvents = [
    {
      year: "2024",
      title: "Nascimento da Ideia",
      description:
        "O conceito do Murall surgiu da necessidade de criar um espaço colaborativo para blogs independentes.",
    },
    {
      year: "2025",
      title: "Lançamento Beta",
      description:
        "A primeira versão da plataforma foi lançada para um grupo seleto de criadores de conteúdo.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar pageRefProp="Nossa Missão" />

      {/* Hero Section */}
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
              Nossa <span className="text-primary">Missão</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground leading-relaxed">
              Estamos comprometidos em criar um ecossistema digital onde blogs e
              criadores de conteúdo possam crescer juntos, através de uma
              plataforma que valoriza a visibilidade, colaboração e qualidade.
            </motion.p>
          </div>
        </div>
      </section>

      <MissionSection />

      <Features featureItems={values} />

      {/* Timeline */}
      <section ref={timelineRef} className="py-16 relative overflow-hidden">
        <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={
                timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground tracking-tight">
              Nossa <span className="text-primary">Jornada</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto">
              De uma ideia ambiciosa a uma comunidade crescente de criadores de
              conteúdo.
            </motion.p>
          </div>

          <div className="relative max-w-4xl mx-auto mt-20">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border"></div>

            {/* Timeline events */}
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={
                  timelineInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }
                }
                transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                className={`relative mb-12 flex ${
                  index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                }`}>
                <div className="md:w-1/2"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-background"></div>
                  </div>
                </div>
                <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-md md:w-1/2 z-10">
                  <span className="text-primary font-bold text-xl">
                    {event.year}
                  </span>
                  <h3 className="text-xl font-semibold mt-2 mb-3 text-primary-foreground">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      <Footer />
    </div>
  );
};

export default OurMissionPage;
