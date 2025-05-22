import { useState } from 'react';
import { User } from '@/models/users';
import ProfileStep from './steps/ProfileStep';
import BlogRegisterStep from './steps/BlogRegisterStep';
import BlogProfileStep from './steps/BlogProfileStep';
import BannerUploadStep from './steps/BannerUploadStep';
import BackgroundWaves from './BackgroundWaves';
import { CircleArrowLeft, Clock } from 'lucide-react';
import UsageTypeStep from './steps/UsageTypeStep';
import { userService } from '@/services/user.service';
import { blogService } from '@/services/blog.service';
import { Card } from '../ui/card';
import Image from 'next/image';
import { useTheme } from 'next-themes';


interface UserSetupFlowProps {
  user: User | null;
  onComplete: (user: User) => void;
}

const UserSetupFlow = ({ user: initialUser, onComplete }: UserSetupFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [user, setUser] = useState<User>(initialUser || {});
  const { theme } = useTheme();

  const steps = [
    { title: 'Qual será seu uso do Murall?', component: UsageTypeStep },
    { title: 'Personalize seu perfil', component: ProfileStep },
    { title: 'Registre seu Blog', component: BlogRegisterStep },
    { title: 'Personalize o perfil do seu blog', component: BlogProfileStep },
    { title: 'Faça o upload do seu primeiro banner', component: BannerUploadStep },
  ];

  const handleNext = async (data: Partial<User>) => {
    const updatedUser = {
      ...user,
      ...data,
      blogs: data.blogs ?? user.blogs,
    };
    setUser(updatedUser);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
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
          await blogService.createBlog({
            blogName: blog.blogName,
            blogDomain: blog.blogDomain,
            blogDescription: blog.blogDescription || '',
            blogImagesUrl: blog.blogImagesUrl?.map(img => img.imageUrl || '') || [],
          });
        }

        onComplete(updatedUser);
      } catch (error) {
        console.error("Erro ao finalizar setup:", error);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[hsl(202,31%,13%)] overflow-hidden relative">
      <BackgroundWaves />

      <div className="w-full max-w-2xl z-10 px-4">
        <div className='absolute left-8 top-8'>
          <Image
            src={
              theme === "dark"
                ? "/LogoGrandeDark.png"
                : "/LogoGrandeLigth.png"
            }
            alt="Murall Logo"
            width={110}
            height={110}
            priority
            className='cursor-pointer'
          />
        </div>

        <div className="bg-opacity-90 rounded-lg shadow-lg overflow-hidden backdrop-blur-sm border border-[hsl(220,13%,30%)]">
          <Card className="p-12 w-full"
            style={{
              background: 'linear-gradient(180deg, #0A2A45 0%, #0D1522 100%)'
            }}>
            <div className="flex items-center gap-2 mb-4">
              {currentStep === 0 ? "" :
               <CircleArrowLeft className="text-[#C5CCD6] cursor-pointer" size={28} onClick={handleBack}/>
               }
              <h2 className="text-2xl font-semibold text-[#C5CCD6]]">
                {steps[currentStep].title}
              </h2>
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
