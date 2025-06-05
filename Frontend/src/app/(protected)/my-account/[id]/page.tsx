"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import userService from "@/services/user.service";
import LoaderMurall from "@/components/Loader";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/app/contexts/SidebarContext";
import { User } from "@/models/users";
import { PlusCircle, Upload, X } from "lucide-react";
import { uploadUserImage } from '@/lib/uploadImages';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [biography, setBiography] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [tempAvatarFile, setTempAvatarFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isMobile, collapsed } = useSidebar();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await userService.getUser();
        setUser(userData);
        setAvatar(userData.avatar || null);
        setBiography(userData.biography || "");
        setEmail(userData.email || "");
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        toast.error("Não foi possível carregar os dados do usuário.");
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Selecione um arquivo de imagem válido');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Imagem deve ser menor que 5MB');
      return;
    }

    const tempUrl = URL.createObjectURL(file);
    setAvatar(tempUrl);
    setTempAvatarFile(file);
    setIsEditing(true);
  };

  const handleRemoveAvatar = () => {
    if (avatar?.startsWith('blob:')) {
      URL.revokeObjectURL(avatar);
    }
    setAvatar(null);
    setTempAvatarFile(null);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!user?.id) return;

    setUploading(true);
    let newAvatarUrl: string | undefined = user.avatar || undefined;

    try {
      if (tempAvatarFile) {
        const uploadedUrl = await uploadUserImage(tempAvatarFile);
        if (uploadedUrl) {
          newAvatarUrl = uploadedUrl;
          if (avatar?.startsWith('blob:')) {
            URL.revokeObjectURL(avatar);
          }
        } else {
          toast.error("Falha ao fazer upload da nova imagem");
        }
      } else if (avatar === null && user.avatar) {
        // Remover avatar
        newAvatarUrl = undefined;
      }

      // Atualizar dados do usuário
      await userService.editUser(
        {
          biography,
          email,
          avatar: newAvatarUrl
        },
        user.id
      );

      // Atualizar estado do usuário
      const updatedUser = {
        ...user,
        biography,
        email,
        avatar: newAvatarUrl
      };

      setUser(updatedUser);
      setAvatar(newAvatarUrl || null);
      setTempAvatarFile(null);

      toast.success("Perfil atualizado com sucesso!");
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast.error("Não foi possível salvar as alterações.");
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setBiography(user?.biography || "");
    setEmail(user?.email || "");
    setAvatar(user?.avatar || null);
    setTempAvatarFile(null);
    setIsEditing(false);

    if (avatar?.startsWith('blob:')) {
      URL.revokeObjectURL(avatar);
    }
  };

  if (loading) return (<div className="ml-12"> <LoaderMurall /> </div>);

  return (
    <div
      className={`flex flex-col md940:flex-row p-8 transition-all duration-300 ${isMobile ? "pl-[110px]" : collapsed ? "pl-[110px]" : "pl-[18rem]"
        }`}
    >
      {/* Sidebar */}
      <aside className="w-full md940:w-1/4 flex flex-col items-center gap-6 pr-8 border-none md940:border-r border-border">
        <div className="relative group">
          <label
            htmlFor="avatar"
            className={`relative block sm:w-48 sm:h-48  w-32 h-32 cursor-pointer rounded-full overflow-hidden ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <div className="sm:w-48 sm:h-48 w-32 h-32 rounded-full bg-background border-2 border-[hsl(220,13%,40%)] flex items-center justify-center overflow-hidden">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-[hsl(220,13%,40%)]">
                  <Upload size={40} />
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Upload className="text-[#C5CCD6]" size={40} />
            </div>
          </label>

          {avatar && isEditing && (
            <button
              type="button"
              onClick={handleRemoveAvatar}
              className="absolute -top-0 -right-0 bg-primary rounded-full p-1 hover:bg-primary/80 transition-colors"
            >
              <X size={18} className="text-white" />
            </button>
          )}
        </div>

        <div className="w-full">
          <h3 className="text-white mb-4">Meus Blogs</h3>
          <ul className="space-y-3">
            {user?.blogs?.map((blog) => (
              <li key={blog.id} className="text-white bg-muted p-2 px-4 rounded">
                <p className="truncate">{blog.blogName}</p>
              </li>
            ))}
            <li>
              <Button variant="ghost" className="text-primary-foreground hover:text-primary border w-full mb-12">
                <PlusCircle size={16} />
                Adicionar novo
              </Button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Formulário */}
      <section className="flex-1 px-6">
        <h2 className="text-xl text-white font-semibold mb-4 border-b border-border pb-2">Informações públicas</h2>

        <Textarea
          value={biography}
          onChange={(e) => {
            setBiography(e.target.value);
            setIsEditing(true);
          }}
          className="min-h-[160px] mb-6 resize-none"
          placeholder="Sua biografia"
        />

        <h2 className="text-xl text-white font-semibold mb-4 border-b border-border pb-2">Informações pessoais</h2>

        <Input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setIsEditing(true);
          }}
          placeholder="E-mail"
          disabled
          className="mb-4"
        />

        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            className="bg-primary text-white"
            disabled={uploading || !isEditing}
          >
            {uploading ? "Salvando..." : "Salvar"}
          </Button>
          <Button
            variant="outline"
            className="border-border text-white hover:bg-border/10"
            onClick={handleCancel}
            disabled={uploading || !isEditing}
          >
            Cancelar
          </Button>
        </div>
      </section>
    </div>
  );
}