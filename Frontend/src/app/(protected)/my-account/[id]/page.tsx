"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import userService from '@/services/user.service';
import { toast } from 'sonner';
import LoaderMurall from '@/components/Loader';
import { Textarea } from '@/components/ui/textarea';
import { User } from '@/models/users';
import { jwtDecode } from 'jwt-decode'; 

export default function ProfilePage() {
  const { id } = useParams();
  const router = useRouter(); 
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [biography, setBiography] = useState('');

  useEffect(() => {
    
    if (typeof window === 'undefined') return;
    
    
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Sessão expirada. Faça login novamente.');
      router.push('/signin');
      return;
    }

    console.log("Token:", localStorage.getItem('token'));
    console.log("User:", JSON.parse(localStorage.getItem('user') || '{}'));

    try {
      
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      if (decoded.exp < currentTime) {
        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.error('Sessão expirada. Faça login novamente.');
        router.push('/signin');
        return;
      }
      
      
      const fetchUserData = async () => {
        try {
          const userData = await userService.getUser();
          setUser(userData);
          setBiography(userData.biography || '');
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
          toast.error('Não foi possível carregar os dados do usuário.');
          router.push('/signin');
        } finally {
          setLoading(false);
        }
      };
      
      fetchUserData();
    } catch (error) {
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.error('Sessão inválida. Faça login novamente.');
      router.push('/signin');
    }
  }, [router]);

  const handleSave = async () => {
    if (!user || !user.id) return;
    
    try {
      await userService.editUser({
        biography
      }, user.id);
      
      setIsEditing(false);
      toast.success('Biografia atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar biografia:', error);
      toast.error('Não foi possível salvar as alterações.');
    }
  };

  if (loading) {
    return <LoaderMurall />;
  }

  return (
    <div className="flex-1 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-auto"> 
            
            <div className="relative w-64 h-64 -ml-8"> 
              <div className="overflow-hidden rounded-full border-4 border-[hsl(var(--background))] ring-4 ring-white ring-offset-4 ring-offset-[hsl(var(--background))] shadow-md">
                <Image 
                  src={user?.avatar || "/default-avatar.png"} 
                  alt={user?.username || "Usuário"} 
                  width={256}
                  height={256}
                  className="object-cover w-64 h-64"
                  priority
                />
              </div>
            </div>
          </div>
          
          <div className="flex-1"> 
            
            <h1 className="text-4xl font-bold text-white mb-6">
              {user?.username || "Usuário"}
            </h1>
            
            
            <div>
              <h2 className="text-2xl text-white mb-3">Biografia</h2>
              
              {isEditing ? (
                <div className="space-y-4">
                  <Textarea 
                    value={biography} 
                    onChange={(e) => setBiography(e.target.value)}
                    className="min-h-[200px] bg-[#0a1122] text-white text-lg border-border resize-none p-4 w-full"
                    placeholder="Escreva algo sobre você..."
                  />
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleSave}
                      className="bg-primary hover:brightness-110 text-primary-foreground"
                    >
                      Salvar
                    </Button>
                    <Button 
                      onClick={() => {
                        setBiography(user?.biography || '');
                        setIsEditing(false);
                      }}
                      variant="outline"
                      className="border-border text-white hover:bg-border/10"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-[#0a1122] text-white text-lg border border-border rounded-md p-4 min-h-[200px] w-full">
                    {biography || "Nenhuma biografia disponível."}
                  </div>
                  <Button 
                    onClick={() => setIsEditing(true)} 
                    className="mt-4 bg-primary hover:brightness-110 text-primary-foreground w-full"
                  >
                    Editar
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}