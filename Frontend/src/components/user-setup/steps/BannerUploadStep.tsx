import React, { useState, useEffect, useRef } from 'react';
import { User } from '@/models/users';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BannerUploadStepProps {
    user: User;
    onNext: (data: Partial<User>) => void;
    onBack: () => void;
    isFirstStep: boolean;
    isLastStep: boolean;
}

const BannerUploadStep = ({ user, onNext, onBack, isLastStep }: BannerUploadStepProps) => {
    const initialBanners = user.blogs?.[0]?.blogImagesUrl?.map(img => ({
        url: img.imageUrl || '',
        dimensions: { width: 0, height: 0 }
    })) || [];

    const [banners, setBanners] = useState<{ url: string; dimensions: { width: number; height: number } }[]>(initialBanners);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const newBanners = user.blogs?.[0]?.blogImagesUrl?.map(img => ({
            url: img.imageUrl || '',
            dimensions: { width: 0, height: 0 }
        })) || [];
        setBanners(newBanners);
    }, [user]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    const newBanners = [...banners];
                    newBanners[selectedIndex] = {
                        url: event.target.result as string,
                        dimensions: { width: 0, height: 0 },
                    };
                    setBanners(newBanners);

                    // Reset input so same file can be selected again
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (index: number) => {
        const newBanners = [...banners];
        newBanners[index] = { url: '', dimensions: { width: 0, height: 0 } };
        setBanners(newBanners);

        // Ajusta índice se imagem atual foi removida
        if (index === selectedIndex) {
            const next = newBanners.findIndex(b => b.url);
            setSelectedIndex(next !== -1 ? next : 0);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext({
            blogs: [{
                ...user.blogs?.[0],
                blogImagesUrl: banners
                    .filter(b => b.url)
                    .map(b => ({
                        imageUrl: b.url
                    }))
            }]
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
                {/* Banner principal com upload */}
                <label className="w-full h-64 md:h-80 rounded-md overflow-hidden border border-border relative flex items-center justify-center cursor-pointer group">
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
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Upload className="text-white" size={40} />
                    </div>
                </label>

                {/* Miniaturas com remoção */}
                <div className="flex gap-4 mt-4">
                    {[0, 1, 2].map((index) => (
                        <div
                            key={index}
                            className={`relative w-20 h-20 rounded-md overflow-hidden border cursor-pointer ${selectedIndex === index ? 'ring-2 ring-primary' : ''}`}
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
                                    className={`group w-full h-full flex items-center justify-center bg-muted relative`}
                                    onClick={() => setSelectedIndex(index)}
                                >
                                    <Upload className="text-[hsl(210,55%,65%)] group-hover:text-white transition-colors" size={20} />
                                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Botões */}
                <div className="flex justify-between pt-4">
                    <Button variant="ghost" className="text-primary-foreground hover:text-primary border" onClick={handleSkip}>
                        Pular etapa
                    </Button>
                    <Button className="bg-primary hover:brightness-110 w-[150px] text-primary-foreground" type="submit">
                        Concluir
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BannerUploadStep;