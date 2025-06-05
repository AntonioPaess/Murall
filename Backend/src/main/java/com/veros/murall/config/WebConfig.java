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
                // Mapeamentos MAIS ESPECÍFICOS primeiro

                // Configuração para o endpoint de parceiros (embed.js)
                registry.addMapping("/api/partnerships/blog/domain/*/partners")
                        .allowedOrigins("*") // Permite qualquer origem
                        .allowedMethods("GET", "OPTIONS") 
                        .allowedHeaders("*")
                        .allowCredentials(false) // Importante: false quando allowedOrigins é "*"
                        .maxAge(3600);
                
                // Se o endpoint /api/blog/domain/** também for usado pelo embed.js
                registry.addMapping("/api/blog/domain/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(false)
                        .maxAge(3600);

                // Configuração MAIS GENÉRICA por último, para a aplicação Next.js
                // Esta regra não deve interferir com as anteriores se elas já corresponderam.
                registry.addMapping("/api/**") 
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .maxAge(3600);
            }
        };
    }
}