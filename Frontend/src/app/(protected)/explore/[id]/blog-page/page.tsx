"use client";

import { useSidebar } from '@/app/contexts/SidebarContext';
import LoaderMurall from '@/components/Loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Blogs } from '@/models/blogs';
import { BlogPartnership } from '@/models/blog-partnership';
import { User } from '@/models/users';
import { blogPartnershipService } from '@/services/partnership.service';
import { blogService } from '@/services/blog.service';
import userService from '@/services/user.service';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { BlogSelect } from './_components/blog-select';
import { useUser } from '@/app/contexts/UserContext';
import Link from 'next/link';

const BlogPage = () => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blogs | null>(null);
    const { user } = useUser();
    const [partners, setPartners] = useState<BlogPartnership[]>([]);
    const { collapsed, isMobile } = useSidebar();
    const { id } = useParams<{ id: string }>();
    const currentBlogId = parseInt(id, 10);

    useEffect(() => {
        const loadBlogData = async () => {
            try {
                if (isNaN(currentBlogId)) {
                    throw new Error("ID inválido");
                }
                const loadedBlog = await blogService.getBlog(currentBlogId);
                setBlog(loadedBlog);

                const partnersData = await blogPartnershipService.getActivePartnerships(currentBlogId);
                setPartners(partnersData);
            } catch (error: any) {
                toast.error("Erro ao pegar informações do blog: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        loadBlogData();
    }, [currentBlogId]);

    const handleSendRequest = async (senderBlogId: number) => {
        try {
            await blogPartnershipService.sendPartnershipRequest(senderBlogId, currentBlogId);
            toast.success("Solicitação de parceria enviada com sucesso");
        } catch (error: any) {
            toast.error("Erro ao enviar solicitação de parceria: " + error.message);
        }
    };

    console.log(partners)

    return (
        <div className={`ml-2 min-h-screen bg-background flex flex-col mt-4 max-w-[1800px]`}>
            <div className={`flex-1 p-8 transition-all duration-300 ${isMobile ? "pl-[110px]" : collapsed ? "pl-[110px]" : "pl-[18rem]"} max-w-full`}>
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
                                    <Button variant="default" disabled className="flex-1 min-w-[200px] bg-primary hover:bg-primary/90">
                                        Perfil do dono
                                    </Button>
                                    <Button asChild variant="default" className="flex-1 min-w-[200px] bg-primary hover:bg-primary/90">
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={blog.blogDomain?.startsWith('http') ? blog.blogDomain : `https://${blog.blogDomain}`}
                                            className="w-full h-full flex items-center justify-center"
                                        >
                                            Visitar blog
                                        </a>
                                    </Button>
                                    <div className="flex-1 min-w-[200px]">
                                        {user && user.id !== undefined && (
                                            <BlogSelect userId={user.id} onConfirm={handleSendRequest} />
                                        )}
                                    </div>
                                    <Button variant="default" disabled className="flex-1 min-w-[200px] bg-primary hover:bg-primary/90">
                                        Enviar mensagem
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Conteúdo adicional */}
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold mb-4">Banners</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {blog.blogImagesUrl && blog.blogImagesUrl.map((blogImage) => (
                                    <div key={blogImage.id} className="bg-muted rounded-lg h-[20rem] overflow-hidden relative">
                                        <Image
                                            src={blogImage.imageUrl || ""}
                                            alt={blog.blogName || "Imagem blog"}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                ))}
                            </div>
                            <h2 className="text-xl font-semibold mb-4 mt-6">Parceiros</h2>
                            <div className="flex flex-wrap justify-center gap-4 md-940:flex-nowrap md-940:justify-start lg:justify-start">
                                {partners.length > 0 ? partners.map((partner) => {
                                    console.log('Partner:', partner);  // Logando o parceiro antes de renderizar
                                    return (
                                        <Link key={partner.partnerBlog?.id} href={`/explore/${partner.partnerBlog?.id}/blog-page`}>
                                            <Avatar className="h-24 w-24 border-2 cursor-pointer border-primary flex-shrink-0">
                                                <AvatarImage
                                                    src={partner.partnerBlog?.blogAvatar || '/path/to/default-avatar.jpg'}
                                                    alt={partner.partnerBlog?.blogName || 'Parceiro sem nome'}
                                                    className="object-cover"
                                                />
                                                <AvatarFallback className="bg-primary/60 text-white text-4xl font-semibold uppercase">
                                                    {partner.partnerBlog?.blogName ? partner.partnerBlog.blogName.slice(0, 1) : 'P'}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Link>
                                    );
                                }) : (
                                    <p className='text-sm italic'>Este blog não possui parceiros</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;