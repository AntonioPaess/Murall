"use client";

import { useSidebar } from '@/app/contexts/sidebar-context';
import LoaderMurall from '@/components/Loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Blogs } from '@/models/blogs';
import { blogService } from '@/services/blog.service'
import { Handshake, Send, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Explore = () => {
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [loading, setLoading] = useState(true);
    const { collapsed, isMobile } = useSidebar();

    async function listarBlogs() {
        try {
            const blogs = await blogService.listAllBlogs();
            setBlogs(blogs);
        } catch (error: any) {
            toast.error("Erro ao listar os blogs:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        listarBlogs();
    }, []);

    return (
        <div className="flex min-h-screen bg-background transition-all duration-300 overflow-x-hidden">
            <div
                className={`flex-1 p-8 transition-all duration-300 ${isMobile ? "pl-[110px]" : collapsed ? "pl-[110px]" : "pl-[18rem]"} max-w-full`}
            >
                <div className="flex gap-4 flex-col">
                    {loading ? <div className=''> <LoaderMurall /> </div> : ''}

                    {!loading && blogs.length === 0 && (
                        <p>Nenhum blog encontrado.</p>
                    )}

                    {!loading && blogs.length > 0 && (
                        <div className="w-full">
                            {blogs.map((blog) => (
                                <Link href={`/explore/${blog.id}/blog-page`} key={blog.id}>
                                    <div className="bg-background/50 mb-[16px] border cursor-pointer border-border p-4 rounded-lg hover:bg-slate-800/70 transition-all duration-200 group">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <Avatar className="sm:h-32 sm:w-32 h-20 w-20 border-2 cursor-pointer border-primary">
                                                    <AvatarImage src={blog.blogAvatar} alt={blog.blogName} className="object-cover" />
                                                    <AvatarFallback className="bg-primary/60 text-white text-4xl font-semibold uppercase">
                                                        {blog.blogName ? blog.blogName.slice(0, 1) : "M"}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="sm:text-[22px] text-md font-semibold text-[#C4C1C1] truncate">
                                                        {blog.blogName}
                                                    </h3>
                                                </div>

                                                <p className="text-slate-300 text-sm leading-relaxed mb-3 line-clamp-2">
                                                    {blog.blogDescription}
                                                </p>

                                                <div className="text-xs text-slate-400">
                                                    <span className="font-medium">Domínio:</span> {blog.blogDomain}
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                                                    <User />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                                                    <Handshake />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                                                    <Send />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Explore;
