"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Blogs } from "@/models/blogs";
import { blogService } from "@/services/blog.service";
import { useEffect, useState } from "react";

interface BlogSelectProps {
    userId: number;
    onConfirm: (selectedBlogId: number) => void; // Callback para passar o ID do blog selecionado
}

export function BlogSelect({ userId, onConfirm }: BlogSelectProps) {
    const [open, setOpen] = useState(false);
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [selectedBlog, setSelectedBlog] = useState<string | undefined>(undefined);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const blogsResponse = await blogService.getBlogsByUser(userId);
                setBlogs(Array.isArray(blogsResponse) ? blogsResponse : [blogsResponse]);
            } catch (error) {
                console.error("Erro ao carregar blogs:", error);
            }
        };
        loadBlogs();
    }, [userId]);

    const handleConfirm = () => {
        if (selectedBlog) {
            onConfirm(parseInt(selectedBlog, 10)); // Converte string para number
            setOpen(false); // Fecha o diálogo após confirmar
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="w-full font-semibold text-white bg-primary hover:bg-primary/90 transition-colors"
                    variant="default"
                >
                    Mandar Parceria
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Enviar Solicitação de Parceria</DialogTitle>
                    <DialogDescription>
                        Selecione um dos seus blogs para enviar a solicitação de parceria.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <Select value={selectedBlog} onValueChange={setSelectedBlog}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione um blog" />
                        </SelectTrigger>
                        <SelectContent>
                            {blogs.length > 0 ? (
                                blogs
                                    .filter((blog) => blog.id !== undefined)
                                    .map((blog) => (
                                        <SelectItem
                                            key={blog.id}
                                            value={blog.id!.toString()}
                                            className="cursor-pointer hover:text-gray-50 hover:bg-slate-700"
                                        >
                                            {blog.blogName || "Blog sem nome"}
                                        </SelectItem>
                                    ))
                            ) : (
                                <SelectItem value="none" disabled>
                                    Nenhum blog disponível
                                </SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                    <Button
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={!selectedBlog}
                        onClick={handleConfirm}
                    >
                        Confirmar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}