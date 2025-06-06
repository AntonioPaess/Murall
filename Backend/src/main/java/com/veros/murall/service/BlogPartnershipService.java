package com.veros.murall.service;

import com.veros.murall.enums.BlogPartnersSituation;
import com.veros.murall.exception.BlogNotFoundException;
import com.veros.murall.exception.BlogPartnershipException;
import com.veros.murall.model.Blog;
import com.veros.murall.model.BlogPartnership;
import com.veros.murall.repository.BlogPartnershipRepository;
import com.veros.murall.repository.BlogRepository;
import com.veros.murall.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogPartnershipService {

    private final BlogRepository blogRepository;
    private final BlogPartnershipRepository blogPartnershipRepository;
    private final UserRepository userRepository;

    public BlogPartnershipService(BlogRepository blogRepository, BlogPartnershipRepository blogPartnershipRepository, UserRepository userRepository) {
        this.blogRepository = blogRepository;
        this.blogPartnershipRepository = blogPartnershipRepository;
        this.userRepository = userRepository;
    }

    // Enviar solicitação de parceria
    @Transactional
    public BlogPartnership sendPartnershipRequest(Long senderBlogId, Long receiverBlogId) {
        // Validar blogs
        Blog senderBlog = getBlogOrThrow(senderBlogId);
        Blog receiverBlog = getBlogOrThrow(receiverBlogId);

        // Validar se não é o mesmo blog
        if (senderBlogId.equals(receiverBlogId)) {
            throw new BlogPartnershipException("Você não pode solicitar parceria com o próprio blog");
        }

        // Verificar se já existe solicitação pendente
        if (blogPartnershipRepository.existsBySenderBlogAndReceiverBlogAndSituation(
                senderBlog, receiverBlog, BlogPartnersSituation.PENDENTE)) {
            throw new BlogPartnershipException("Já existe uma solicitação pendente para este blog");
        }

        // Criar nova solicitação
        BlogPartnership partnership = new BlogPartnership();
        partnership.setSenderBlog(senderBlog);
        partnership.setReceiverBlog(receiverBlog);
        partnership.setSituation(BlogPartnersSituation.PENDENTE);

        return blogPartnershipRepository.save(partnership);
    }

    public Long countPendingRequestsByUser(Long userId) {
        return blogPartnershipRepository.countByReceiverBlogUserAndSituation(
                userRepository.findById(userId).orElseThrow(() ->
                        new EntityNotFoundException("Usuário não encontrado")
                ).getId(),
                BlogPartnersSituation.PENDENTE
        );
    }

    public Long countPendingRequests(Long blogId) {
        return blogPartnershipRepository.countByReceiverBlogIdAndSituation(blogId, BlogPartnersSituation.PENDENTE);
    }

    // Aceitar solicitação de parceria
    @Transactional
    public BlogPartnership acceptPartnershipRequest(Long partnershipId) {
        BlogPartnership partnership = getPartnershipOrThrow(partnershipId);

        // Validar se está pendente
        if (!partnership.getSituation().equals(BlogPartnersSituation.PENDENTE)) {
            throw new BlogPartnershipException("Esta solicitação já foi respondida");
        }

        // Atualizar status
        partnership.setSituation(BlogPartnersSituation.ACEITO);
        partnership.setUpdateDate(LocalDateTime.now());

        return blogPartnershipRepository.save(partnership);
    }

    // Recusar solicitação de parceria
    @Transactional
    public BlogPartnership rejectPartnershipRequest(Long partnershipId) {
        BlogPartnership partnership = getPartnershipOrThrow(partnershipId);

        // Validar se está pendente
        if (!partnership.getSituation().equals(BlogPartnersSituation.PENDENTE)) {
            throw new BlogPartnershipException("Esta solicitação já foi respondida");
        }

        // Atualizar status
        partnership.setSituation(BlogPartnersSituation.RECUSADO);
        partnership.setUpdateDate(LocalDateTime.now());

        return blogPartnershipRepository.save(partnership);
    }

    // Listar solicitações recebidas pendentes
    public List<BlogPartnership> getPendingRequests(Long blogId) {
        Blog blog = getBlogOrThrow(blogId);
        return blogPartnershipRepository.findByReceiverBlogAndSituation(blog, BlogPartnersSituation.PENDENTE);
    }

    // Listar solicitações enviadas
    public List<BlogPartnership> getSentRequests(Long blogId) {
        Blog blog = getBlogOrThrow(blogId);
        return blogPartnershipRepository.findBySenderBlog(blog);
    }

    // Listar parcerias ativas de um blog
    public List<BlogPartnership> getActivePartnerships(Long blogId) {
        Blog blog = getBlogOrThrow(blogId);
        return blogPartnershipRepository.findBySenderBlogOrReceiverBlogAndSituation(
                blog, blog, BlogPartnersSituation.ACEITO);
    }

    // Listar blogs parceiros
    public List<Blog> getPartnerBlogs(Long blogId) {
        List<BlogPartnership> acceptedPartnerships = blogPartnershipRepository.findAcceptedPartnershipsForBlog(blogId);

        return acceptedPartnerships.stream()
                .map(partnership -> {
                    if (partnership.getSenderBlog().getId().equals(blogId)) {
                        return partnership.getReceiverBlog();
                    } else {
                        return partnership.getSenderBlog();
                    }
                })
                .distinct() // Garante que cada blog parceiro apareça apenas uma vez
                .collect(Collectors.toList());
    }


    // Métodos auxiliares
    private Blog getBlogOrThrow(Long blogId) {
        return blogRepository.findById(blogId)
                .orElseThrow(() -> new BlogNotFoundException("Blog não encontrado com ID: " + blogId));
    }

    private BlogPartnership getPartnershipOrThrow(Long partnershipId) {
        return blogPartnershipRepository.findById(partnershipId)
                .orElseThrow(() -> new BlogPartnershipException("Solicitação de parceria não encontrada"));
    }
}