"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FileText, MoveRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["conecte", "multiplique", "expanda", "ajude", "divulgue"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="relative w-full overflow-hidden pt-24 pb-24">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl -translate-x-1/2"></div>
      <div className="absolute top-40 right-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl translate-x-1/3"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex items-center justify-center flex-col">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <Button
              variant="secondary"
              size="sm"
              className="gap-4 backdrop-blur-sm bg-secondary/80 hover:bg-secondary/90 transition-all"
            >
              Veja sites que usam o Murall <MoveRight className="w-4 h-4" />
            </Button>
          </motion.div>

          <div className="flex gap-6 flex-col">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl md:text-7xl max-w-3xl tracking-tighter text-center font-regular"
            >
              <span className="font-semibold text-primary-foreground block">
                Aumente o impacto
              </span>
              <span className="font-semibold text-primary-foreground block">
                do seu blog
              </span>
              <span className="text-primary font-semibold block relative">
                com Murall
                <motion.div
                  className="absolute -right-2 -top-32 text-primary"
                  animate={{
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.1, 1, 1.1, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="md:flex sm:hidden h-6 w-6" />
                </motion.div>
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-primary"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                          y: 0,
                          opacity: 1,
                        }
                        : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center backdrop-blur-sm bg-background/30 p-5 rounded-xl shadow-sm border border-border/30"
            >
              Crie, compartilhe e apoie iniciativas locais. Com o Murall, você
              pode divulgar sua página e ajudar outros a crescerem, promovendo
              um espaço de colaboração e visibilidade para todos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center w-full gap-4 mt-2"
            >
              <div className="flex sm:flex-row flex-col gap-3">
                <Button
                  size="lg"
                  className="bg-primary hover:brightness-110 text-primary-foreground px-8 w-full sm:w-auto transition-all duration-300"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Nossa Documentação
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-primary hover:text-primary-foreground border-primary hover:bg-primary/10 w-full sm:w-auto transition-all duration-300"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Veja Exemplos
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };