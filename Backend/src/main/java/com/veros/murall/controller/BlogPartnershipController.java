package com.veros.murall.controller;

import com.veros.murall.dto.*;
import com.veros.murall.mapper.BlogMapper;
import com.veros.murall.model.Blog;
import com.veros.murall.model.BlogPartnership;
import com.veros.murall.service.BlogPartnershipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/partnerships")
@RequiredArgsConstructor
public class BlogPartnershipController {

    private final BlogPartnershipService partnershipService;
    private final BlogMapper blogMapper; // Você precisará criar este mapper

    // Enviar solicitação de parceria
    @PostMapping
    public ResponseEntity<PartnershipResponse> sendPartnershipRequest(
            @RequestBody PartnershipRequest request) {

        var partnership = partnershipService.sendPartnershipRequest(
                request.senderBlogId(),
                request.receiverBlogId()
        );

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(toPartnershipResponseDTO(partnership));
    }

    // Aceitar solicitação
    @PatchMapping("/{id}/accept")
    public ResponseEntity<PartnershipResponse> acceptPartnershipRequest(
            @PathVariable Long id) {

        var partnership = partnershipService.acceptPartnershipRequest(id);
        return ResponseEntity.ok(toPartnershipResponseDTO(partnership));
    }

    // Recusar solicitação
    @PatchMapping("/{id}/reject")
    public ResponseEntity<PartnershipResponse> rejectPartnershipRequest(
            @PathVariable Long id) {

        var partnership = partnershipService.rejectPartnershipRequest(id);
        return ResponseEntity.ok(toPartnershipResponseDTO(partnership));
    }

    // Listar solicitações pendentes recebidas por um blog
    @GetMapping("/blog/{blogId}/pending")
    public ResponseEntity<List<PartnershipResponse>> getPendingRequests(
            @PathVariable Long blogId) {

        var requests = partnershipService.getPendingRequests(blogId);
        return ResponseEntity.ok(
                requests.stream()
                        .map(this::toPartnershipResponseDTO)
                        .collect(Collectors.toList())
        );
    }

    // Listar solicitações enviadas por um blog
    @GetMapping("/blog/{blogId}/sent")
    public ResponseEntity<List<PartnershipResponse>> getSentRequests(
            @PathVariable Long blogId) {

        var requests = partnershipService.getSentRequests(blogId);
        return ResponseEntity.ok(
                requests.stream()
                        .map(this::toPartnershipResponseDTO)
                        .collect(Collectors.toList())
        );
    }

    // Listar parcerias ativas de um blog
    @GetMapping("/blog/{blogId}/active")
    public ResponseEntity<List<BlogPartnershipDTO>> getActivePartnerships(
            @PathVariable Long blogId) {

        var partnerships = partnershipService.getActivePartnerships(blogId);
        return ResponseEntity.ok(
                partnerships.stream()
                        .map(p -> toBlogPartnershipDTO(p, blogId))
                        .collect(Collectors.toList())
        );
    }

    // Listar blogs parceiros (apenas os blogs, não as relações)
    @GetMapping("/blog/{blogId}/partners")
    public ResponseEntity<List<BlogSimpleDTO>> getPartnerBlogs(
            @PathVariable Long blogId) {

        var partners = partnershipService.getPartnerBlogs(blogId);
        return ResponseEntity.ok(
                partners.stream()
                        .map(blogMapper::toBlogSimpleDTO)
                        .collect(Collectors.toList())
        );
    }

    // Métodos auxiliares de conversão
    private PartnershipResponse toPartnershipResponseDTO(BlogPartnership partnership) {
        return new PartnershipResponse(
                partnership.getId(),
                blogMapper.toBlogSimpleDTO(partnership.getSenderBlog()),
                blogMapper.toBlogSimpleDTO(partnership.getReceiverBlog()),
                partnership.getSituation(),
                partnership.getRequestDate(),
                partnership.getUpdateDate()
        );
    }

    private BlogPartnershipDTO toBlogPartnershipDTO(BlogPartnership partnership, Long currentBlogId) {
        // Determina qual blog é o parceiro em relação ao blog atual
        Blog partnerBlog = partnership.getSenderBlog().getId().equals(currentBlogId)
                ? partnership.getReceiverBlog()
                : partnership.getSenderBlog();

        return new BlogPartnershipDTO(
                partnership.getId(),
                blogMapper.toBlogSimpleDTO(partnerBlog),
                partnership.getUpdateDate()
        );
    }
}