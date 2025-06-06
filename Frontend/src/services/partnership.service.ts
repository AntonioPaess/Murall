import httpClient from "@/lib/api";
import { BlogPartnership, BlogPartnersSituation } from "@/models/blog-partnership";
import { Blogs } from "@/models/blogs";

export interface BlogSimpleDTO {
    id: number
    blogName: string
    blogDomain: string
    blogAvatar: string

}

interface PartnershipResponse {
    id: number;
    senderBlog: BlogSimpleDTO;
    receiverBlog: BlogSimpleDTO;
    situation: BlogPartnersSituation;
    requestDate: string;
    updateDate: string;
}


export interface BlogPartnershipDTO {
    id: number,
    simpleBlog: BlogSimpleDTO,
    since: string
}

export const blogPartnershipService = {

    // Enviar solicitação de parceria
    async sendPartnershipRequest(senderBlogId: number, receiverBlogId: number): Promise<PartnershipResponse> {
        try {
            const response = await httpClient.post('/api/partnerships', {
                senderBlogId,
                receiverBlogId
            });
            const dataReponse = response.data;
            return dataReponse;
        } catch (error: any) {
            throw new Error("Erro ao Enviar solicitação de parceria: " + (error?.response?.data || error.message));
        }
    },

    async acceptPartnershipRequest(partnershipId: number) {
        try {
            const response = await httpClient.patch(
                `/api/partnerships/${partnershipId}/accept`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erro ao aceitar parceria");
        }
    },

    async rejectPartnershipRequest(partnershipId: number) {
        try {
            const response = await httpClient.patch(
                `/api/partnerships/${partnershipId}/reject`,
                {}, // Corpo vazio
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erro ao recusar parceria");
        }
    },

    // Listar solicitações pendentes recebidas por um blog
    async getPendingRequests(blogId: number): Promise<PartnershipResponse[]> {
        try {
            const response = await httpClient.get(`/api/partnerships/blog/${blogId}/pending`);
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            throw new Error("Erro ao Listar solicitações pendentes recebidas por um blog: " + (error?.response?.data || error.message));
        }
    },

    // Para contar SOLICITAÇÕES PENDENTES do usuário (todos os blogs)
    async countPendingRequestsByUser(userId: number): Promise<number> {
        try {
            const response = await httpClient.get(`/api/partnerships/user/${userId}/pending/count`);
            return response.data.count;
        } catch (error: any) {
            throw new Error("Erro ao contar notificações pendentes: " +
                (error?.response?.data?.message || error.message));
        }
    },

    // Para contar solicitações PENDENTES de um blog específico
    async countPendingRequests(blogId: number): Promise<number> {
        try {
            const response = await httpClient.get(`/api/partnerships/blog/${blogId}/pending/count`);
            return response.data.count;
        } catch (error: any) {
            throw new Error("Erro ao contar solicitações pendentes: " + (error?.response?.data?.message || error.message));
        }
    },

    // Listar solicitações enviadas por um blog
    async getSentRequests(blogId: number): Promise<PartnershipResponse[]> {
        try {
            const response = await httpClient.get(`/api/partnerships/blog/${blogId}/sent`);
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            throw new Error("Erro ao Listar solicitações enviadas por um blog: " + (error?.response?.data || error.message));
        }
    },

    // Listar parcerias ativas de um blog
    async getActivePartnerships(blogId: number): Promise<BlogPartnershipDTO[]> {
        try {
            const response = await httpClient.get(`/api/partnerships/blog/${blogId}/active`);
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            throw new Error("Erro ao Listar parcerias ativas de um blog: " + (error?.response?.data || error.message));
        }
    },

    // Listar blogs parceiros (apenas os blogs, não as relações)
    async getPartnerBlogs(blogId: number): Promise<BlogSimpleDTO[]> {
        try {
            const response = await httpClient.get(`/api/partnerships/blog/${blogId}/partners`);
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            throw new Error("Erro ao listar blogs parceiros: " + (error?.response?.data || error.message));
        }
    },

    // Método auxiliar para converter Blog para BlogSimpleDTO
    toBlogSimpleDTO(blog: Blogs): BlogSimpleDTO {
        return {
            id: blog.id || 0,
            blogName: blog.blogName || '',
            blogDomain: blog.blogDomain || '',
            blogAvatar: blog.blogAvatar || ''
        };
    },

    // Método auxiliar para converter PartnershipResponse para BlogPartnership
    toBlogPartnership(response: PartnershipResponse): BlogPartnership {
        return {
            id: response.id,
            senderBlog: response.senderBlog,
            receiverBlog: response.receiverBlog,
            situation: response.situation,
            requestDate: response.requestDate,
            updateDate: response.updateDate
        };
    }
}