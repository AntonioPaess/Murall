package com.veros.murall;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MurallApplication {

    public static void main(String[] args) {
        // Carrega as variáveis do arquivo .env e as define como propriedades do sistema
        Dotenv.configure().directory(".").load()
            .entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

        // Inicia a aplicação Spring Boot
        SpringApplication.run(MurallApplication.class, args);
    }
}