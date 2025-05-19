import httpClient from "@/lib/api";
import { handleError } from "./lib/error";
import { User } from "@/models/users";

interface UserUpdateRequest {
    username: string;
    biografia?: string;
    email?: string;
    password?: string;
}

interface ForgotPasswordRequest {
    email: string;
}

interface ResetPasswordRequest {
    token: string;
    newPassword: string;
}

export const userService = {

    async getUser(): Promise<User> {
        try {
            const response = await httpClient.get('/api/user/me');
            return response.data;
        } catch (error: any) {
            handleError(error, "Erro ao pegar dados do usuário");
        }
    },

    async editUser(data: UserUpdateRequest, userId: number): Promise<string> {
        const isOnlyBio = !!data.biografia &&
            !data.username &&
            !data.email &&
            !data.password;

        try {
            const response = await httpClient.put(`/api/user/${userId}`, data);
            return response.data;
        } catch (error: any) {
            const message = isOnlyBio ? "Erro ao editar biografia" : "Erro ao editar usuário";
            handleError(error, message);
        }
    },

    async deleteUser(userId: number): Promise<string> {
        try {
            const response = await httpClient.delete(`/api/user/${userId}`);
            return response.data;
        } catch (error: any) {
            handleError(error, "Erro ao deletar usuário");
        }
    },

    async userForgotPassword(data: ForgotPasswordRequest): Promise<string> {
        try {
            const response = await httpClient.post("/api/user/forgot-password", data);
            return response.data;
        } catch (error: any) {
            handleError(error, "Erro ao enviar e-mail de troca de senha");
        }
    },

    async userResetPassword(data: ResetPasswordRequest): Promise<string> {
        try {
            const response = await httpClient.post("/api/user/reset-password", data);
            return response.data;
        } catch (error: any) {
            handleError(error, "Erro ao trocar senha");
        }
    }
};

export default userService;
