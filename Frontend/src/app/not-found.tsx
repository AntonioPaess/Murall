'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <>
            <Navbar />
            <main className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 mb-10">
                {/* Grid lines */}
                <motion.div
                    className="absolute inset-0 z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.05 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <div className="h-full w-full bg-[linear-gradient(to_right,hsl(var(--primary))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary))_1px,transparent_1px)] bg-[size:40px_40px]" />
                </motion.div>

                <motion.div
                    className="relative z-10 w-full max-w-xl"
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="mx-auto flex justify-center text-[120px] font-bold text-primary md:text-[180px]"
                    >
                        <motion.span
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                        >
                            4
                        </motion.span>
                        <motion.span
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
                        >
                            0
                        </motion.span>
                        <motion.span
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
                        >
                            4
                        </motion.span>
                    </motion.div>

                    <motion.div
                        className="relative mx-auto max-w-md rounded-xl border border-border bg-card/80 p-8 backdrop-blur-sm"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                        style={{
                            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <motion.h2
                            className="mb-2 text-2xl font-bold text-white"
                        >
                            Página não encontrada
                        </motion.h2>

                        <motion.div
                            className="mb-4 h-1 w-16 bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: 64 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        />

                        <motion.p
                            className="mb-6 text-muted-foreground"
                        >
                            Parece que não conseguimos encontrar o que você ta procurando. Clique no botão abaixo para voltar ao menu.
                        </motion.p>

                        <motion.div>
                            <Link href="/">
                                <Button
                                    variant="default"
                                    className="group relative overflow-hidden bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90"
                                >
                                    <motion.span
                                        className="absolute inset-0 bg-primary-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-5"
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileHover={{ scale: 1.5, opacity: 0.2 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Voltar para página inicial
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </main>
            <Footer />
        </>
    );
}