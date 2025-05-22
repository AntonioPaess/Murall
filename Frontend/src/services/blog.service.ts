import httpClient from "@/lib/api";
import { Blogs } from "@/models/blogs";

interface BlogRegisterRequest {
    blogName: string,
    blogDomain: string, 
    blogDescription: string, 
    blogImagesUrl: string[]
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

    async listAllBlogs(): Promise<Array<Blogs>> {
        try {
            const response = await httpClient.get("/api/blog");
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            throw new Error("Erro ao listar blogs: " + (error?.response?.data || error.message));
        }
    },

    async updateBlog(data: BlogRegisterRequest, id: number): Promise<string> {
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
    }
}