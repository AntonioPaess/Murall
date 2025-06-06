package com.veros.murall.model;

import com.veros.murall.enums.BlogPartnersSituation;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class BlogPartnership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_blog_id")
    private Blog senderBlog;

    @ManyToOne
    @JoinColumn(name = "receiver_blog_id")
    private Blog receiverBlog;

    @Enumerated(EnumType.STRING)
    private BlogPartnesSituation situation;

    private LocalDateTime requestDate;
    private LocalDateTime updateDate;

    @PrePersist
    protected void onCreate() {
        requestDate = LocalDateTime.now();
        updateDate = requestDate;
    }

    @PreUpdate
    protected void onUpdate() {
        updateDate = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Blog getSenderBlog() {
        return senderBlog;
    }

    public void setSenderBlog(Blog senderBlog) {
        this.senderBlog = senderBlog;
    }

    public Blog getReceiverBlog() {
        return receiverBlog;
    }

    public void setReceiverBlog(Blog receiverBlog) {
        this.receiverBlog = receiverBlog;
    }

    public BlogPartnersSituation getSituation() {
        return situation;
    }

    public void setSituation(BlogPartnersSituation situation) {
        this.situation = situation;
    }

    public LocalDateTime getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }

    public LocalDateTime getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDateTime updateDate) {
        this.updateDate = updateDate;
    }
}