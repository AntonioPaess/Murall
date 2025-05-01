"use client"

import { motion, useInView, type Variants } from "framer-motion"
import { Quote } from "lucide-react"
import { useRef } from "react"

const MissionSection = () => {
  const missionRef = useRef<HTMLElement>(null)
  const missionInView = useInView(missionRef, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -100px 0px", // Trigger earlier for smoother experience
  })

  // Animation variants for better organization and reusability
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const imageVariants: Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        delay: 0.3,
      },
    },
  }

  const quoteVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: {
      opacity: 0.2,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.4,
      },
    },
  }

  return (
    <section ref={missionRef} className="py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate={missionInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center">
            {/* Image column - increased size */}
            <motion.div className="lg:col-span-6 order-2 lg:order-1 mt-8 lg:mt-0" variants={imageVariants}>
              <div className="relative">
                {/* Gradient background with animation */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-2xl blur-sm -z-10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={missionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                />

                {/* Image container with better responsive sizing */}
                <div className="overflow-hidden rounded-xl relative w-full">
                  <motion.img
                    src="/murall-edit.png"
                    alt="Diverse group of content creators collaborating"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Gradient overlay with animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={missionInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Text column - improved spacing and animations */}
            <motion.div className="lg:col-span-6 order-1 lg:order-2" variants={itemVariants}>
              <div className="relative px-1">
                {/* Quote icon with improved animation */}
                <motion.div
                  variants={quoteVariants}
                  className="absolute -top-8 -left-4 sm:-top-10 sm:-left-6 text-primary/20"
                >
                  <Quote size={48} className="sm:size-64 md:size-72" />
                </motion.div>

                {/* Title with animation */}
                <motion.h2
                  variants={itemVariants}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary relative z-10 mb-4 sm:mb-6"
                >
                  Declaração de Missão
                </motion.h2>

                {/* Main quote with character-by-character animation */}
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-background-foreground leading-relaxed mb-4 sm:mb-6 relative z-10">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={missionInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="relative"
                  >
                    {/* Animated quote with staggered text */}
                    <span className="relative">
                      {'"Conectar e potencializar criadores de conteúdo digital, criando um ambiente colaborativo onde todos possam crescer e alcançar novos públicos, promovendo a diversidade de vozes e ideias no cenário digital brasileiro."'
                        .split("")
                        .map((char, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{
                              duration: 0.05,
                              delay: 0.6 + index * 0.01,
                              ease: "easeOut",
                            }}
                          >
                            {char}
                          </motion.span>
                        ))}
                    </span>
                  </motion.p>
                </div>

                {/* Description paragraph with animation */}
                <motion.p variants={itemVariants} className="text-sm sm:text-base text-muted-foreground relative z-10">
                  No Murall, acreditamos que a força da internet está na pluralidade de vozes. Nossa missão é derrubar
                  as barreiras que impedem bloggers independentes de alcançarem seu público ideal, oferecendo
                  ferramentas e uma comunidade de suporte que amplifica o alcance de cada criador.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MissionSection