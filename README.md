<h1 align="center">Meu Portfólio</h1>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/romulomastelari/portfolio" alt="GitHub last commit">
  <img src="https://img.shields.io/github/repo-size/romulomastelari/portfolio" alt="GitHub repo size">
  <img src="https://img.shields.io/github/languages/count/romulomastelari/portfolio" alt="GitHub language count">
  <img src="https://img.shields.io/github/license/romulomastelari/portfolio" alt="GitHub license">
</p>

<h3 align="center">Vídeo prévio da aplicação</h3>
<p align="center">
  <img 
    src="src/assets/Rômulo-Mastelari-Portifolio.gif" 
    alt="Prévia do projeto" 
  />
</p>


## 💻 Projeto

Um portfólio web moderno e responsivo construído com Angular 17.3, exibindo algumas das minhas habilidades e projetos como desenvolvedor front-end. O site apresenta um design limpo e elegante, com múltiplos temas de cores, integração com GitHub para exibir repositórios dinamicamente, formulário de contato com validação, além de animações sutis para melhorar a experiência do usuário.

Meu portfólio digital das minhas habilidades técnicas e projetos, permitindo que recrutadores e outros desenvolvedores conheçam meu trabalho de forma interativa.

**Demo:** [https://romulomastelari.github.io/portfolio](https://romulomastelari.github.io/portfolio)

## 🧪 Tecnologias

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Angular 17.3](https://angular.io/) - Framework para construção de aplicações web
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript
- [SCSS](https://sass-lang.com/) - Pré-processador CSS com variáveis
- [GitHub API](https://docs.github.com/en/rest) - API para integração com GitHub
- [FontAwesome](https://fontawesome.com/) - Biblioteca de ícones vetoriais
- [Material Icons](https://material.io/resources/icons/) - Ícones do Material Design

## 🚀 Como executar

Para executar o projeto localmente, siga os passos abaixo:

### Pré-requisitos

- Node.js (v16 ou superior)
- npm (v8 ou superior)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/romulomastelari/portfolio.git
   cd portfolio
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

### Servidor de desenvolvimento

Execute o servidor de desenvolvimento:

```bash
npm start
```

Navegue para `http://localhost:4200/` no seu navegador. A aplicação será recarregada automaticamente se você alterar qualquer um dos arquivos de origem.

### Compilação para produção

Para compilar o projeto para produção:

```bash
npm run build
```

Os artefatos de compilação serão armazenados no diretório `dist/`.

## 📝 License

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

## 📓 Anotações pessoais
- Componentes standalone do Angular 17.3
- Organização em pastas features, shared e core
- Comunicação entre componentes com inputs/outputs tipados
- Componentes reutilizáveis (logo, skill-tags, cards)
- Lazy loading em todas as rotas principais
- Estratégia OnPush para otimização da detecção de mudanças
- Otimização de assets e imagens
- Implementação de trackBy para melhorar performance de listas
- Sistema de temas com variáveis CSS e ThemeService
- Persistência do tema escolhido via localStorage
- Suporte para 3 idiomas (PT, EN, ES) com detecção automática
- Pipe personalizado para traduções nos templates
- Integração com GitHub API para mostrar perfil e repositórios
- Sistema de cache para reduzir requisições à API
- Formulário de contato com validações
- Design responsivo mobile-first

### Arquitetura

O projeto segue uma arquitetura modular com componentes standalone do Angular 17.3, aproveitando as vantagens da nova sintaxe e recursos:

- **Lazy Loading**: Implementado para carregar módulos sob demanda, melhorando o tempo de carregamento inicial.
- **Serviços**: Utilização de serviços para gerenciar estado (ThemeService) e comunicação com APIs (GitHubService).
- **Pipes**: Criação de pipes personalizados para tradução e formatação de dados.

### Performance

- Implementação de estratégias de detecção de mudanças OnPush para componentes que não precisam de verificação constante.
- Uso de trackBy nas diretivas ngFor para melhorar a performance de listas.
- Otimização de imagens e assets para carregamento rápido.

### Dicas de Desenvolvimento

- Para adicionar novos temas, basta estender as variáveis CSS em `src/styles/variables.scss`.
- A estrutura de componentes permite fácil extensão para novas seções ou funcionalidades.
- O sistema de tradução pode ser expandido adicionando novos idiomas no serviço de linguagem.

### Configuração do EmailJS

O formulário de contato utiliza [EmailJS](https://www.emailjs.com/) para enviar emails diretamente do frontend sem a necessidade de um backend. Para configurar:

1. Crie uma conta no [EmailJS](https://www.emailjs.com/)
2. Crie um serviço de email (Gmail, Outlook, etc.)
3. Crie um template de email
4. Configure as credenciais:

   Para desenvolvimento local, crie um arquivo `src/environments/emailjs-keys.ts` com:
   ```typescript
   export const EMAILJS_KEYS = {
     serviceId: 'seu_service_id',
     templateId: 'seu_template_id',
     publicKey: 'sua_public_key'
   };
   ```

   Para produção (CI/CD), configure os seguintes secrets no GitHub:
   - `EMAILJS_SERVICE_ID`: Seu ID de serviço do EmailJS
   - `EMAILJS_TEMPLATE_ID`: Seu ID de template do EmailJS
   - `EMAILJS_PUBLIC_KEY`: Sua chave pública do EmailJS

   O workflow de CI/CD irá gerar automaticamente o arquivo de configuração durante o build.

---

<p align="center">
  Feito com ❤️ por <a href="https://github.com/romulomastelari">Rômulo Mastelari</a>
</p>
<p align="center">
  "Transformando linhas de código em experiências memoráveis"
</p>
