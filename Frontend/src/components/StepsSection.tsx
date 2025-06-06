"use client"

import { motion, useInView, type Variants } from "framer-motion"
import { BarChart, Globe, Share2, UserPlus, CheckCircle } from "lucide-react"
import { useRef, useState } from "react"

const StepsSection = () => {
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const paragraphInView = useInView(paragraphRef, { once: true, amount: 0.5 })
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const steps = [
    {
      icon: <UserPlus className="h-6 w-6" />,
      title: "Cadastre-se",
      description: "Crie sua conta gratuitamente e configure seu perfil de criador de conteúdo.",
      color: "from-primary/10 to-primary/20",
      textColor: "text-primary",
      borderColor: "border-primary/30",
      shadowColor: "rgba(47, 134, 200, 0.3)",
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Compartilhe seu Blog",
      description: "Adicione seu site ou blog à nossa plataforma para começar a ganhar visibilidade.",
      color: "from-[#2f86c8]/10 to-[#2f86c8]/20",
      textColor: "text-[#2f86c8]",
      borderColor: "border-[#2f86c8]/30",
      shadowColor: "rgba(47, 134, 200, 0.3)",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Explore e Conecte",
      description: "Descubra outros criadores e estabeleça parcerias com blogs complementares ao seu.",
      color: "from-primary/10 to-primary/20",
      textColor: "text-primary",
      borderColor: "border-primary/30",
      shadowColor: "rgba(47, 134, 200, 0.3)",
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Acompanhe Resultados",
      description: "Analise as métricas e veja o crescimento do seu alcance com nossas ferramentas.",
      color: "from-[#2f86c8]/10 to-[#2f86c8]/20",
      textColor: "text-[#2f86c8]",
      borderColor: "border-[#2f86c8]/30",
      shadowColor: "rgba(47, 134, 200, 0.3)",
    },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const numberVariants: Variants = {
    hidden: { scale: 0, rotate: -45 },
    visible: (i) => ({
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        delay: 0.2 + i * 0.1,
      },
    }),
  }

  return (
    <section className="py-16 md:py-24 lg:py-28 relative overflow-hidden bg-gradient-to-b from-background to-background/80">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background z-0 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={paragraphInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={paragraphInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-3 px-4 py-1.5 bg-[#2f86c8]/10 rounded-full"
          >
            <span className="text-[#2f86c8] font-medium text-sm">Processo Simplificado</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight">
            Quatro <span className="text-[#2f86c8]">Passos Simples</span>
          </h2>

          <p
            ref={paragraphRef}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Comece a expandir seu alcance em minutos com nosso processo simplificado e intuitivo.
          </p>
        </motion.div>

        <div className="relative max-w-[1200px] mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={paragraphInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 lg:gap-10"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
                className="relative"
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div
                  className={`rounded-xl border p-6 h-full transition-transform duration-300 will-change-transform ${step.borderColor}`}
                  style={{
                    transform: activeStep === index ? "scale(1.02)" : "scale(1)",
                    boxShadow:
                      activeStep === index
                        ? `0 10px 20px ${step.shadowColor}`
                        : undefined,
                  }}
                >
                  <motion.div
                    variants={numberVariants}
                    custom={index}
                    className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-sm font-bold z-20 shadow-md"
                  >
                    {index + 1}
                  </motion.div>

                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`bg-gradient-to-br ${step.color} rounded-full p-5 w-20 h-20 flex items-center justify-center mb-6 z-10 relative shadow-lg transition-transform duration-300 transform ${
                        activeStep === index ? "scale-110" : "scale-100"
                      }`}
                    >
                      <motion.div
                        initial={{ rotate: -10, scale: 0.9 }}
                        animate={paragraphInView ? { rotate: 0, scale: 1 } : { rotate: -10, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1, type: "spring" }}
                        className={step.textColor}
                      >
                        {step.icon}
                      </motion.div>
                    </div>

                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={paragraphInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className={`text-xl font-bold mb-3 ${
                        activeStep === index ? step.textColor : "text-primary-foreground"
                      }`}
                    >
                      {step.title}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={paragraphInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="text-muted-foreground"
                    >
                      {step.description}
                    </motion.p>

                    <div className="min-h-6 mt-4 flex items-center justify-center">
                      {activeStep === index && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`flex items-center gap-1.5 ${step.textColor}`}
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Passo {index + 1}</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default StepsSection
