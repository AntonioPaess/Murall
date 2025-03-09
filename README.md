# Murall - Anúncios Comunitários 🌐

Murall é uma rede de anúncios comunitária projetada para websites pequenos e independentes. A plataforma permite que donos de sites troquem espaços de anúncios entre si, promovendo um ecossistema de publicidade justo e inclusivo. 🚀

## Visão 👁️‍🗨️

O Murall tem como objetivo capacitar donos de sites pequenos e independentes, oferecendo uma plataforma onde eles possam divulgar seus conteúdos sem as barreiras das redes de publicidade tradicionais. Por meio de uma abordagem orientada pela comunidade, esperamos criar um cenário de publicidade online mais equitativo e diversificado. 🌍

## Funcionalidades ✨

- **Registro de Usuários**: Donos de sites podem se cadastrar e gerenciar seus perfis. 📝
- **Submissão de Anúncios**: Usuários podem enviar seus anúncios para exibição em outros sites da comunidade. 📢
- **Sistema de Troca por Visualizações**: Os anúncios são exibidos com base em um mecanismo de troca de visualizações, garantindo justiça. ⚖️
- **Filtragem de Anúncios**: Opções para filtrar anúncios por temas ou categorias, mantendo a relevância. 🔍

## Tecnologias Utilizadas 🛠️

- **Backend**: Spring Boot ☕
- **Frontend**: Next.js ⚡

## Instalação ⚙️

### Pré-requisitos ✅

- Java 11 ou superior
- Node.js 14 ou superior
- Maven (se não estiver usando o wrapper)

1. Clone o repositório:
   ```bash
   git clone https://github.com/AntonioPaess/Murall.git

2. Navegue até o diretório do backend:
   ```bash
   cd murall/backend

3. Instale as dependências do backend:
   ```bash
   ./mvnw install

4. Configure o banco de dados:
    - Por padrão, um banco de dados H2 em memória é usado para desenvolvimento. 🗄️
    - Para usar um banco de dados persistente, atualize o arquivo application.properties com as configurações do seu banco.

5. Navegue até o diretório do frontend:
   ```bash
   cd ../frontend

6. Instale as dependências do frontend:
   ```bash
   npm install

## Uso ▶️

1. Inicie o servidor backend:
    ```bash
    cd backend
    ./mvnw spring-boot:run
- A API estará disponível em http://localhost:8080. 🌐
    
2. Inicie o servidor de desenvolvimento do frontend:
   ```bash
   cd frontend
   npm run dev
- A aplicação estará disponível em http://localhost:3000. 🎨


## Fluxo de Trabalho 🌊

Nosso time trabalha utilizando uma branch **`develop`** para desenvolvimento e deploy contínuo em um ambiente de testes. Todas as alterações e funcionalidades são inicialmente implementadas na branch **`develop`**. Após validação e garantia de que tudo está funcionando corretamente, realizamos o merge com a branch **`main`**, que reflete a versão estável e oficial do projeto. Certifique-se de basear suas contribuições na branch **`develop`** ao enviar pull requests.


## Contribuição 🤝
Nós valorizamos contribuições para o Murall! Por favor, leia nosso arquivo [CONTRIBUTING.md](https://github.com/AntonioPaess/Murall/blob/main/CONTRIBUTING.md) para diretrizes sobre como contribuir. Note que todas as contribuições devem estar de acordo com a Licença GPL 3.0. 💡

## Licença 📜
Este projeto é licenciado sob a GNU General Public License v3.0. Veja o arquivo LICENSE para mais detalhes ou visite https://www.gnu.org/licenses/gpl-3.0.en.html para a versão completa da licença. 🗳️

## Contato 📧
Para dúvidas ou problemas, por favor, abra uma issue no repositório do GitHub. Estamos ansiosos para ouvir você! 🎉

## Team 👥
O projeto Murall é desenvolvido pela equipe VEROS, composta por profissionais talentosos nas áreas de Ciência da Computação (CC) e Design. Conheça os membros da nossa equipe:

### Ciência da Computação (CC) 💻

<div style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 10px;"> <a href="https://github.com/AntonioPaess" style="text-decoration: none; color: black; text-align: center;"> <img src="https://avatars.githubusercontent.com/u/123177984?v=4" style="border-radius: 50%; width: 80px; height: 80px;" alt="Foto de Antonio Paes">  </a> <a href="https://github.com/oMarcoMaciel" style="text-decoration: none; color: black; text-align: center;"> <img src="https://avatars.githubusercontent.com/u/126691818?v=4" style="border-radius: 50%; width: 80px; height: 80px;" alt="Foto de Marco Maciel">  </a> <a href="https://github.com/GalileuCMMoares" style="text-decoration: none; color: black; text-align: center;"> <img src="https://avatars.githubusercontent.com/u/165906088?v=4" style="border-radius: 50%; width: 80px; height: 80px;" alt="Foto de Galileu Moares">  </a> <a href="https://github.com/vinivent" style="text-decoration: none; color: black; text-align: center;"> <img src="https://avatars.githubusercontent.com/u/99739118?v=4" style="border-radius: 50%; width: 80px; height: 80px;" alt="Foto de Vinicius Ventura">  </a> <a href="https://github.com/Matheuslh" style="text-decoration: none; color: black; text-align: center;"> <img src="https://avatars.githubusercontent.com/u/168059030?v=4" style="border-radius: 50%; width: 80px; height: 80px;" alt="Foto de Matheus Lucena">  </a> <a href="https://github.com/jhrvo0" style="text-decoration: none; color: black; text-align: center;"> <img src="https://avatars.githubusercontent.com/u/167437961?s=64&v=4" style="border-radius: 50%; width: 80px; height: 80px;" alt="Foto de João Henrique">  </a> </div>

### Design 🎨

<div style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 10px;"> <a href="https://github.com/Belacv15" style="text-decoration: none; color: black; text-align: center;"> <img src="https://avatars.githubusercontent.com/u/169161718?v=4" style="border-radius: 50%; width: 80px; height: 80px;" alt="Foto de Isabela Vieira">  </a> <a href="https://github.com/fluskas43" style="text-decoration: none; color: black; text-align: center;"> <img src="https://avatars.githubusercontent.com/u/116669790?v=4" style="border-radius: 50%; width: 80px; height: 80px;" alt="Foto de Lucas Cortez">  </a> <a href="https://github.com/maduuu-ai" style="text-decoration: none; color: black; text-align: center;"> <img src="https://avatars.githubusercontent.com/u/200122211?v=4" style="border-radius: 50%; width: 80px; height: 80px;" alt="Foto de Maria Eduarda Lima">  </a> <a href="https://github.com/tsmsXD" style="text-decoration: none; color: black; text-align: center;"> <img src="https://avatars.githubusercontent.com/u/200014297?v=4" style="border-radius: 50%; width: 80px; height: 80px;" alt="Foto de Thiago Soares">  </a> <a href="https://github.com/vesff0" style="text-decoration: none; color: black; text-align: center;"> <img src="https://avatars.githubusercontent.com/u/49535009?v=4" style="border-radius: 50%; width: 80px; height: 80px;" alt="Foto de Vinicius Santana">  </a> </div>
   
