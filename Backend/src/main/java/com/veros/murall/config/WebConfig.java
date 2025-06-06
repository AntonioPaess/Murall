package com.veros.murall.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/partnerships/blog/domain/*/partners")
                        .allowedOrigins("*") 
                        .allowedMethods("GET", "OPTIONS") 
                        .allowedHeaders("*")
                        .allowCredentials(false) 
                        .maxAge(3600);
                
                registry.addMapping("/api/blog/domain/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(false)
                        .maxAge(3600);

  
                registry.addMapping("/api/**") 
                        .allowedOrigins("http://localhost:3000", "https://murall-xi.vercel.app")
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "PATCH")
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .maxAge(3600);
            }
        };
    }
}