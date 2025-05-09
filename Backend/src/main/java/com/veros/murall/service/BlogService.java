package com.veros.murall.service;

import com.veros.murall.dto.BlogRegisterRequest;
import com.veros.murall.exception.DomainAlreadyExistsException;
import com.veros.murall.model.Blog;
import com.veros.murall.model.BlogImage;
import com.veros.murall.model.User;
import com.veros.murall.repository.BlogRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogService {

    private final BlogRepository blogRepository;

    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    public void createBlog(BlogRegisterRequest request, User user) throws DomainAlreadyExistsException {
        if (existsByDomain(request.blogDomain())) {
            throw new DomainAlreadyExistsException("O domínio " + request.blogDomain() + " já está registrado.");
        }

        Blog blog = new Blog();
        blog.setBlogName(request.blogName());
        blog.setBlogDomain(request.blogDomain());
        blog.setBlogDescription(request.blogDescription());
        blog.setUser(user);
        blog.setBlogImagesUrl(mapUrlsToImages(request.blogImagesUrl(), blog));

        blogRepository.save(blog);
    }

    private List<BlogImage> mapUrlsToImages(List<String> urls, Blog blog) {
        return urls.stream()
                .map(url -> {
                    BlogImage image = new BlogImage();
                    image.setImageUrl(url);
                    image.setBlog(blog);
                    return image;
                })
                .collect(Collectors.toList());
    }

    public boolean existsByDomain(String domain) {
        return blogRepository.existsByBlogDomain(domain);
    }

    public List<Blog> readBlogs() {
        return blogRepository.findAll();
    }

    public void updateBlog(BlogRegisterRequest blogRequest, Long id) {
        if (blogRepository.existsById(id)) {
            Blog existingBlog = blogRepository.findById(id).orElseThrow(() ->
                    new EntityNotFoundException("Blog não encontrado com ID: " + id));
            existingBlog.setBlogName(blogRequest.blogName());
            existingBlog.setBlogDomain(blogRequest.blogDomain());
            existingBlog.setBlogDescription(blogRequest.blogDescription());
            existingBlog.setBlogImagesUrl(mapUrlsToImages(blogRequest.blogImagesUrl(), existingBlog));

             blogRepository.save(existingBlog);
        } else {
            throw new EntityNotFoundException("Blog não encontrado com ID: " + id);
        }
    }

    public void deleteBlog(Long id) {
       Blog blogToBeDeleted = blogRepository.findById(id).orElseThrow(()
               -> new EntityNotFoundException("Blog não encontrado com ID: " + id));

       blogRepository.delete(blogToBeDeleted);
    }

    public List<Blog> getBlogsByUser(Long userId) {
        return blogRepository.findByUserId(userId);
    }
}
