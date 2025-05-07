# Contribuindo para o Murall

Obrigado por seu interesse em contribuir para o Murall! Este documento fornece orientações sobre como você pode ajudar a melhorar o projeto "Murall - Anúncios Comunitários".

## Relatar Problemas

Se você encontrar um problema ou bug no Murall, por favor, relate-o abrindo uma issue no [repositório do GitHub](https://github.com/seuusername/murall/issues). Inclua as seguintes informações em seu relatório:

- Uma descrição clara e detalhada do problema.
- Passos para reproduzir o problema.
- Qualquer mensagem de erro ou logs relevantes.
- Informações sobre o ambiente em que o problema ocorreu (por exemplo, sistema operacional, versão do navegador, etc.).

## Sugerir Melhorias ou Novas Funcionalidades

Se você tem uma ideia para melhorar o Murall ou adicionar uma nova funcionalidade, por favor, abra uma issue no [repositório do GitHub](https://github.com/seuusername/murall/issues). Inclua as seguintes informações em sua sugestão:

- Uma descrição clara e detalhada da melhoria ou funcionalidade proposta.
- Qualquer contexto ou justificativa para a proposta.
- Exemplos ou mockups, se aplicável.

## Enviar Pull Requests

Se você deseja contribuir com código para o Murall, siga estas etapas:

1. Faça um fork do repositório no GitHub.
2. Clone seu fork para sua máquina local.
3. Certifique-se de estar na branch **develop**, que é usada para desenvolvimento e deploy contínuo:
   ```bash
   git checkout develop

4. Crie uma nova branch a partir da develop para sua alteração:
   ```bash
   git checkout -b minha-alteracao

5. Faça suas alterações no código.
6. Certifique-se de que seu código siga as diretrizes de estilo e passe nos testes.
7. Commit suas alterações com uma mensagem clara e descritiva.
8. Push sua branch para seu fork no GitHub:

9. Abra um pull request no repositório original, direcionando-o para a branch develop, e descreva suas alterações, referenciando qualquer issue relevante.
    - Nota: Todas as contribuições devem ser baseadas na branch develop. A branch main é reservada para a versão estável e oficial do projeto, e merges para ela só          ocorrem após validação na develop.

## Diretrizes de Código

- Siga o estilo de codificação do projeto. Para o backend (Spring Boot), siga as convenções de nomenclatura e formatação do Java. Para o frontend (Next.js), siga as convenções de nomenclatura e formatação do JavaScript/TypeScript.
- Escreva testes para suas alterações, se aplicável.
- Documente seu código com comentários claros e concisos.
- Certifique-se de que seu código não introduza novos warnings ou erros.

## Configuração do Ambiente de Desenvolvimento
Para configurar o ambiente de desenvolvimento, siga as instruções no arquivo [README.md](https://github.com/AntonioPaess/Murall/blob/main/README.md).

## Licença
O Murall é licenciado sob a GNU General Public License v3.0. Ao contribuir para o projeto, você concorda que suas contribuições serão licenciadas sob a mesma licença.

## Contato
Se você tiver alguma dúvida ou precisar de ajuda, por favor, abra uma issue no repositório do GitHub.
