import { motion, useInView } from 'framer-motion'
import React, { useRef } from 'react'

const faqs = [
    {
        question: "O Murall é gratuito?",
        answer: "Sim, o Murall é completamente gratuito para todos os criadores de conteúdo. Não cobramos taxas de inscrição ou mensalidades para usar nossas funcionalidades principais."
    },
    {
        question: "Como o Murall aumenta meu alcance?",
        answer: "Através de nossa rede de blogs conectados, algoritmo de recomendação inteligente e ferramentas de compartilhamento cruzado, seu conteúdo é exposto a um público mais amplo e direcionado ao seu nicho."
    },
    {
        question: "Posso manter minha identidade visual?",
        answer: "Absolutamente! O Murall permite que você personalize sua presença na plataforma para manter consistência com a identidade visual do seu blog."
    },
    {
        question: "É possível integrar com outras plataformas?",
        answer: "Sim, oferecemos APIs e integrações com as principais plataformas de blogs e CMS do mercado, facilitando a sincronização de conteúdo sem esforço adicional."
    }
];

const FAQSection = () => {
    const faqRef = useRef(null);
    const faqInView = useInView(faqRef, { once: true, amount: 0.3 });

    return (
        <section ref={faqRef} className="py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-muted/30 z-0 pointer-events-none" />
            <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>

            <div className="container relative z-10 mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary-foreground tracking-tight">
                        Perguntas <span className="text-primary">Frequentes</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Tire suas dúvidas sobre como o Murall pode ajudar a expandir seu alcance online.
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-md hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                            >
                                <h3 className="text-xl font-semibold mb-3 text-primary-foreground flex items-center">
                                    <span className="text-primary mr-2 text-2xl">Q.</span>
                                    {faq.question}
                                </h3>
                                <p className="text-muted-foreground pl-6">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-muted/10 to-muted/30 z-0 pointer-events-none" />
        </section>
    )
}

export default FAQSection