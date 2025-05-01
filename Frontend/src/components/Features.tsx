"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface FeaturesItem {
  icon: React.ReactNode
  title: string
  description: string
  hover?: boolean
  href?: string
}

interface FeaturesProps {
  featureItems: FeaturesItem[]
}

const Features: React.FC<FeaturesProps> = ({ featureItems }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)



  const isHeadingInView = useInView(headingRef, {
    once: true,
    amount: 0.5, 
  })

  const isCardsInView = useInView(cardsRef, {
    once: true,
    amount: 0.1, 
    margin: "0px 0px -100px 0px",
  })

  return (
    <section id="features" ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/50 z-0"></div>

      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary-foreground tracking-tight">
            Por que escolher o <span className="text-primary">Murall</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Oferecemos ferramentas e recursos exclusivos para impulsionar seu blog e expandir seu alcance na comunidade
            digital.
          </p>
        </motion.div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featureItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              <Card className="h-full overflow-hidden border border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
                <CardContent className="p-6">
                  {item.href ? (
                    <Link href={item.href}>
                      <div className="flex flex-col h-full">
                        <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-4 mb-5 w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          <div className="text-primary">{item.icon}</div>
                        </div>

                        <h3 className="text-xl font-semibold mb-3 text-primary-foreground group-hover:text-primary transition-colors duration-300">
                          {item.title}
                        </h3>

                        <p className="text-muted-foreground flex-grow mb-4">{item.description}</p>
                        <div
                          className={
                            item.hover
                              ? `flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-0 group-hover:translate-x-1`
                              : `hidden`
                          }
                        >
                          <span className="text-sm font-medium mr-1">Saiba mais</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex flex-col h-full">
                      <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-4 mb-5 w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <div className="text-primary">{item.icon}</div>
                      </div>

                      <h3 className="text-xl font-semibold mb-3 text-primary-foreground group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>

                      <p className="text-muted-foreground flex-grow mb-4">{item.description}</p>
                      <div
                        className={
                          item.hover
                            ? `flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-0 group-hover:translate-x-1`
                            : `hidden`
                        }
                      >
                        <span className="text-sm font-medium mr-1">Saiba mais</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features