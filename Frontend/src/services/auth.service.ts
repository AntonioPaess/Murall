import httpClient from "@/lib/api";
import { User } from "@/models/users";
import { handleError } from "./lib/error";

interface RegisterRequest {
    username: string;
    password: string;
    email: string;
    role: "ROLE_USER" | "ROLE_ADMIN";
}

interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

export const authService = {

    async register(data: RegisterRequest): Promise<string> {
        try {
            const response = await httpClient.post("/api/auth/register", data);
            return response.data;
        } catch (error: any) {
            handleError(error, "Erro ao fazer cadastro");
        }
    },
    
    async login(data: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await httpClient.post<LoginResponse>("/api/auth/login", data);
            const loginResponse = response.data;

            localStorage.setItem('token', loginResponse.token);
            return loginResponse;
        } catch (error: any) {
            handleError(error, "Erro ao fazer login");
        }
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    },

    logout(): void {
        localStorage.removeItem('token');
    },
};

export default authService;
