import React, { useState, useEffect, useRef } from 'react';
import { User } from '@/models/users';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { uploadCarouselImages } from '@/lib/uploadImages'; // função de upload que já temos

interface BannerUploadStepProps {
  user: User;
  onNext: (data: Partial<User>) => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const BannerUploadStep = ({ user, onNext, onBack, isLastStep }: BannerUploadStepProps) => {
  const initialBanners =
    user.blogs?.[0]?.blogImagesUrl?.map((img) => ({
      url: img.imageUrl || '',
      dimensions: { width: 0, height: 0 },
    })) || [];

  const [banners, setBanners] = useState<
    { url: string; dimensions: { width: number; height: number } }[]
  >(initialBanners);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const newBanners =
      user.blogs?.[0]?.blogImagesUrl?.map((img) => ({
        url: img.imageUrl || '',
        dimensions: { width: 0, height: 0 },
      })) || [];
    setBanners(newBanners);
  }, [user]);

  // Função para fazer o upload de uma imagem
  const uploadSingleFile = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      const urls = await uploadCarouselImages([file]);
      if (urls.length > 0) {
        toast.success('Imagem enviada com sucesso!');
        return urls[0];
      } else {
        toast.error('Falha no upload da imagem.');
        return null;
      }
    } catch {
      toast.error('Erro ao enviar a imagem.');
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Lida com o envio de um arquivo e atualiza o banner
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadedUrl = await uploadSingleFile(file);

    if (uploadedUrl) {
      const newBanners = [...banners];
      newBanners[selectedIndex] = {
        url: uploadedUrl,
        dimensions: { width: 0, height: 0 }, // Você pode calcular as dimensões se precisar
      };
      setBanners(newBanners);
    }

    // Reset input para permitir o upload do mesmo arquivo se necessário
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    const newBanners = [...banners];
    newBanners[index] = { url: '', dimensions: { width: 0, height: 0 } };
    setBanners(newBanners);

    if (index === selectedIndex) {
      const next = newBanners.findIndex((b) => b.url);
      setSelectedIndex(next !== -1 ? next : 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      blogs: [
        {
          ...user.blogs?.[0],
          blogImagesUrl: banners
            .filter((b) => b.url)
            .map((b) => ({
              imageUrl: b.url,
            })),
        },
      ],
    });
  };

  const handleSkip = () => {
    onNext({});
  };

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-6">
        Escolha como você quer destacar o seu blog
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <label
          className={`w-full h-64 md:h-80 rounded-md overflow-hidden border border-border relative flex items-center justify-center cursor-pointer group ${
            uploading ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          {banners[selectedIndex]?.url ? (
            <img
              src={banners[selectedIndex].url}
              alt={`Banner Principal`}
              className="w-full h-full object-cover"
            />
          ) : (
            <Upload className="text-[hsl(210,55%,65%)]" size={40} />
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Upload className="text-white" size={40} />
          </div>
        </label>

        <div className="flex gap-4 mt-4">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`relative w-20 h-20 rounded-md overflow-hidden border cursor-pointer ${
                selectedIndex === index ? 'ring-2 ring-primary' : ''
              }`}
            >
              {banners[index]?.url ? (
                <>
                  <img
                    src={banners[index].url}
                    alt={`Miniatura ${index + 1}`}
                    className="w-full h-full object-cover"
                    onClick={() => setSelectedIndex(index)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-black bg-opacity-60 rounded-full p-1 hover:bg-opacity-80 transition"
                  >
                    <X size={14} className="text-white" />
                  </button>
                </>
              ) : (
                <div
                  className="group w-full h-full flex items-center justify-center bg-muted relative"
                  onClick={() => setSelectedIndex(index)}
                >
                  <Upload
                    className="text-[hsl(210,55%,65%)] group-hover:text-white transition-colors"
                    size={20}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="ghost"
            className="text-primary-foreground hover:text-primary border"
            onClick={handleSkip}
          >
            Pular etapa
          </Button>
          <Button
            className="bg-primary hover:brightness-110 w-[150px] text-primary-foreground"
            type="submit"
            disabled={uploading}
          >
            Concluir
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BannerUploadStep;
