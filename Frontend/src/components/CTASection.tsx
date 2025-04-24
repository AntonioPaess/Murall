"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })
  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-card z-0"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12 shadow-xl mb-24"
          >
            <div className="flex flex-col md:flex-row gap-10 items-center">
              {/* Left content */}
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-primary-foreground">
                  Pronto para <span className="text-primary">multiplicar</span> seu alcance?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Junte-se a milhares de blogueiros que estão expandindo seu público e compartilhando conteúdo de forma colaborativa.
                </p>

                <div className="hidden md:flex items-center space-x-6 mb-6">
                  <div className="flex items-center">
                    <div className="p-1 rounded-full bg-primary/10 mr-2">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">Totalmente gratuito</span>
                  </div>
                  <div className="flex items-center">
                    <div className="p-1 rounded-full bg-primary/10 mr-2">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">Sem limites</span>
                  </div>
                  <div className="flex items-center">
                    <div className="p-1 rounded-full bg-primary/10 mr-2">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">Suporte dedicado</span>
                  </div>
                </div>
              </div>

              {/* Right decorative element */}
              <Link href={"/signup"}>
                <div className="flex-shrink-0 w-64 h-64 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full opacity-30 animate-pulse"></div>
                  <div className="absolute inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full"
                    >
                      {/* Circular dots pattern */}
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-3 h-3 rounded-full bg-primary"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: `rotate(${i * 30}deg) translateY(-120px) translateX(-50%)`
                          }}
                        />
                      ))}
                    </motion.div>
                    <ArrowRight className="h-12 w-12 text-primary absolute" />
                  </div>
                </div>
              </Link>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}