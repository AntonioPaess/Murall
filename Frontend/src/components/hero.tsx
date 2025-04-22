"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, Sparkles } from "lucide-react";
import { MarqueeDemo } from "./MarqueeDemo";

export default function Hero() {
  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background/5 to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-[68px] font-bold text-primary-foreground mb-6">
              Conecte Comunidades,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-muted-foreground">
                {" "}
                Multiplique Oportunidades
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto"
          >
            Crie, compartilhe e apoie iniciativas locais. Com o Murall, você
            pode divulgar sua página e ajudar outros a crescerem, promovendo um
            espaço de colaboração e visibilidade para todos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-primary hover:brightness-110 text-primary-foreground px-8"
            >
              <FileText className="mr-2 h-5 w-5" />
              Nossa Documentação
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-primary hover:text-primary-foreground border-primary hover:bg-primary/10"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Veja Exemplos
            </Button>
          </motion.div>

          <motion.div
            className="mt-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <MarqueeDemo />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
