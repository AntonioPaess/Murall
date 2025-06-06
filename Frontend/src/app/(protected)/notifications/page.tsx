"use client";

import { useSidebar } from '@/app/contexts/SidebarContext';
import LoaderMurall from '@/components/Loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { blogPartnershipService } from '@/services/partnership.service';
import { useUser } from '@/app/contexts/UserContext';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { BlogPartnership } from '@/models/blog-partnership';

const Notifications = () => {
    const [pendingRequests, setPendingRequests] = useState<BlogPartnership[]>([]);
    const [loading, setLoading] = useState(true);
    const { collapsed, isMobile } = useSidebar();
    const { user } = useUser();

    const fetchPendingRequests = async () => {
        try {
            setLoading(true);
            
            if (!user?.blogs || user.blogs.length === 0) {
                toast.error("Usuário sem blogs.");
                return;
            }

            const requests = await Promise.all(
                user.blogs.map(blog => 
                    blogPartnershipService.getPendingRequests(blog.id ?? 0) // Usamos operador de coalescência nula
                        .catch(error => {
                            toast.error(`Erro ao buscar solicitações para o blog ${blog.id}: ${error.message}`);
                            return [];
                        })
                ));
            
            setPendingRequests(requests.flat());
        } catch (error: any) {
            toast.error("Erro ao buscar solicitações: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (partnershipId: number) => {
        try {
            await blogPartnershipService.acceptPartnershipRequest(partnershipId);
            toast.success("Parceria aceita com sucesso!");
            setPendingRequests(prev => prev.filter(r => r.id !== partnershipId));
        } catch (error: any) {
            toast.error("Erro ao aceitar: " + error.message);
        }
    };

    const handleReject = async (partnershipId: number) => {
        try {
            await blogPartnershipService.rejectPartnershipRequest(partnershipId);
            toast.success("Parceria recusada com sucesso!");
            setPendingRequests(prev => prev.filter(r => r.id !== partnershipId));
        } catch (error: any) {
            toast.error("Erro ao recusar: " + error.message);
        }
    };

    useEffect(() => {
        fetchPendingRequests();
    }, [user?.blogs]);

    return (
        <div className="flex min-h-screen bg-background transition-all duration-300 overflow-x-hidden">
            <div className={`flex-1 p-8 transition-all duration-300 ${
                isMobile ? "pl-[110px]" : 
                collapsed ? "pl-[110px]" : 
                "pl-[18rem]"
            } max-w-full`}>
                <div className="flex flex-col gap-6">
                    <h1 className="text-2xl font-bold text-[#C4C1C1]">Solicitações de Parceria</h1>
                    
                    {loading ? (
                        <div className="flex justify-center">
                            <LoaderMurall />
                        </div>
                    ) : pendingRequests.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">Nenhuma solicitação pendente encontrada</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pendingRequests.map((request) => (
                                <div 
                                    key={request.id} 
                                    className="bg-background/50 border border-border p-4 rounded-lg hover:bg-slate-800/70 transition-all duration-200"
                                >
                                    <div className="flex flex-col sm:flex-row items-center gap-4">
                                        <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-primary">
                                            <AvatarImage 
                                                src={request.senderBlog?.blogAvatar ?? ''} 
                                                alt={request.senderBlog?.blogName ?? 'Blog parceiro'} 
                                                className="object-cover" 
                                            />
                                            <AvatarFallback className="bg-primary/60 text-white text-xl font-semibold uppercase">
                                                {request.senderBlog?.blogName?.charAt(0) || 'B'}
                                            </AvatarFallback>
                                        </Avatar>
                                        
                                        <div className="flex-1 min-w-0 text-center sm:text-left">
                                            <h3 className="text-lg font-semibold text-[#C4C1C1] truncate">
                                                {request.senderBlog?.blogName || 'Blog sem nome'}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {request.senderBlog?.blogDomain || 'Sem domínio'}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Solicitado em: {request.requestDate ? new Date(request.requestDate).toLocaleDateString() : 'Data não disponível'}
                                            </p>
                                        </div>
                                        
                                        <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                                            <Button 
                                                size="sm" 
                                                className="w-full bg-primary hover:bg-primary/90"
                                                onClick={() => request.id && handleAccept(request.id)}
                                                disabled={!request.id}
                                            >
                                                Aceitar
                                            </Button>
                                            <Button 
                                                size="sm" 
                                                variant="outline" 
                                                className="w-full text-red-500 border-red-500 hover:bg-red-500/60 hover:text-white"
                                                onClick={() => request.id && handleReject(request.id)}
                                                disabled={!request.id}
                                            >
                                                Recusar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notifications;