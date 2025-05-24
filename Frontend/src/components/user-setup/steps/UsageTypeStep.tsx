import { useState, useEffect } from 'react';
import { User, UserRole } from '@/models/users';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import userService from '@/services/user.service';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface UsageTypeStepProps {
  user: User;
  onNext: (data: Partial<User>) => void;
  onBack?: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const UsageTypeStep = ({ user, onNext }: UsageTypeStepProps) => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>();

  useEffect(() => {
    if (user.role) {
      setSelectedRole(user.role);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      toast.error("Selecione um perfil de usuário");
      return;
    }

    try {
      if (user.id) {
        await userService.setUserRole({ role: selectedRole }, user.id);
      }

      onNext({ role: selectedRole });

      if (selectedRole === UserRole.ROLE_VISITOR_USER) {
        router.push('/');
      }

    } catch (err) {
      console.error('Erro ao definir perfil do usuário:', err);
      toast.error("Erro ao salvar o perfil. Tente novamente.");
    }
  };

  return (
    <div>
      <p className="text-sm text-[#C5CCD6] mb-6">
        Nos diga em qual perfil você mais se encontra para que o Murall possa lhe oferecer a melhor experiência
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            className={cn(
              "cursor-pointer p-6 flex flex-col items-center border-2 bg-background hover:bg-secondary border-[hsl(220,13%,40%)]",
              selectedRole === UserRole.ROLE_VISITOR_USER && "border-primary bg-secondary"
            )}
            onClick={() => setSelectedRole(UserRole.ROLE_VISITOR_USER)}
          >
            <div className="w-32 h-32 rounded-md bg-[hsl(202,31%,15%)] flex items-center justify-center mb-3">
              <Image src={'/visitante.svg'} width={100} height={100} className='mr-4 mt-3' alt={'Visitante'} />
            </div>
            <span className="text-[#C5CCD6] font-medium">Visitante Web</span>
          </Card>

          <Card
            className={cn(
              "cursor-pointer p-6 flex flex-col items-center border-2 bg-background hover:bg-secondary border-[hsl(220,13%,40%)]",
              selectedRole === UserRole.ROLE_BLOG_USER && "border-primary bg-secondary"
            )}
            onClick={() => setSelectedRole(UserRole.ROLE_BLOG_USER)}
          >
            <div className="w-32 h-32 rounded-md bg-[hsl(202,31%,15%)] flex items-center justify-center mb-3">
              <Image src={'/admblog.svg'} width={100} height={100} alt={'Adm Blog'} />
            </div>
            <span className="text-[#C5CCD6] font-medium">Administrador de blog/site</span>
          </Card>
        </div>

        <div className="flex justify-end pt-4">
          <Button className="bg-primary hover:brightness-110 w-[150px] text-primary-foreground">
            {selectedRole === UserRole.ROLE_VISITOR_USER ? "Concluir" : "Próximo"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UsageTypeStep;