package com.veros.murall.repository;

import com.veros.murall.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    boolean existsByBlogDomain(String domain);
    List<Blog> findByUserId(Long ind);
}
