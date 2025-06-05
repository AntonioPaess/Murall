"use client";

import { useSidebar } from '@/app/contexts/sidebar-context';
import LoaderMurall from '@/components/Loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Blogs } from '@/models/blogs';
import { blogService } from '@/services/blog.service';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';

const BlogPage = () => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blogs | null>(null);
    const { collapsed, isMobile } = useSidebar();

    const { id } = useParams<{ id: string }>();
    const idAsNumber = parseInt(id, 10);

    useEffect(() => {
        const blogInfo = async () => {
            try {
                if (isNaN(idAsNumber)) {
                    throw new Error("ID inválido");
                }

                const loadedBlog = await blogService.getBlog(idAsNumber);
                setBlog(loadedBlog);
            } catch (error: any) {
                toast.error("Erro ao pegar informações do blog: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        blogInfo();
    }, [idAsNumber]);

    return (
        <div className="ml-2 min-h-screen bg-background flex flex-col mt-4 max-w-[1800px]">
            <div className={`flex-1 transition-all duration-300 p-6 ${isMobile ? "" : "ml-[8rem]"} ${collapsed ? "-ml-[12px]" : ""}`}>
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <LoaderMurall />
                    </div>
                ) : blog !== null && (
                    <div className="h-full flex flex-col gap-8">
                        {/* Cabeçalho com informações do blog */}
                        <div className='flex flex-col md:flex-row gap-8 items-center md:items-start'>
                            <Avatar className="h-[150px] w-[150px] border-2 cursor-pointer border-primary">
                                <AvatarImage src={blog.blogAvatar || ''} alt={blog.blogName || ''} className="object-cover" />
                                <AvatarFallback className="bg-primary/60 text-white text-4xl font-semibold uppercase">
                                    {blog.blogName ? blog.blogName.slice(0, 1) : "M"}
                                </AvatarFallback>
                            </Avatar>

                            <div className='space-y-3 flex-1'>
                                <h1 className='text-2xl md:text-3xl font-semibold text-[#C4C1C1] text-center md:text-left'>
                                    {blog.blogName}
                                </h1>
                                <div className='border border-border rounded-md py-4 px-4 text-center md:text-left'>
                                    {blog.blogDescription}
                                </div>
                                <div className='flex flex-wrap gap-3 justify-center md:justify-start'>
                                    <Button variant="default" className="flex-1 min-w-[200px] bg-primary hover:bg-primary/90">
                                        Perfil do dono
                                    </Button>
                                    <Button variant="default" className="flex-1 min-w-[200px] bg-primary hover:bg-primary/90">
                                        Visitar blog
                                    </Button>
                                    <Button variant="default" className="flex-1 min-w-[200px] bg-primary hover:bg-primary/90">
                                        Solicitar parceria
                                    </Button>
                                    <Button variant="default" className="flex-1 min-w-[200px] bg-primary hover:bg-primary/90">
                                        Enviar mensagem
                                    </Button>
                                </div>
                            </div>
                        </div>


                        {/* Conteúdo adicional (pode ser expandido para ocupar o espaço restante) */}
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold mb-4">Banners</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {blog.blogImagesUrl && blog.blogImagesUrl.map((blogImage) => (
                                    <div key={blogImage.id} className="bg-muted rounded-lg h-[20rem] overflow-hidden relative">
                                        <Image
                                            src={blogImage.imageUrl || ""}
                                            alt={blog.blogName || "Imagem blog"}
                                            fill // Preenche o container pai
                                            className="object-cover" // Mantém proporção sem distorcer
                                            sizes="(max-width: 768px) 100vw, 33vw" // Otimização de performance
                                        />
                                    </div>
                                ))}
                            </div>
                            <h2 className="text-xl font-semibold mb-4 mt-6">Parceiros</h2>
                            <div className="flex flex-wrap justify-center gap-4 md-940:flex-nowrap md-940:justify-start lg:justify-start">
                                {[1, 2, 3, 4, 5, 6].map((item) => (
                                    <Avatar key={item} className="h-24 w-24 border-2 cursor-pointer border-primary flex-shrink-0">
                                        <AvatarImage src={blog.blogAvatar || ''} alt={blog.blogName || ''} className="object-cover" />
                                        <AvatarFallback className="bg-primary/60 text-white text-4xl font-semibold uppercase">
                                            {blog.blogName ? blog.blogName.slice(0, 1) : "M"}
                                        </AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BlogPage;