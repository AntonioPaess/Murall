"use client";

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MessageCircle } from "lucide-react";
import { toast } from 'sonner';

const formSchema = z.object({
  nome: z.string().min(3, {
    message: "Nome deve ter pelo menos 3 caracteres.",
  }),
  sobrenome: z.string().min(3, {
    message: "Sobrenome deve ter pelo menos 3 caracteres.",
  }),
  email: z.string().email({
    message: "Email inválido.",
  }),
  mensagem: z.string().min(10, {
    message: "Mensagem deve ter pelo menos 10 caracteres.",
  }),
});

const SupportPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      sobrenome: "",
      email: "",
      mensagem: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);

    
    toast.success("Obrigado por entrar em contato, retornaremos o mais breve possível");
    setIsSubmitted(true);
  
    setTimeout(() => {
      setIsSubmitted(false);
      form.reset();
    }, 3000);
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const formVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.3 }
    }
  };


  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar pageRefProp="Suporte" />
      
      <motion.section 
        className="flex-1 py-20 md:py-32 px-4 overflow-hidden flex flex-col justify-center items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary-foreground tracking-tight text-center">
            Como podemos <span className="text-primary">ajudar?</span>
          </h1>
        </motion.div>
        
        <motion.div variants={itemVariants} className="max-w-2xl w-full">
          <Card className="mt-6 shadow-lg border-opacity-50">
            <CardHeader className="space-y-1">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <CardTitle className="text-2xl flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Está com problemas?
                </CardTitle>
              </motion.div>
              <CardDescription className="text-sm text-muted-foreground">
                Nosso suporte amigável está preparado para auxiliar você 
                com qualquer problema ou dúvidas sobre nossa plataforma.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
                <motion.div variants={formVariants}>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <FormField
                          control={form.control}
                          name="nome"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Nome</FormLabel>
                              <FormControl>
                                <Input placeholder="Seu nome" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="sobrenome"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Sobrenome</FormLabel>
                              <FormControl>
                                <Input placeholder="Seu sobrenome" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="exemplo@email.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="mensagem"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mensagem</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Em que podemos ajudar?" 
                                className="min-h-24 resize-none"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button 
                          type="submit" 
                          className="w-full"
                        >
                          Enviar Mensagem
                        </Button>
                      </motion.div>
                    </form>
                  </Form>
                </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default SupportPage;