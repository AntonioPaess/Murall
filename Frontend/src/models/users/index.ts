import { Blogs } from "../blogs";

export interface User {
    id?: number;
    username?: string;
    biografia?: string;
    email?: string;
    role?: string;
    createdAt?: string;
    situation?: string;
    notifications?: number;
    avatar?: string
    blogs?: Blogs[]
}