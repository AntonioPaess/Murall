package com.veros.murall.repository;

import com.veros.murall.model.Blog;
import com.veros.murall.model.BlogPartnership;
import com.veros.murall.enums.BlogPartnersSituation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogPartnershipRepository extends JpaRepository<BlogPartnership, Long> {

    //  veriricar se ja existe uma solicitacao
    boolean existsBySenderBlogAndReceiverBlogAndSituation(
            Blog senderBlog,
            Blog receiverBlog,
            BlogPartnersSituation situation
    );

    // buscar por blog receptor e situação
    List<BlogPartnership> findByReceiverBlogAndSituation(Blog receiverBlog, BlogPartnersSituation situation);

    // buscar por blog remetente
    List<BlogPartnership> findBySenderBlog(Blog senderBlog);

    // buscar parcerias por blog e situação
    List<BlogPartnership> findBySenderBlogOrReceiverBlogAndSituation(
            Blog senderBlog,
            Blog receiverBlog,
            BlogPartnersSituation situation);

    // listagem de blogs parceiros
    @Query("SELECT DISTINCT " +
            "CASE WHEN p.senderBlog.id = :blogId THEN p.receiverBlog " +
            "ELSE p.senderBlog END " +
            "FROM BlogPartnership p " +
            "WHERE (p.senderBlog.id = :blogId OR p.receiverBlog.id = :blogId) " +
            "AND p.situation = 'ACEITO'")
    List<Blog> findPartnerBlogsByBlogId(@Param("blogId") Long blogId);

    // buscar por ID da parceria
    Optional<BlogPartnership> findById(Long id);
}