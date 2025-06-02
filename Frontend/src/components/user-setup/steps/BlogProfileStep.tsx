import React, { useState, useEffect } from 'react';
import { User } from '@/models/users';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Upload, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface BlogProfileStepProps {
    user: User;
    onNext: (data: Partial<User>) => void;
    onBack: () => void;
    isFirstStep: boolean;
    isLastStep: boolean;
}

const AVAILABLE_TAGS = [
    'Atualidade', 'Agricultura', 'Alimentação', 'Aviação',
    'Culinária', 'Saúde', 'Tecnologia', 'Viagem', 'Esportes',
    'Música', 'Arte', 'Cinema'
];

const BlogProfileStep = ({ user, onNext, onBack }: BlogProfileStepProps) => {
    const initialBlog = user.blogs?.[0] || {};

    const [blogName, setBlogName] = useState(initialBlog.blogName || '');
    const [blogDescription, setBlogDescription] = useState(initialBlog.blogDescription || '');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [blogAvatar, setBlogAvatar] = useState<string | undefined>();

    useEffect(() => {
        const blog = user.blogs?.[0] || {};
        setBlogName(blog.blogName || '');
        setBlogDescription(blog.blogDescription || '');
        setSelectedCategories(blog.categories?.map(c => c.name) || []);
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        if (blogName === "" || blogDescription === "") {
            toast.warning("Você deixou algum campo vazio");
            return;
        }

        onNext({
            blogs: [{
                ...initialBlog,
                blogName,
                blogDescription,
                categories: selectedCategories.map(name => ({ name }))
            }]
        });
    };

    const addCategory = (tag: string) => {
        if (!selectedCategories.includes(tag)) {
            setSelectedCategories([...selectedCategories, tag]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setBlogAvatar(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const removeCategory = (tag: string) => {
        setSelectedCategories(selectedCategories.filter(t => t !== tag));
    };

    return (
        <div>
            <p className="text-sm text-[#C5CCD6] mb-6">
                Escolha como você quer que as pessoas vejam seu blog
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <div className="flex flex-col items-start mb-6">
                        <Label htmlFor="avatar" className="text-muted-foreground mb-6">
                            Foto de perfil
                        </Label>
                        <label htmlFor="avatar" className="relative group w-32 h-32 cursor-pointer rounded-full overflow-hidden block">
                            <div className="w-32 h-32 rounded-full bg-background border-2 border-[hsl(220,13%,40%)] flex items-center justify-center overflow-hidden">
                                {blogAvatar ? (
                                    <img src={blogAvatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <Upload className="text-white" size={64} />
                                )}
                            </div>
                            <input
                                type="file"
                                id="avatar"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <Upload className="text-[#C5CCD6]" size={64} />
                            </div>
                        </label>
                    </div>
                    <Label htmlFor="blogName" className="text-sm font-medium text-muted-foreground">
                        Nome do blog
                    </Label>
                    <Input
                        id="blogName"
                        value={blogName}
                        onChange={(e) => setBlogName(e.target.value)}
                        className="bg-background/80 border-border text-primary-foreground focus:border-primary/50 focus:ring-primary/30"
                        placeholder="Digite o nome do seu blog..."
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="blogDescription" className="text-sm font-medium text-muted-foreground">
                        Descrição do blog
                    </Label>
                    <Textarea
                        id="blogDescription"
                        value={blogDescription}
                        onChange={(e) => setBlogDescription(e.target.value)}
                        className="bg-background/80 border-border text-primary-foreground focus:border-primary/50 focus:ring-primary/30 h-24 resize-none"
                        placeholder="Descreva seu blog para seus visitantes..."
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-[#C5CCD6]">Categorias</Label>
                    <p className="text-xs text-[#C5CCD6] mb-2">
                        Escolha pelo menos 3 categorias-chave para que parceiros e leitores encontrem seu blog com mais assertividade
                    </p>

                    <div className="flex flex-wrap gap-2 mb-2">
                        {selectedCategories.map(tag => (
                            <Badge
                                key={tag}
                                className="bg-background hover:bg-[hsl(207,61%,25%)] text-white flex items-center gap-1"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => removeCategory(tag)}
                                    className="ml-1 rounded-full hover:bg-[hsl(207,61%,20%)] p-0.5"
                                >
                                    <X size={12} />
                                </button>
                            </Badge>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-background border-[hsl(220,13%,40%)] text-primary-foreground hover:text-primary border"
                                >
                                    <span className="mr-1">Categorias</span>
                                    <Plus size={16} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="bg-[hsl(220,13%,15%)] border-[hsl(220,13%,40%)] text-[#C5CCD6]"
                            >
                                {AVAILABLE_TAGS.filter(tag => !selectedCategories.includes(tag)).map(tag => (
                                    <DropdownMenuItem
                                        key={tag}
                                        onClick={() => addCategory(tag)}
                                        className="cursor-pointer text-white hover:text-primary hover:bg-background/10"
                                    >
                                        {tag}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {selectedCategories.length > 0 && (
                            <Badge
                                variant="outline"
                                className="bg-[hsl(207,61%,48%)] text-white border-none"
                            >
                                {selectedCategories.length}
                            </Badge>
                        )}
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button className="bg-primary hover:brightness-110 w-[150px] text-primary-foreground">
                        Próximo
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BlogProfileStep;
