import httpClient from "@/lib/api";
import { User } from "@/models/users";

interface LoggedUser {
    username: string;
    email: string;
    user_role: string
}

export const userService = {


    async getUser(): Promise<User> {
        try {
            const response = await httpClient.get('/api/user/me')
            const dataResponse = response.data;
            return dataResponse;
        } catch (error: any) {
            console.error("Erro ao pegar dados do usuário:", error);
            throw new Error("Erro ao pegar dados do usuário: " + (error.response?.data?.message || error.message));
        }
    }
}


export default userService;