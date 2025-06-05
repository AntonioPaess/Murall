"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const MyAccount = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
        if (typeof window === 'undefined') return;

        const redirectToUserProfile = () => {
            try {
                const userData = localStorage.getItem('user');
                if (userData) {
                    const user = JSON.parse(userData);
                    if (user?.id) {
                        router.push(`/my-account/${user.id}`);
                        return;
                    }
                }
                
               
                router.push('/signin');
            } catch (error) {
                console.error('Erro ao redirecionar:', error);
                router.push('/signin');
            }
        };

        
        const timer = setTimeout(redirectToUserProfile, 500);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="flex h-[80vh] gap-4 flex-col items-center justify-center">
                <p className="flex justify-center items-center text-xl text-muted-foreground w-full">
                    Redirecionando para seu perfil...
                </p>
                <Image src={"/typing-laptop.gif"} alt="Loading" width={200} height={200} />
            </div>
        </div>
    );
}

export default MyAccount;