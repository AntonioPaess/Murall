'use client';

import { motion } from 'framer-motion';
import { LoaderCircle, CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import userService from '@/services/user.service';
import { toast } from 'sonner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoaderMurall from '@/components/Loader';

export default function ResetPasswordPage() {
    const { token } = useParams();
    const tokenReq = Array.isArray(token) ? token[0] : token || '';
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const isProcessing = useRef(false);

    useEffect(() => {
        const validate = async () => {
            try {
                const response = await userService.validateResetToken(tokenReq);

                if (response !== "Token válido.") {
                    setTimeout(() => {
                        router.push("/not-found");
                    }, 2000);
                    return;
                }
                setIsLoading(false);
            } catch (error) {
                setTimeout(() => {
                    router.push("/not-found");
                }, 2000);
            }
        };

        if (tokenReq) {
            validate();
        }
    }, [tokenReq]);

    if (isLoading) {
        return <LoaderMurall />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isProcessing.current) return;

        // Validação básica
        if (!token || !password || !confirmPassword) {
            toast.error('Preencha todos os campos obrigatórios');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('As senhas devem coincidir');
            return;
        }

        isProcessing.current = true;
        setStatus('loading');

        try {
            const result = await userService.userResetPassword({ token: tokenReq as string, newPassword: password });

            setStatus('success');
            setMessage(result);
            toast.success(result);
            setTimeout(() => {
                router.push('/signin');
            }, 3000);
        } catch (error: any) {
            setStatus('error');
            const errorMsg = error.message.replace('Erro ao trocar senha: ', '');
            setMessage(errorMsg);
            toast.error(errorMsg);
        } finally {
            isProcessing.current = false;
        }
    };

    return (
        <>
            <Navbar />
            <main className="flex min-h-[80vh] flex-col items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full bg-background rounded-lg border border-border p-8 shadow-md"
                >
                    <h1 className="text-2xl font-bold text-center mb-6">Redefinir Senha</h1>

                    {status === 'success' ? (
                        <SuccessState message={message} />
                    ) : status === 'error' ? (
                        <ErrorState message={message} />
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="password">Nova Senha</Label>
                                    <div className='relative'>
                                        <Input
                                            id="password"
                                            placeholder="••••••••"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="bg-background/80 border-border text-primary-foreground mt-2 focus:border-primary/50 focus:ring-primary/30"
                                            required
                                        />
                                        <div
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={() => setShowPassword((prev) => !prev)}>
                                            {showPassword ? (
                                                <Eye className="text-primary-foreground" />
                                            ) : (
                                                <EyeOff className="text-primary-foreground" />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                                    <Input
                                        id="confirmPassword"
                                        placeholder="••••••••"
                                        type={showPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="bg-background/80 border-border text-primary-foreground mt-2 focus:border-primary/50 focus:ring-primary/30"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? (
                                    <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                                ) : null}
                                Redefinir Senha
                            </Button>
                        </form>
                    )}
                </motion.div>
            </main>
            <Footer />
        </>
    );
}

const SuccessState = ({ message }: { message: string }) => (
    <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center text-center"
    >
        <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
        <p className="text-primary text-lg font-semibold">{message}</p>
        <p className="text-muted-foreground mt-2">Você será redirecionado para o login...</p>
    </motion.div>
);

const ErrorState = ({ message }: { message: string }) => (
    <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center text-center"
    >
        <XCircle className="h-16 w-16 text-destructive mb-4" />
        <p className="text-destructive text-lg font-semibold">{message}</p>
        <p className="text-muted-foreground mt-2">Tente novamente ou solicite um novo link.</p>
        <div className="mt-2 text-center">
            <Link href="/signin">
                <Button variant="link" className="text-primary">
                    Voltar para o Login
                </Button>
            </Link>
        </div>
    </motion.div>
);