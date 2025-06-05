package com.veros.murall.model;

import com.veros.murall.enums.BlogPartnersSituation;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
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
    private BlogPartnersSituation situation;

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
}