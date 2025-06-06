import { Blogs } from "../blogs";

export enum UserRole {
    ROLE_MURALL_ADMIN = 'MURALL_ADMIN',
    ROLE_BLOG_USER = 'BLOG_USER',
    ROLE_VISITOR_USER = 'VISITOR_USER'
}
export interface User {
    id?: number;
    username?: string;
    biography?: string;
    email?: string;
    role?: UserRole;
    createdAt?: string;
    situation?: string;
    notifications?: number;
    avatar?: string
    blogs?: Blogs[]
}