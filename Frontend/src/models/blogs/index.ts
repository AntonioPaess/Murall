import { User } from "../users"

export interface BlogImage {
    id?: number;
    imageUrl?: string;
    blogId?: number;
}

export interface Blogs {
    id?: number,
    blogName?: string,
    blogDescription?: string
    blogDomain?: string
    user?: User
    blogImagesUrl?: BlogImage[];
    createdAt?: string;
}