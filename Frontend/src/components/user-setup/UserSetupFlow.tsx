import { useState } from 'react';
import { User } from '@/models/users';
import ProfileStep from './steps/ProfileStep';
import BlogRegisterStep from './steps/BlogRegisterStep';
import BlogProfileStep from './steps/BlogProfileStep';
import BannerUploadStep from './steps/BannerUploadStep';
import BackgroundWaves from './BackgroundWaves';
import { CircleArrowLeft } from 'lucide-react';
import UsageTypeStep from './steps/UsageTypeStep';
import { userService } from '@/services/user.service';
import { blogService } from '@/services/blog.service';
import { Card } from '../ui/card';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import LoaderMurall from '../Loader';

interface UserSetupFlowProps {
  user: User | null;
  onComplete: (user: User) => void;
}

const normalizeDomain = (domain: string) =>
  domain.toLowerCase().replace(/^https?:\/\//, '').split('/')[0];

const UserSetupFlow = ({ user: initialUser, onComplete }: UserSetupFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [user, setUser] = useState<User>(initialUser || {});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();

  const steps = [
    { title: 'Qual será seu uso do Murall?', component: UsageTypeStep },
    { title: 'Personalize seu perfil', component: ProfileStep },
    { title: 'Registre seu Blog', component: BlogRegisterStep },
    { title: 'Personalize o perfil do seu blog', component: BlogProfileStep },
    { title: 'Faça o upload do seu primeiro banner', component: BannerUploadStep },
  ];

  const handleNext = async (data: Partial<User>) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const updatedUser: User = {
      ...user,
      ...data,
      blogs: data.blogs ?? user.blogs,
    };

    try {
      if (currentStep < steps.length - 1) {
        setUser(updatedUser);
        setCurrentStep(currentStep + 1);
      } else {
        if (updatedUser.role && updatedUser.id) {
          await userService.setUserRole({ role: updatedUser.role }, updatedUser.id);
        }

        if ((updatedUser.biography || updatedUser.avatar) && updatedUser.id) {
          await userService.editUser({
            biography: updatedUser.biography,
            // avatar: updatedUser.avatar
          }, updatedUser.id);
        }

        const blog = updatedUser.blogs?.[0];
        if (blog?.blogName && blog.blogDomain) {
          const normalizedDomain = normalizeDomain(blog.blogDomain);
          await blogService.createBlog({
            blogName: blog.blogName,
            blogDomain: normalizedDomain,
            blogDescription: blog.blogDescription || '',
            categoryNames: blog.categories?.map(category => category.name || "") || [],
            blogImagesUrl: blog.blogImagesUrl?.map(img => img.imageUrl || '') || [],
          });
        }

        setUser(updatedUser);
        toast.success("Cadastro concluído com sucesso!");
        onComplete(updatedUser);
      }
    } catch (error: any) {
      console.error("Erro ao finalizar setup:", error);
      toast.error("Erro ao finalizar cadastro. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  if (isSubmitting) {
    return <LoaderMurall />;
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[hsl(202,31%,13%)] overflow-hidden relative">
      <BackgroundWaves />

      <div className="w-full max-w-2xl z-10 px-4">
        <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
          <Image
            src={
              theme === "dark"
                ? "/LogoGrandeDark.png"
                : "/LogoGrandeLigth.png"
            }
            alt="Murall Logo"
            width={90}
            height={90}
            priority
            className='cursor-pointer'
          />
        </div>

        <div className="bg-opacity-90 rounded-lg shadow-lg overflow-hidden backdrop-blur-sm border border-[hsl(220,13%,30%)]">
          <Card
            className="w-full p-4 sm:p-6 md:p-12 max-w-full"
            style={{
              background: 'linear-gradient(180deg, #0A2A45 0%, #0D1522 100%)'
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
              <div className='flex flex-row items-center gap-3'>
                {currentStep > 0 && (
                  <CircleArrowLeft
                    className="text-[#C5CCD6] cursor-pointer"
                    size={32}
                    onClick={handleBack}
                  />
                )}
                <h2 className="text-xl sm:text-2xl font-semibold text-[#C5CCD6]">
                  {steps[currentStep].title}
                </h2>

              </div>
            </div>

            <CurrentStepComponent
              user={user}
              onNext={handleNext}
              onBack={handleBack}
              isFirstStep={currentStep === 0}
              isLastStep={currentStep === steps.length - 1}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserSetupFlow;