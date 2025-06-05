"use client";

import { Blogs } from '@/models/blogs';
import { User } from '@/models/users';
import { blogService } from '@/services/blog.service';
import userService from '@/services/user.service';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X, Upload, PlusCircle } from "lucide-react";
import { uploadCarouselImages, deleteImage } from '@/lib/uploadImages';
import LoaderMurall from '@/components/Loader';
import { useSidebar } from '@/app/contexts/SidebarContext';
import EmbedCodeSection from '@/components/banners/EmbedCodeSection';
import { useUser } from '@/app/contexts/UserContext';

const MyBanners = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const { user } = useUser();
    const [banners, setBanners] = useState<any[]>([]);
    const [selectedTab, setSelectedTab] = useState<string>("blog1");
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [uploading, setUploading] = useState(false);
    const { collapsed, isMobile } = useSidebar();

    const initialBanners = Array(3).fill({
        url: '',
        tempFile: null,
        isNew: false,
        dimensions: { width: 0, height: 0 },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!user?.id) {
                    toast.error("Usuário não encontrado.");
                    throw new Error("ID do usuário não encontrado.");
                }

                const userBlogs = await blogService.getBlogsByUser(user?.id);
                setBlogs(Array.isArray(userBlogs) ? userBlogs : [userBlogs]);
            } catch (error: any) {
                toast.error(error.message || 'Erro ao carregar dados');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (blogs.length > 0) {
            const blogIndex = parseInt(selectedTab.replace('blog', '')) - 1;
            const currentBlog = blogs[blogIndex];

            if (currentBlog) {
                const userBanners = currentBlog.blogImagesUrl?.map(img => ({
                    url: img.imageUrl || '',
                    tempFile: null,
                    isNew: false,
                    dimensions: { width: 0, height: 0 },
                })) || [];

                setBanners(prev => {
                    const newBanners = [...userBanners, ...initialBanners].slice(0, 3);
                    return newBanners.map((banner, i) =>
                        prev[i]?.tempFile ? { ...banner, ...prev[i] } : banner
                    );
                });
            }
        }
    }, [blogs, selectedTab]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

        setUploading(true);
        try {
            // 1. Upload da imagem
            const urls = await uploadCarouselImages([file]);
            const uploadedUrl = urls[0];

            // 2. Atualiza banners localmente
            const newBanners = [...banners];
            newBanners[selectedIndex] = {
                url: uploadedUrl,
                tempFile: null,
                isNew: true,
                dimensions: { width: 0, height: 0 },
            };
            setBanners(newBanners);


            const blogIndex = parseInt(selectedTab.replace('blog', '')) - 1;
            const currentBlog = blogs[blogIndex];

            if (currentBlog && typeof currentBlog.id === "number") {

                const updatedImages = newBanners.filter(b => b.url).map(b => ({ imageUrl: b.url }));

                await blogService.updateBlog(
                    {
                        blogName: currentBlog.blogName || "",
                        blogDomain: currentBlog.blogDomain || "",
                        blogDescription: currentBlog.blogDescription || "",
                        blogAvatar: currentBlog.blogAvatar || "",
                        blogImagesUrl: updatedImages.map(img => img.imageUrl),
                        categoryNames: Array.isArray(currentBlog.categories)
                            ? currentBlog.categories.map(String)
                            : [],
                    },
                    currentBlog.id
                );
            }

            toast.success('Imagem enviada e blog atualizado com sucesso!');
        } catch (error) {
            toast.error('Erro ao enviar imagem ou atualizar blog');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleRemoveImage = async (index: number) => {
        const newBanners = [...banners];

        // Se for imagem do Supabase, deleta do storage
        if (newBanners[index]?.url && !newBanners[index].url.startsWith('blob:')) {
            try {
                await deleteImage(newBanners[index].url, 'blogs');
            } catch (error) {
                toast.error('Erro ao deletar imagem do Supabase');
            }
        } else if (newBanners[index]?.url?.startsWith('blob:')) {
            URL.revokeObjectURL(newBanners[index].url);
        }

        newBanners[index] = {
            url: '',
            tempFile: null,
            isNew: false,
            dimensions: { width: 0, height: 0 },
        };

        setBanners(newBanners);

        if (index === selectedIndex) {
            const nextIndex = newBanners.findIndex(b => b.url);
            setSelectedIndex(nextIndex !== -1 ? nextIndex : 0);
        }
    };

    const handleImageUpload = (blogId: string, file: File) => {
        uploadCarouselImages([file]).then(() => {
            toast.success('Imagem carregada com sucesso');
        }).catch(err => {
            toast.error('Erro ao carregar imagem');
        });
    };

    if (loading) {
        return (
            <div className='ml-12'>
                <LoaderMurall />
            </div>
        );
    }

    const blogTabs = blogs.map((blog, idx) => ({
        value: `blog${idx + 1}`,
        label: blog.blogName || `Blog ${idx + 1}`,
        blog,
    }));

    return (
        <div className={`flex-1 p-8 transition-all duration-300 ${isMobile ? "pl-[100px]" : collapsed ? "pl-[100px]" : "pl-[18rem]"} max-w-[1800px]`}>
            <Tabs
                defaultValue={blogTabs[0]?.value}
                value={selectedTab}
                onValueChange={setSelectedTab}
                className="w-full"
            >
                <div className="w-full overflow-x-auto overflow-y-hidden whitespace-nowrap">
                    <TabsList className="bg-transparent gap-2 mb-8 inline-flex">
                        {blogTabs.map(tab => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className={cn(
                                    "rounded-none px-8 py-2 text-lg font-medium",
                                    selectedTab === tab.value
                                        ? "bg-[#12203A] text-white border-b-2 border-[#2196F3]"
                                        : "bg-transparent text-white"
                                )}
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>
                <div className='sm:ml-8 ml-0'>

                    {blogTabs.map(tab => {
                        const blogIndex = parseInt(tab.value.replace('blog', '')) - 1;
                        const currentBlog = blogs[blogIndex];

                        return (
                            <TabsContent
                                key={tab.value}
                                value={tab.value}
                                className="flex flex-col items-center"
                            >
                                <div className={`flex gap-8 mb-8 w-full flex-col items-center`}>
                                    <label
                                        className={`w-full h-64 md:h-80 rounded-md overflow-hidden border border-border relative flex items-center justify-center cursor-pointer group ${uploading ? 'opacity-50 pointer-events-none' : ''
                                            }`}
                                    >
                                        {banners[selectedIndex]?.url ? (
                                            <img
                                                src={banners[selectedIndex].url}
                                                alt={`Banner Principal`}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center text-[hsl(210,55%,65%)]">
                                                <Upload size={40} />
                                            </div>
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
                                                className={`relative w-20 h-20 rounded-md overflow-hidden border cursor-pointer ${selectedIndex === index ? 'ring-2 ring-primary' : ''
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
                                    <div>
                                        <Button
                                            variant="ghost"
                                            className="text-primary-foreground hover:text-primary border w-full mb-12"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={uploading}
                                        >
                                            <PlusCircle size={16} />
                                            Adicionar Imagem
                                        </Button>
                                    </div>
                                </div>

                                <EmbedCodeSection />
                            </TabsContent>
                        );
                    })}
                </div >
            </Tabs>
        </div>
    );
};

export default MyBanners;