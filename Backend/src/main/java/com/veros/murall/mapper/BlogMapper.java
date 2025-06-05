package com.veros.murall.mapper;

import com.veros.murall.dto.BlogSimpleDTO;
import com.veros.murall.model.Blog;
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
}