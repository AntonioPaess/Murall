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
import { X, Upload } from "lucide-react";
import { uploadCarouselImages } from '@/lib/uploadImages';
import LoaderMurall from '@/components/Loader';
import { useSidebar } from '@/app/contexts/sidebar-context';
import EmbedCodeSection from '@/components/banners/EmbedCodeSection';

const MyBanners = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [user, setUser] = useState<User | null>(null);
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
                const userData = await userService.getUser();
                setUser(userData);

                if (!userData.id) {
                    toast.error("Usuário não encontrado.");
                    throw new Error("ID do usuário não encontrado.");
                }

                const userBlogs = await blogService.getBlogsByUser(userData.id);
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

        if (newBanners[selectedIndex]?.url?.startsWith('blob:')) {
            URL.revokeObjectURL(newBanners[selectedIndex].url);
        }

        newBanners[selectedIndex] = {
            url: tempUrl,
            tempFile: file,
            isNew: true,
            dimensions: { width: 0, height: 0 },
        };

        setBanners(newBanners);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleRemoveImage = (index: number) => {
        const newBanners = [...banners];

        if (newBanners[index]?.url?.startsWith('blob:')) {
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
        return <LoaderMurall />;
    }

    const blogTabs = blogs.map((blog, idx) => ({
        value: `blog${idx + 1}`,
        label: blog.blogName || `Blog ${idx + 1}`,
        blog,
    }));

    return (
        <div className={`flex flex-col w-full h-full p-8 transition-all duration-300 max-w-[1600px] ${isMobile ? "" : "ml-[8rem]"} ${collapsed ? "-ml-[18px] max-w-[1800px]" : ""}`}>
            <Tabs
                defaultValue={blogTabs[0]?.value}
                value={selectedTab}
                onValueChange={setSelectedTab}
                className="w-full"
            >
                <TabsList className="bg-transparent gap-2 mb-8">
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
                <div className='ml-8'>

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