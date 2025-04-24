"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Users, TrendingUp, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"

const featureItems = [
    {
        icon: <Globe className="h-10 w-10" />,
        title: "Alcance Global",
        description: "Expandimos sua visibilidade para além das fronteiras locais, conectando você a leitores de todo o mundo.",
        href: "/how-it-works"
    },
    {
        icon: <Users className="h-10 w-10" />,
        title: "Comunidade Engajada",
        description: "Faça parte de uma rede ativa de criadores que colaboram e apoiam o crescimento mútuo.",
        href: "/how-it-works"
    },
    {
        icon: <TrendingUp className="h-10 w-10" />,
        title: "Métricas Avançadas",
        description: "Acompanhe o crescimento do seu conteúdo com análises detalhadas e insights valiosos.",
        href: "/how-it-works"
    },
    {
        icon: <Shield className="h-10 w-10" />,
        title: "Proteção de Conteúdo",
        description: "Seu trabalho é valorizado e protegido em nossa plataforma, garantindo seus direitos autorais.",
        href: "/how-it-works"
    },
]

export default function Features() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.4 })

    return (
        <section id="features" className="py-20 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/50 z-0"></div>

            <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>

            <div ref={ref} className="container relative z-10 mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary-foreground tracking-tight">
                        Por que escolher o <span className="text-primary">Murall</span>?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Oferecemos ferramentas e recursos exclusivos para impulsionar seu blog e expandir seu alcance na comunidade digital.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {featureItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                        >
                            <Card className="h-full overflow-hidden border border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
                                <CardContent className="p-6">
                                    <Link href={item.href}>
                                        <div className="flex flex-col h-full">
                                            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-4 mb-5 w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                                <div className="text-primary">{item.icon}</div>
                                            </div>

                                            <h3 className="text-xl font-semibold mb-3 text-primary-foreground group-hover:text-primary transition-colors duration-300">
                                                {item.title}
                                            </h3>

                                            <p className="text-muted-foreground flex-grow mb-4">
                                                {item.description}
                                            </p>

                                            <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-0 group-hover:translate-x-1">
                                                <span className="text-sm font-medium mr-1">Saiba mais</span>
                                                <ArrowRight className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}