import httpClient from "@/lib/api";
import { Blogs } from "@/models/blogs";

interface BlogRegisterRequest {
    blogName: string,
    blogDomain: string,
    blogDescription: string,
    blogAvatar: string,
    blogImagesUrl: string[],
    categoryNames: string[]
}

interface BlogUpdateRequest {
    blogName: string;
    blogDomain: string;
    blogDescription: string;
    blogAvatar: string;
    blogImagesUrl: string[]; 
    categoryNames: string[];
}

interface BlogDomainRequest {
    blogDomain: string
}

export const blogService = {

    async createBlog(data: BlogRegisterRequest): Promise<string> {
        try {
            const response = await httpClient.post("/api/blog", data);
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            throw new Error("Erro ao criar blog: " + (error?.response?.data || error.message));
        }
    },

    async getBlog(id : number): Promise<Blogs> {
        try {
            const response = await httpClient.get(`/api/blog/${id}`);
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            throw new Error("Erro ao pegar informações do blog: " + (error?.response?.data || error.message));
        }
    },

    async getBlogsByUser(userId : number): Promise<Blogs> {
        try {
            const response = await httpClient.get(`/api/blog/user/${userId}`);
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            throw new Error("Erro ao pegar informações do blog: " + (error?.response?.data || error.message));
        }
    },

    async listAllBlogs(): Promise<Array<Blogs>> {
        try {
            const response = await httpClient.get("/api/blog");
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            throw new Error("Erro ao listar blogs: " + (error?.response?.data || error.message));
        }
    },

    async updateBlog(data: BlogUpdateRequest, id: number): Promise<string> {
        try {
            const response = await httpClient.put(`/api/blog/${id}`, data);
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            throw new Error("Erro ao editar blog: " + (error?.response?.data || error.message));
        }
    },

    async deleteBlog(blogId: number): Promise<string> {
        try {
            const response = await httpClient.delete(`/api/blog/${blogId}`);
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            throw new Error("Erro ao deletar blog: " + (error?.response?.data || error.message));
        }
    },

    async isUniqueBlogDomain(data: BlogDomainRequest): Promise<string> {
        try {
            const response = await httpClient.post(`/api/blog/check-unique`, data);
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            throw new Error("Erro ao checar se dominio é único: " + (error?.response?.data || error.message));
        }
    }
}