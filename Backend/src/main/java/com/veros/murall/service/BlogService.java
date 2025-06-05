package com.veros.murall.service;

import com.veros.murall.dto.*;
import com.veros.murall.exception.DomainAlreadyExistsException;
import com.veros.murall.model.Blog;
import com.veros.murall.model.BlogImage;
import com.veros.murall.model.Category;
import com.veros.murall.model.User;
import com.veros.murall.repository.BlogRepository;
import com.veros.murall.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BlogService {

    private final BlogRepository blogRepository;
    private final CategoryRepository categoryRepository;

    public BlogService(BlogRepository blogRepository, CategoryRepository categoryRepository) {
        this.blogRepository = blogRepository;
        this.categoryRepository = categoryRepository;
    }

    public void createBlog(BlogRegisterRequest request, User user) throws DomainAlreadyExistsException {
        String normalizedDomain = request.blogDomain().toLowerCase().replaceAll("^https?://", "").split("/")[0];

        if (existsByDomain(normalizedDomain)) {
            throw new DomainAlreadyExistsException("O domínio " + normalizedDomain + " já está registrado.");
        }

        Blog blog = new Blog();
        blog.setBlogName(request.blogName());
        blog.setBlogDomain(normalizedDomain);
        blog.setBlogDescription(request.blogDescription());
        blog.setBlogAvatar(request.blogAvatar());
        blog.setUser(user);
        blog.setBlogImagesUrl(mapUrlsToImages(request.blogImagesUrl(), blog));
        blog.setCategories(mapStringsToCategory(request.categoryNames(), blog));

        blogRepository.save(blog);
    }

    private List<Category> mapStringsToCategory(List<String> categoryNames, Blog blog) {
        return categoryNames.stream()
                .map(name -> {
                    return categoryRepository.findByName(name)
                            .orElseGet(() -> {
                                Category newCategory = new Category();
                                newCategory.setName(name);
                                return categoryRepository.save(newCategory);
                            });
                })
                .toList();
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

    public Optional<Blog> getBlogById(Long id) {
        return blogRepository.findById(id);
    }

    public List<Blog> readBlogs() {
        return blogRepository.findAll();
    }

    public void updateBlog(BlogRegisterRequest blogRequest, Long id) {
        Blog existingBlog = blogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Blog não encontrado com ID: " + id));

        existingBlog.setBlogName(blogRequest.blogName());
        existingBlog.setBlogDomain(blogRequest.blogDomain());
        existingBlog.setBlogDescription(blogRequest.blogDescription());

        updateBlogImages(existingBlog, blogRequest.blogImagesUrl());

        blogRepository.save(existingBlog);
    }

    private void updateBlogImages(Blog blog, List<String> newImageUrls) {
        List<BlogImage> imagesToRemove = new ArrayList<>();
        for (BlogImage existingImage : blog.getBlogImagesUrl()) {
            if (!newImageUrls.contains(existingImage.getImageUrl())) {
                imagesToRemove.add(existingImage);
            }
        }
        blog.getBlogImagesUrl().removeAll(imagesToRemove);

        for (String url : newImageUrls) {
            if (blog.getBlogImagesUrl().stream().noneMatch(img -> img.getImageUrl().equals(url))) {
                BlogImage newImage = new BlogImage();
                newImage.setImageUrl(url);
                newImage.setBlog(blog);
                blog.getBlogImagesUrl().add(newImage);
            }
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

    // Mapeamento do Blog para BlogRegisterResponse
    public BlogRegisterResponse mapToBlogRegisterResponse(Blog blog) {
        return new BlogRegisterResponse(
                blog.getId(),
                blog.getBlogName(),
                blog.getBlogDomain(),
                blog.getBlogDescription(),
                blog.getBlogAvatar(),
                mapBlogImages(blog.getBlogImagesUrl()),
                mapCategories(blog.getCategories()),
                mapUser(blog.getUser()),
                blog.getCreatedAt()
        );
    }

    // Mapeamento das BlogImages
    private List<BlogImageResponse> mapBlogImages(List<BlogImage> blogImages) {
        return blogImages.stream()
                .map(image -> new BlogImageResponse(image.getId(), image.getImageUrl()))
                .collect(Collectors.toList());
    }

    private List<CategoryResponse> mapCategories(List<Category> categories) {
        return categories.stream()
                .map(category -> new CategoryResponse(category.getId(), category.getName()))
                .collect(Collectors.toList());
    }

    private UserSimpleResponse mapUser(User user) {
        return new UserSimpleResponse(
                user.getId(),
                user.getUsername(),
                user.getBiography(),
                user.getEmail(),
                user.getRole()
        );
    }
        public Blog findByDomain(String domain) {
    // Normaliza o domínio da mesma forma que é feito no método createBlog
    String normalizedDomain = domain.toLowerCase().replaceAll("^https?://", "").split("/")[0];
    return blogRepository.findByBlogDomain(normalizedDomain);
}
}
