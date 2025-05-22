import React, { useState, useEffect } from 'react';
import { User } from '@/models/users';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

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

    // Sincroniza o estado local quando o objeto user muda
    useEffect(() => {
        if (user.blogs?.[0]?.blogDomain) {
            setDomain(user.blogs[0].blogDomain);
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext({
            blogs: [{
                ...initialBlog,
                blogDomain: domain,
            }]
        });
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
                        onChange={(e) => setDomain(e.target.value)}
                        className="bg-background/80 border-border text-primary-foreground focus:border-primary/50 focus:ring-primary/30"
                        placeholder="seublog.com.br"
                    />
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

export default BlogRegisterStep;
