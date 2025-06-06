package com.veros.murall.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String blogName;

    @Column(nullable = false, unique = true)
    private String blogDomain;

    @Column(nullable = false)
    private String blogDescription;

    private String blogAvatar;

    @OneToMany(mappedBy = "senderBlog", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BlogPartnership> sentPartnerships = new ArrayList<>();

    @OneToMany(mappedBy = "receiverBlog", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BlogPartnership> receivedPartnerships = new ArrayList<>();

    @OneToMany(mappedBy = "blog", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BlogImage> blogImagesUrl = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "blog_category",
            joinColumns = @JoinColumn(name = "blog_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> categories = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "dd/MM/yyyy", timezone = "America/Sao_Paulo")
    private Date createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBlogName() {
        return blogName;
    }

    public void setBlogName(String blogName) {
        this.blogName = blogName;
    }

    public String getBlogDomain() {
        return blogDomain;
    }

    public void setBlogDomain(String blogDomain) {
        this.blogDomain = blogDomain;
    }

    public String getBlogDescription() {
        return blogDescription;
    }

    public void setBlogDescription(String blogDescription) {
        this.blogDescription = blogDescription;
    }

    public List<BlogImage> getBlogImagesUrl() {
        return blogImagesUrl;
    }

    public void setBlogImagesUrl(List<BlogImage> blogImagesUrl) {
        this.blogImagesUrl = blogImagesUrl;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getBlogAvatar() {
        return blogAvatar;
    }

    public void setBlogAvatar(String blogAvatar) {
        this.blogAvatar = blogAvatar;
    }

    public List<BlogPartnership> getSentPartnerships() {
        return sentPartnerships;
    }

    public void setSentPartnerships(List<BlogPartnership> sentPartnerships) {
        this.sentPartnerships = sentPartnerships;
    }

    public List<BlogPartnership> getReceivedPartnerships() {
        return receivedPartnerships;
    }

    public void setReceivedPartnerships(List<BlogPartnership> receivedPartnerships) {
        this.receivedPartnerships = receivedPartnerships;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }
}
