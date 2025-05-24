import React, { useState, useEffect } from 'react';
import { User } from '@/models/users';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
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
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    // Sincroniza o estado local quando o objeto user muda
    useEffect(() => {
        const newBanners = user.blogs?.[0]?.blogImagesUrl?.map(img => ({
            url: img.imageUrl || '',
            dimensions: { width: 0, height: 0 }
        })) || [];

        setBanners(newBanners);
    }, [user]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    const newBanners = [...banners];
                    if (newBanners[index]) {
                        newBanners[index].url = event.target.result as string;
                    } else {
                        newBanners[index] = {
                            url: event.target.result as string,
                            dimensions: { width, height },
                        };
                    }
                    setBanners(newBanners);
                }
            };
            reader.readAsDataURL(file);
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
            <p className="text-sm text-[hsl(202,80%,82%)] mb-6">
                Escolha como você quer destacar o seu blog
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[0, 1, 2, 3].map((index) => (
                        <div key={index} className="relative group">
                            <label htmlFor={`banner-${index}`} className="block w-32 h-32 cursor-pointer rounded-md overflow-hidden relative">
                                <Card
                                    className="w-32 h-32 max-w-md backdrop-blur-sm border border-border shadow-xl z-[99] text-white flex items-center justify-center"
                                    style={{
                                        background: 'linear-gradient(180deg, #0A2A45 0%, #0D1522 100%)'
                                    }}
                                >
                                    {banners[index]?.url ? (
                                        <img
                                            src={banners[index].url}
                                            alt={`Banner ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Upload className="text-[hsl(210,55%,65%)]" size={32} />
                                    )}
                                </Card>
                                <input
                                    type="file"
                                    id={`banner-${index}`}
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, index)}
                                    className="hidden"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                                    <Upload className="text-white" size={20} />
                                </div>
                            </label>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <Label className="text-[hsl(202,80%,92%)]">
                        Definir dimensões
                    </Label>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <Label htmlFor="width" className="text-[hsl(202,80%,92%)] mr-2 w-6">W</Label>
                            <Input
                                id="width"
                                type="number"
                                value={width || ''}
                                onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
                                className="bg-[hsl(202,31%,18%)] border-[hsl(220,13%,40%)] text-[hsl(202,80%,92%)]"
                            />
                        </div>

                        <div className="flex items-center">
                            <Label htmlFor="height" className="text-[hsl(202,80%,92%)] mr-2 w-6">H</Label>
                            <Input
                                id="height"
                                type="number"
                                value={height || ''}
                                onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                                className="bg-[hsl(202,31%,18%)] border-[hsl(220,13%,40%)] text-[hsl(202,80%,92%)]"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between pt-4">
                    <div className="flex gap-3">
                        <Button variant="ghost" className="text-primary-foreground hover:text-primary border" onClick={handleSkip}>Pular etapa</Button>
                    </div>
                    <Button className="bg-primary hover:brightness-110 w-[150px] text-primary-foreground" onClick={handleSubmit}>
                        Concluir
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BannerUploadStep;
