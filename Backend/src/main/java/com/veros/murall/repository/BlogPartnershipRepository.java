package com.veros.murall.repository;

import com.veros.murall.model.Blog;
import com.veros.murall.model.BlogPartnership;
import com.veros.murall.enums.BlogPartnersSituation;
import com.veros.murall.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogPartnershipRepository extends JpaRepository<BlogPartnership, Long> {

    boolean existsBySenderBlogAndReceiverBlogAndSituation(
            Blog senderBlog,
            Blog receiverBlog,
            BlogPartnersSituation situation
    );

    List<BlogPartnership> findByReceiverBlogAndSituation(Blog receiverBlog, BlogPartnersSituation situation);

    List<BlogPartnership> findBySenderBlog(Blog senderBlog);

    List<BlogPartnership> findBySenderBlogOrReceiverBlogAndSituation(
            Blog senderBlog,
            Blog receiverBlog,
            BlogPartnersSituation situation);

    // listagem de blogs parceiros
    @Query("SELECT DISTINCT " +
            "CASE WHEN p.senderBlog.id = :blogId THEN p.receiverBlog " +
            "ELSE p.senderBlog END " +
            "FROM BlogPartnership p " +
            "JOIN p.senderBlog sb " +
            "JOIN p.receiverBlog rb " +
            "WHERE ((p.senderBlog.id = :blogId AND rb = p.receiverBlog) " +
            "OR (p.receiverBlog.id = :blogId AND sb = p.senderBlog)) " +
            "AND p.situation = 'ACEITO'")
    List<Blog> findPartnerBlogsByBlogId(@Param("blogId") Long blogId);
    
    @Query("SELECT p FROM BlogPartnership p " +
           "WHERE (p.senderBlog.id = :blogId OR p.receiverBlog.id = :blogId) " +
           "AND p.situation = com.veros.murall.enums.BlogPartnersSituation.ACEITO")
    List<BlogPartnership> findAcceptedPartnershipsForBlog(@Param("blogId") Long blogId);

    @Query("SELECT COUNT(p) FROM BlogPartnership p WHERE " +
            "(p.senderBlog.user.id = :userId OR p.receiverBlog.user.id = :userId) " +
            "AND p.situation = :situation")
    Long countByReceiverBlogUserAndSituation(@Param("userId") Long userId, @Param("situation") BlogPartnersSituation situation);

    Long countByReceiverBlogIdAndSituation(Long receiverBlogId, BlogPartnersSituation situation);

    Optional<BlogPartnership> findById(Long id);
}