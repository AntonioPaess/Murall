"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Code } from "lucide-react";
import { motion } from "framer-motion";

const EmbedCodeSection = () => {

const embedCode =`<div class="murall-banner bg-gray-800 p-4 rounded-lg shadow-md min-h-[120px] 
flex flex-wrap gap-4 items-center justify-center" data-murall-blog-domain="SEU_DOMINIO_DO_BLOG">
</div>\n\n<script src="https://murall.com/embed.js" async defer></script>`;

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode);
    toast.success("Código copiado para a área de transferência!");
  };

  return (
    <motion.div 
      className="w-full mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="flex flex-col items-start w-full">
        <div className="flex items-center gap-3 mb-4">
          <Code size={24} className="text-[#2196F3]" />
          <h2 className="text-2xl font-semibold text-white">
            Pegue Seu Murall
          </h2>
        </div>

        <p className="text-[#94A3B8] mb-6">
          Copie o código abaixo e cole no seu site para exibir o banner
        </p>

        <div className="bg-[#070F1C] rounded-md w-full border border-[#1E293B] overflow-hidden">
          <div className="flex items-center justify-between bg-[#0A1525] px-4 py-2 border-b border-[#1E293B]">
            <span className="text-[#94A3B8] text-sm font-medium">Código de Incorporação HTML</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-[#94A3B8] hover:text-white hover:bg-[#12203A]"
              onClick={copyEmbedCode}
            >
              <Copy size={14} className="mr-2" />
              Copiar
            </Button>
          </div>
          
          <pre className="text-[#E2E8F0] text-sm overflow-x-auto p-4 font-mono">
            {embedCode}
          </pre>
        </div>

        <div className="mt-6 p-4 bg-[#0A1525] rounded-md border border-[#1E293B] w-full">
          <h3 className="text-white font-medium mb-2">Como usar</h3>
          <ol className="text-[#94A3B8] space-y-2 list-decimal pl-5">
            <li>Copie o código acima</li>
            <li>Substitua "SEU_DOMINIO_DO_BLOG" pelo domínio do seu blog (ex: "meublog.com.br")</li>
            <li>Cole no HTML do seu site onde deseja exibir o banner</li>
            <li>O banner carregará automaticamente as imagens dos blogs parceiros</li>
          </ol>
        </div>

        <Button
          onClick={copyEmbedCode}
          className="mt-6 bg-[#2196F3] hover:bg-[#1976D2] transition-colors"
        >
          <Copy size={16} className="mr-2" />
          Copiar Código
        </Button>
      </div>
    </motion.div>
  );
};

export default EmbedCodeSection;