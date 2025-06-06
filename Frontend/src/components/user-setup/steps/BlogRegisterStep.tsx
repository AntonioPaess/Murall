import React, { useState, useEffect } from 'react';
import { isValidDomain } from '@/app/utils/validators';
import { User } from '@/models/users';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { blogService } from '@/services/blog.service';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

interface BlogRegisterStepProps {
    user: User;
    onNext: (data: Partial<User>) => void;
    onBack: () => void;
    isFirstStep: boolean;
    isLastStep: boolean;
}

const BlogRegisterStep = ({ user, onNext, onBack }: BlogRegisterStepProps) => {
    const initialBlog = user.blogs?.[0] || {};
    const [domain, setDomain] = useState(initialBlog.blogDomain || '');
    const [isDomainValid, setIsDomainValid] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (user.blogs?.[0]?.blogDomain) {
            setDomain(user.blogs[0].blogDomain);
        }
    }, [user]);

    const checkDomain = async (): Promise<boolean> => {
        try {
            const result = await blogService.isUniqueBlogDomain({ blogDomain: domain });
            return result === "Domínio válido";
        } catch {
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (domain === "") {
            toast.error("Preencha o campo de domínio antes de prosseguir");
            return;
        }

        if (!isValidDomain(domain)) {
            toast.error("Digite um domínio válido (ex: seublog.com.br)");
            return;
        }

        setIsLoading(true);

        try {
            const isAvailable = await checkDomain();
            if (!isAvailable) {
                toast.warning("Este domínio já está cadastrado. Insira outro.");
                return;
            }

            toast.success("Domínio disponível!");

            onNext({
                blogs: [{
                    ...initialBlog,
                    blogDomain: domain,
                }]
            });
        } catch {
            toast.error("Erro ao verificar domínio. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDomain(value);
        setIsDomainValid(value === '' || isValidDomain(value));
    };

    return (
        <div>
            <p className="text-sm text-[#C5CCD6] mb-6">
                Insira seus dados para que possamos garantir maior segurança no Murall
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="domain" className="text-sm font-medium text-muted-foreground">
                        Domínio do Blog
                    </Label>
                    <Input
                        id="domain"
                        value={domain}
                        onChange={handleDomainChange}
                        className={`bg-background/80 border text-primary-foreground focus:border-primary/50 focus:ring-primary/30`}
                        placeholder="seublog.com.br"
                    />
                    {!isDomainValid && (
                        <p className="text-xs text-red-600 mt-1">
                            Digite um domínio válido (ex: seublog.com.br)
                        </p>
                    )}
                </div>

                <div className="flex justify-end pt-4">
                    <Button disabled={isLoading || !isDomainValid || !domain} className="bg-primary hover:brightness-110 w-[150px] text-primary-foreground">
                        {isLoading ? (<div className='flex flex-row items-center gap-2'><LoaderCircle className='animate-spin' /> Carregando...</div>) : "Próximo"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BlogRegisterStep;
