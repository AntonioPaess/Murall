import React, { useState, useEffect } from 'react';
import { User } from '@/models/users';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { deleteImage, uploadUserImage } from '@/lib/uploadImages'; // importa a função

interface ProfileStepProps {
  user: User;
  onNext: (data: Partial<User>) => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const ProfileStep = ({ user, onNext, onBack }: ProfileStepProps) => {
  const [biography, setBiography] = useState(user.biography || '');
  const [avatar, setAvatar] = useState<string | undefined>(user.avatar);
  const [tempAvatarFile, setTempAvatarFile] = useState<File | null>(null); 
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setBiography(user.biography || '');
    setAvatar(user.avatar);
  }, [user]);

  const validateBiography = (): boolean => {
    if (biography.trim().length < 10) {
      toast.warning('A biografia deve ter pelo menos 10 caracteres.');
      return false;
    }
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const tempUrl = URL.createObjectURL(file);
    setAvatar(tempUrl);
    setTempAvatarFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateBiography()) return;

    setUploading(true);

    try {
      let finalAvatarUrl = user.avatar;

      if (tempAvatarFile) {
        if (user.avatar) {
          await deleteImage(user.avatar, 'user-avatars');
        }

        const uploadedUrl = await uploadUserImage(tempAvatarFile);
        if (uploadedUrl) {
          finalAvatarUrl = uploadedUrl;
        }
      }

      onNext({
        biography,
        avatar: finalAvatarUrl,
      });

    } catch (error) {
      toast.error('Erro ao processar a imagem');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (avatar && avatar.startsWith('blob:')) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);

  const isBiographyValid = biography.trim().length >= 10;

  return (
    <div>
      <p className="text-sm text-[#C5CCD6] mb-6">
        Escolha como você quer que as pessoas vejam você
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-start mb-6">
          <Label htmlFor="avatar" className="text-muted-foreground mb-6">
            Foto de perfil
          </Label>
          <label
            htmlFor="avatar"
            className={`relative group w-32 h-32 cursor-pointer rounded-full overflow-hidden block ${
              uploading ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            <div className="w-32 h-32 rounded-full bg-background border-2 border-[hsl(220,13%,40%)] flex items-center justify-center overflow-hidden">
              {avatar ? (
                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
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
              disabled={uploading}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Upload className="text-[#C5CCD6]" size={64} />
            </div>
          </label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="biography" className="text-sm font-medium text-muted-foreground">
            Biografia
          </Label>
          <Textarea
            id="biography"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            placeholder="Conte um pouco sobre você..."
            className="bg-background/80 border-border text-primary-foreground focus:border-primary/50 focus:ring-primary/30 h-24 resize-none"
          />
          {!isBiographyValid && (
            <p className="text-xs text-red-600">A biografia deve ter no mínimo 10 caracteres.</p>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={!isBiographyValid || uploading}
            className="bg-primary hover:brightness-110 w-[150px] text-primary-foreground"
          >
            Próximo
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileStep;