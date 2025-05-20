import httpClient from "@/lib/api";

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

    async register(data: RegisterRequest): Promise<String> {
        try {
            const response = await httpClient.post("/api/auth/register", data);
            const dataR = response.data;
            return dataR;
        } catch (error: any) {
            throw new Error("Erro ao fazer cadastro: " + (error?.response?.data.message || error.message));
        }
    },
    
    async login(data: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await httpClient.post("/api/auth/login", data);
            const token = response.data

            localStorage.setItem('token', token);
            return token;
        } catch (error: any) {
            throw new Error('Erro ao fazer login: ' + (error?.response?.data.message || error.message));
        }
    },

    getToken(): string | null {
        return localStorage.getItem('token');
      },

      logout(): void {
        localStorage.removeItem('token');
      },
}

export default authService;