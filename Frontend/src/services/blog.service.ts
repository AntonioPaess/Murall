import httpClient from "@/lib/api";
import { handleError } from "./lib/error";
import { Blogs } from "@/models/blogs";

interface BlogRegisterRequest {
    blogName: string;
    blogDomain: string;
    blogDescription: string;
    blogImagesUrl: string[];
}

export const blogService = {

    async createBlog(data: BlogRegisterRequest): Promise<string> {
        try {
            const response = await httpClient.post("/api/blog", data);
            return response.data;
        } catch (error: any) {
            handleError(error, "Erro ao criar blog");
        }
    },

    async listAllBlogs(): Promise<Blogs[]> {
        try {
            const response = await httpClient.get("/api/blog");
            return response.data;
        } catch (error: any) {
            handleError(error, "Erro ao listar blogs");
        }
    },

    async updateBlog(data: BlogRegisterRequest, id: number): Promise<string> {
        try {
            const response = await httpClient.put(`/api/blog/${id}`, data);
            return response.data;
        } catch (error: any) {
            handleError(error, "Erro ao editar blog");
        }
    },

    async deleteBlog(blogId: number): Promise<string> {
        try {
            const response = await httpClient.delete(`/api/blog/${blogId}`);
            return response.data;
        } catch (error: any) {
            handleError(error, "Erro ao deletar blog");
        }
    }
};

export default blogService;
