'use client';

import { motion } from 'framer-motion';
import { LoaderCircle, CheckCircle2, XCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import userService from '@/services/user.service';
import { toast } from 'sonner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default function VerifyAccountPage() {
    const { id } = useParams();
    const router = useRouter();
    const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'invalid'>('loading');
    const [message, setMessage] = useState('');
    const isVerifying = useRef(false);

    useEffect(() => {
        const verifyAccount = async () => {
            const token = Array.isArray(id) ? id[0] : id;

            // Previne execução duplicada
            if (isVerifying.current) return;
            isVerifying.current = true;

            // Validação do formato UUID
            if (!token || !UUID_REGEX.test(token)) {
                setStatus('invalid');
                setMessage('Token de verificação inválido');
                toast.error('Formato de token inválido');
                return;
            }

            try {
                const result = await userService.verifyUser(token);

                if (result.includes('Sucesso')) {
                    setStatus('success');
                    setMessage(result);
                    toast.success(result);
                } else if (result.includes('expirado') || result.includes('utilizado')) {
                    setStatus('error');
                    setMessage(result);
                    toast.error(result);
                } else {
                    router.push('/not-found');
                }

            } catch (error: any) {
                if (error.response?.status === 404) {
                    router.push('/not-found');
                } else {
                    setStatus('error');
                    const errorMsg = error.message || 'Erro na confirmação da conta';
                    setMessage(errorMsg);
                    toast.error(errorMsg);
                }
            }
        };

        // Adiciona delay e cleanup
        const timer = setTimeout(verifyAccount, 100);
        return () => {
            clearTimeout(timer);
            isVerifying.current = false;
        };
    }, [id, router]);

    return (
        <>
            <Navbar />
            <main className="flex min-h-[80vh] flex-col items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full bg-background rounded-lg border border-border p-8 shadow-md text-center"
                >
                    {status === 'loading' && <LoadingState />}
                    {status === 'success' && <SuccessState message={message} />}
                    {status === 'error' && <ErrorState message={message} />}
                    {status === 'invalid' && <InvalidState />}

                    {(status !== 'loading') && (
                        <Link href="/signin">
                            <Button variant="ghost" className="mt-6 text-primary-foreground hover:text-primary border">
                                Ir para login
                            </Button>
                        </Link>
                    )}
                </motion.div>
            </main>
            <Footer />
        </>
    );
}

// Componentes de estado (mantidos os mesmos)
const LoadingState = () => (
    <>
        <LoaderCircle className="mx-auto mb-6 h-12 w-12 animate-spin text-primary" />
        <p className="text-primary text-lg font-medium">Confirmando conta...</p>
    </>
);

const SuccessState = ({ message }: { message: string }) => (
    <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center"
    >
        <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
        <p className="text-primary text-lg font-semibold">{message}</p>
    </motion.div>
);

const ErrorState = ({ message }: { message: string }) => (
    <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center"
    >
        <XCircle className="h-16 w-16 text-destructive mb-4" />
        <p className="text-white text-lg font-semibold">{message}</p>
        <p className="pt-4 text-muted-foreground text-sm text-center">
            Caso não tenha confirmado a conta ainda, clique{" "}
            <Link
                className="text-primary hover:text-primary/80 font-medium underline underline-offset-2 transition-colors"
                href="/verify/resend"
            >
                aqui
            </Link>.
        </p>
    </motion.div>
);

const InvalidState = () => (
    <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center"
    >
        <XCircle className="h-16 w-16 text-destructive mb-4" />
        <p className="text-white text-lg font-semibold">Token de verificação inválido</p>
        <p className="text-muted-foreground text-sm mt-2">
            O token deve estar no formato UUID válido
        </p>
    </motion.div>
);