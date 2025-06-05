"use client";

import { useSidebar } from '@/app/contexts/sidebar-context';
import LoaderMurall from '@/components/Loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Blogs } from '@/models/blogs';
import { User } from '@/models/users';
import { blogService } from '@/services/blog.service';
import { blogPartnershipService } from '@/services/partnership.service';
import { Handshake, Send, User as LucideUser } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import userService from '@/services/user.service';

interface BlogSimpleDTO {
    id: number;
    blogName: string;
    blogDomain: string;
    blogAvatar: string;
}

const MyPartners = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [partners, setPartners] = useState<BlogSimpleDTO[]>([]);
    const [selectedTab, setSelectedTab] = useState<string>("blog1");
    const { collapsed, isMobile } = useSidebar();

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

                if (userBlogs.length > 0) {
                    const initialBlog = Array.isArray(userBlogs) ? userBlogs[0] : userBlogs;
                    if (initialBlog.id !== undefined) {
                        const partnersData = await blogPartnershipService.getPartnerBlogs(initialBlog.id);
                        setPartners(partnersData);
                    }
                }
            } catch (error: any) {
                toast.error("Erro ao carregar dados: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const loadPartners = async () => {
            try {
                const blogIndex = parseInt(selectedTab.replace('blog', '')) - 1;
                const currentBlog = blogs[blogIndex];
                if (currentBlog && currentBlog.id !== undefined) {
                    const partnersData = await blogPartnershipService.getPartnerBlogs(currentBlog.id);
                    setPartners(partnersData);
                } else {
                    setPartners([]);
                }
            } catch (error: any) {
                toast.error("Erro ao carregar parceiros: " + error.message);
            }
        };

        loadPartners(); // Run immediately when selectedTab changes
    }, [selectedTab]); // Depend on selectedTab, not blogs

    if (loading) {
        return (
            <div className="ml-12">
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
        <div className={`flex-1 p-8 transition-all duration-300 ${isMobile ? "pl-[100px]" : collapsed ? "pl-[80px]" : "pl-[15rem]"}`}>
            <div className="flex-1 p-8">
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
                    <div className="ml-0 sm:ml-8">
                        {blogTabs.map(tab => (
                            <TabsContent
                                key={tab.value}
                                value={tab.value}
                                className="flex flex-col gap-4"
                            >
                                {partners.length === 0 && (
                                    <p className="flex h-[80vh] justify-center items-center">
                                        Nenhum blog parceiro encontrado.
                                    </p>
                                )}
                                {partners.length > 0 && (
                                    <div className="w-full">
                                        {partners.map((partner) => (
                                            <Link href={`/explore/${partner.id}/blog-page`} key={partner.id}>
                                                <div className="bg-background/50 mb-[16px] border cursor-pointer border-border p-4 rounded-lg hover:bg-slate-800/70 transition-all duration-200 group">
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex-shrink-0">
                                                            <Avatar className="sm:h-32 sm:w-32 h-20 w-20 border-2 cursor-pointer border-primary">
                                                                <AvatarImage src={partner.blogAvatar} alt={partner.blogName} className="object-cover" />
                                                                <AvatarFallback className="bg-primary/60 text-white text-4xl font-semibold uppercase">
                                                                    {partner.blogName ? partner.blogName.slice(0, 1) : "M"}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <h3 className="sm:text-[22px] text-md font-semibold text-[#C4C1C1] truncate">
                                                                    {partner.blogName}
                                                                </h3>
                                                            </div>
                                                            <div className="text-xs text-slate-400">
                                                                <span className="font-medium">Domínio:</span> {partner.blogDomain}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                                                                <LucideUser />
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
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </div>
        </div>
    );
};

export default MyPartners;