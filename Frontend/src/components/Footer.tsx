"use client";

import React from 'react';
import {
  Github,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Globe,
} from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-background/90 backdrop-blur-sm border-t border-border pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - About */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary-foreground">Murall</h3>
            <p className="text-muted-foreground">
              Plataforma dedicada a conectar, multiplicar e expandir o alcance de blogs e conteúdos digitais, criando uma comunidade de suporte mútuo.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://github.com/AntonioPaess/Murall" target='_blank' className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://sites.google.com/cesar.school/veros" target='_blank' className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Globe size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Links Úteis */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary-foreground">Links Úteis</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/our-mission" className="text-muted-foreground hover:text-primary transition-colors">Nossa Missão</Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">Como Funciona</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Política de Privacidade</Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">Suporte</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Comunidade */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary-foreground">Comunidade</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Histórias de Sucesso</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Eventos</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Recursos</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Parcerias</a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contato */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary-foreground">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary" />
                <a href="mailto:contato@murall.com.br" className="text-muted-foreground hover:text-primary transition-colors">contato@murall.com.br</a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary" />
                <span className="text-muted-foreground">(81) 99999-9999</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary mt-1" />
                <span className="text-muted-foreground">Av. Cais do Apolo, 77 - Recife, PE</span>
              </li>
            </ul>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Murall. Todos os direitos reservados.
          </p>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:text-primary-foreground hover:bg-primary transition-colors"
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={18} />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;