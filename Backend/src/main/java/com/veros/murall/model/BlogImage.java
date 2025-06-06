package com.veros.murall.model;

import jakarta.persistence.*;

@Entity
public class BlogImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "blog_id", nullable = false)
    private Blog blog;


    public String getImageUrl(){
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setBlog(Blog blog) {
        this.blog = blog;
    }

    public Blog blog(){
        return blog;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Blog getBlog() {
        return blog;
    }
}
