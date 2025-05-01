"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LockKeyhole, FileText, UserCheck } from 'lucide-react';
import Link from 'next/link';

const PrivacyPolicyPage = () => {
  const sectionsRef = useRef(null);
  
  const sectionsInView = useInView(sectionsRef, { once: true, amount: 0.1 });

  const privacySections = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Coleta de Dados",
      content: "Coletamos apenas informações necessárias para o funcionamento da plataforma. Isso inclui dados fornecidos durante o cadastro (nome, email, URL do blog) e dados de uso para melhorar a experiência. Não vendemos ou compartilhamos seus dados com terceiros para fins de marketing."
    },
    {
      icon: <LockKeyhole className="h-8 w-8" />,
      title: "Segurança dos Dados",
      content: "Implementamos medidas técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado, perda ou alteração. Utilizamos criptografia de ponta a ponta para todas as informações sensíveis e realizamos auditorias de segurança regulares em nossos sistemas."
    },
    {
      icon: <UserCheck className="h-8 w-8" />,
      title: "Seus Direitos",
      content: "Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento. Também pode solicitar uma cópia de todas as informações que mantemos sobre você. Entre em contato conosco através de contato@murall.com.br para exercer qualquer um desses direitos."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar pageRefProp="Política de Privacidade" />

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
              className="text-4xl md:text-6xl font-bold mb-6 text-primary-foreground tracking-tight"
            >
              Política de <span className="text-primary">Privacidade</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground leading-relaxed"
            >
              Sua segurança para nós é importante, portanto, somos sempre transparentes com tudo que nossa plataforma provê aos nossos usuários, respeitando sempre suas informações sensíveis.
            </motion.p>
          </div>
        </div>
      </section>

      <section ref={sectionsRef} className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-10">
              {privacySections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={sectionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-md hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-3 flex-shrink-0">
                      <div className="text-primary">{section.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-primary-foreground">
                        {section.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={sectionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 space-y-8"
            >
              <div className="pt-6">
                <Link href="/support" className="text-primary hover:text-primary/80 transition-colors font-medium">
                  Precisa de ajuda? Visite nossa página de Suporte →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
export default PrivacyPolicyPage;