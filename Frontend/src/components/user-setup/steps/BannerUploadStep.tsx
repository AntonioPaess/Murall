import React, { useState, useEffect, useRef } from 'react';
import { User } from '@/models/users';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { deleteImage, uploadCarouselImages } from '@/lib/uploadImages';

interface BannerUploadStepProps {
  user: User;
  onNext: (data: Partial<User>) => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const BannerUploadStep = ({ user, onNext, onBack, isLastStep }: BannerUploadStepProps) => {
  const initialBanners = Array(3).fill({ 
    url: '', 
    tempFile: null, 
    isNew: false, 
    dimensions: { width: 0, height: 0 }
  });

  const [banners, setBanners] = useState(() => {
    const userBanners = user.blogs?.[0]?.blogImagesUrl?.map(img => ({
      url: img.imageUrl || '',
      tempFile: null,
      isNew: false,
      dimensions: { width: 0, height: 0 }
    })) || [];
    return [...userBanners, ...initialBanners].slice(0, 3);
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const userBanners = user.blogs?.[0]?.blogImagesUrl?.map(img => ({
      url: img.imageUrl || '',
      tempFile: null,
      isNew: false,
      dimensions: { width: 0, height: 0 }
    })) || [];
    
    setBanners(prev => {
      const newBanners = [...userBanners, ...initialBanners].slice(0, 3);
      return newBanners.map((banner, i) => 
        prev[i]?.tempFile ? { ...banner, ...prev[i] } : banner
      );
    });
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Selecione um arquivo de imagem válido');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Imagem deve ser menor que 5MB');
      return;
    }

    const newBanners = [...banners];
    const tempUrl = URL.createObjectURL(file);

    // Limpa URL anterior se existir
    if (newBanners[selectedIndex]?.url?.startsWith('blob:')) {
      URL.revokeObjectURL(newBanners[selectedIndex].url);
    }

    newBanners[selectedIndex] = {
      url: tempUrl,
      tempFile: file,
      isNew: true,
      dimensions: { width: 0, height: 0 }
    };

    setBanners(newBanners);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveImage = (index: number) => {
    const newBanners = [...banners];
    
    // Limpa URL se for temporária
    if (newBanners[index]?.url?.startsWith('blob:')) {
      URL.revokeObjectURL(newBanners[index].url);
    }

    newBanners[index] = { 
      url: '', 
      tempFile: null, 
      isNew: false, 
      dimensions: { width: 0, height: 0 } 
    };

    setBanners(newBanners);
    
    // Atualiza índice selecionado se necessário
    if (index === selectedIndex) {
      const nextIndex = newBanners.findIndex(b => b.url);
      setSelectedIndex(nextIndex !== -1 ? nextIndex : 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const bannersToUpload = banners.filter(b => b.tempFile);

      const deletePromises = banners
        .filter(b => b.url && !b.isNew && b.url.startsWith('http'))
        .map(b => deleteImage(b.url, 'blogs'));
      
      await Promise.all(deletePromises);

      const uploadedUrls = bannersToUpload.length > 0
        ? await uploadCarouselImages(bannersToUpload.map(b => b.tempFile!))
        : [];

      const updatedBanners = banners.map((banner, i) => {
        const uploadedIndex = bannersToUpload.findIndex(b => b === banner);
        return uploadedIndex >= 0
          ? { ...banner, url: uploadedUrls[uploadedIndex], isNew: false, tempFile: null }
          : banner;
      });

      onNext({
        blogs: [{
          ...user.blogs?.[0],
          blogImagesUrl: updatedBanners
            .filter(b => b.url)
            .map(b => ({ imageUrl: b.url }))
        }]
      });

    } catch (error) {
      toast.error('Erro ao processar imagens');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSkip = () => onNext({});

  useEffect(() => {
    return () => {
      banners.forEach(banner => {
        if (banner.url?.startsWith('blob:')) {
          URL.revokeObjectURL(banner.url);
        }
      });
    };
  }, [banners]);

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
