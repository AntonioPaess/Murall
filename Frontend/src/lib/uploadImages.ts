import { supabase } from './supabase';

export const uploadCarouselImages = async (files: File[]): Promise<string[]> => {
    const urls: string[] = [];

    for (const file of files) {
        const fileName = `${Date.now()}-${file.name}`;

        const { data: uploadData, error } = await supabase.storage
            .from('blogs')
            .upload(`blog/banners/${fileName}`, file);

        if (error) {
            console.error('Erro no upload do banner:', error.message);
            continue;
        }

        const { data } = supabase.storage
            .from('blogs')
            .getPublicUrl(uploadData.path);

        urls.push(data.publicUrl);
    }

    return urls;
};

export const uploadUserImage = async (file: File): Promise<string | null> => {
    try {
        const fileName = `${Date.now()}-${file.name}`;

        const { data: uploadData, error } = await supabase.storage
            .from('user-avatars')
            .upload(`user/profile/${fileName}`, file);

        if (error) throw error;

        const { data } = supabase.storage
            .from('user-avatars')
            .getPublicUrl(uploadData.path);

        return data.publicUrl;
    } catch (error: any) {
        console.error(`Erro no upload da imagem do usuário: ${error.message}`);
        return null;
    }
};

export const uploadBlogImage = async (file: File): Promise<string | null> => {
    try {
        const fileName = `${Date.now()}-${file.name}`;

        const { data: uploadData, error } = await supabase.storage
            .from('blogs')
            .upload(`blog/profile/${fileName}`, file);

        if (error) throw error;

        const { data } = supabase.storage
            .from('blogs')
            .getPublicUrl(uploadData.path);

        return data.publicUrl;
    } catch (error: any) {
        console.error(`Erro no upload da imagem do blog: ${error.message}`);
        return null;
    }
};

export const deleteImage = async (url: string, bucket: 'user-avatars' | 'blogs') => {
    try {
      const path = new URL(url).pathname.split(`${bucket}/`)[1];
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erro ao deletar imagem:', error);
      return false;
    }
  };