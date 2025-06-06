import httpClient from "@/lib/api";
import { User } from "@/models/users";

interface UserUpdateRequest {
    username?: string,
    email?: string,
    avatar?: string,
    biography?: string,
    password?: string
}

interface ForgotPasswordRequest {
    email: string
}

interface ResendVerificationRequest {
    email: string
}

interface ResetPasswordRequest {
    token: string,
    newPassword: string
}

interface SetUserRoleRequest {
    role: string;
}

export const userService = {


    async getUser(): Promise<User> {
        try {
            const response = await httpClient.get('/api/user/me');
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 403 && error.response?.data) {
                return error.response.data;
            }
            throw new Error(error.response?.data?.message || error.message);
        }
    },

    async editUser(data: UserUpdateRequest, userId: number): Promise<string> {
        const isOnlyBio = !!data.biography &&
            !data.username &&
            !data.email &&
            !data.password;

        try {
            const response = await httpClient.put(`/api/user/${userId}`, data);
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            const message = isOnlyBio
                ? "Erro ao editar biografia. Tente novamente em breve."
                : error?.response?.data
            throw new Error("Erro ao editar usuário: " + (message || error.message));
        }
    },

    async setUserRole(data: SetUserRoleRequest, userId: number): Promise<String> {
        try {
            const response = await httpClient.put(`/api/user/${userId}/set-role`, data);
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            throw new Error("Erro ao definir cargo do usuário: " + (error?.response?.data || error.message));
        }
    },

    async deleteUser(userId: number): Promise<string> {
        try {
            const response = await httpClient.delete(`/api/user/${userId}`);
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            throw new Error("Erro ao deletar usuário: " + (error?.response?.data || error.message));
        }
    },

    async resendVerificationEmail(data: ResendVerificationRequest): Promise<string> {
        try {
            const response = await httpClient.post("/api/user/resend-verification", data);
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            throw new Error("Erro ao reenviar email de verificação: " + (error?.response?.data || error.message));
        }
    },

    async userForgotPassword(data: ForgotPasswordRequest): Promise<string> {
        try {
            const response = await httpClient.post("/api/user/forgot-password", data);
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            throw new Error("Erro ao enviar e-mail de troca de senha: " + (error.response?.data || error.message));
        }
    },

    async userResetPassword(data: ResetPasswordRequest): Promise<string> {
        try {
            const response = await httpClient.post("/api/user/reset-password", data);
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            throw new Error("Erro ao trocar senha: " + (error?.response?.data || error.message));
        }
    },

    async verifyUser(token: string): Promise<string> {
        try {
            const response = await httpClient.get(`/api/auth/verifyUser/${token}`);
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            const status = error.response?.status;
            const message = error.response?.data || "Erro ao confirmar conta";
            throw { message, status }; // Propagamos o status 
        }
    },

    async validateResetToken(token: string): Promise<string> {
        try {
            const response = await httpClient.get(`/api/user/reset-password/validate?token=${token}`)
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            throw new Error("Erro ao validar token: " + (error?.response?.data || error.message));
        }
    }
}

export default userService;