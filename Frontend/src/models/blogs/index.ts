import { BlogPartnership } from "../blog-partnership";
import { Category } from "../categories";
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
    blogAvatar?: string,
    blogDomain?: string
    user?: User
    sentPartnerships?: BlogPartnership
    receivedPartnerships?:BlogPartnership
    blogImagesUrl?: BlogImage[];
    categories?: Category[];
    createdAt?: string;
}