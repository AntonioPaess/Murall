package com.veros.murall.mapper;

import com.veros.murall.dto.BlogSimpleDTO;
import com.veros.murall.dto.MurallDTO;
import com.veros.murall.model.Blog;

import java.util.List;
import java.util.stream.Collectors;


import org.springframework.stereotype.Component;

@Component
public class BlogMapper {

    public BlogSimpleDTO toBlogSimpleDTO(Blog blog) {
        if (blog == null) {
            return null;
        }
        return new BlogSimpleDTO(
                blog.getId(),
                blog.getBlogName(),
                blog.getBlogDomain(),
                blog.getBlogAvatar()
        );
    }
      public MurallDTO toMurallDTO(Blog blog) {
    if (blog == null) {
        return null;
    }
    
    // Extrair as URLs das imagens do blog
    List<String> imageUrls = blog.getBlogImagesUrl().stream()
            .map(blogImage -> blogImage.getImageUrl())
            .collect(Collectors.toList());
    
    return new MurallDTO(
            blog.getId(),
            blog.getBlogName(),
            blog.getBlogDomain(),
            blog.getBlogAvatar(),
            imageUrls
    );
}
}