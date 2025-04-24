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
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0 w-full min-h-screen bg-[radial-gradient(ellipse_at_top_right,_rgba(0,102,255,0.25),_rgba(38,38,128,0.15),_transparent)] pointer-events-none"></div>

      <div className="container relative z-10 mx-auto">
        <div className="flex gap-8 py-12 lg:py-12 items-center justify-center flex-col">
          <div>
            <Button
              variant="secondary"
              size="sm"
              className="gap-4 backdrop-blur-sm bg-secondary/80">
              Veja sites que usam o Murall <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50 font-semibold text-primary-foreground relative">
                Aumente o impacto do seu blog com Murall
                <motion.div
                  className="absolute hidden md:flex md:-right-6 md:-top-6 text-primary"
                  animate={{
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.1, 1, 1.1, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}>
                  <Sparkles className="h-6 w-6" />
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
                    }>
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center backdrop-blur-sm bg-background/30 p-4 rounded-lg shadow-sm">
              Crie, compartilhe e apoie iniciativas locais. Com o Murall, você
              pode divulgar sua página e ajudar outros a crescerem, promovendo
              um espaço de colaboração e visibilidade para todos.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center w-full gap-4 mt-4">
              <div className="flex sm:flex-row flex-col gap-3">
                <Button
                  size="lg"
                  className="bg-primary hover:brightness-110 text-primary-foreground px-8 w-full sm:w-auto">
                  <FileText className="mr-2 h-5 w-5" />
                  Nossa Documentação
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-primary hover:text-primary-foreground border-primary hover:bg-primary/10 w-full sm:w-auto">
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
