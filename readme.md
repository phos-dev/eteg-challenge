# Registro de Usuários

Este repositório é dedicado ao gerenciamento de registro de usuários, com uma estrutura monorepo.

## Tecnologias Utilizadas

### Backend

- **Framework:** NestJS
- **ORM:** Prisma com suporte a Postgres
- **Infraestrutura:** Docker para conteinerização
- **Arquitetura:** Separação em módulos e uso do Clean Architecture
- **Testes:** Testes de integração implementados para garantir a qualidade do código

### Frontend

- **Framework:** React com Next.js
- **Infraestrutura:** Docker para conteinerização
- **Funcionalidades:**
  - Registro de novos usuários
  - Tela de confirmação após registro bem-sucedido

## Links das Telas

### Registro de Usuário

Acesse o formulário de registro de usuários no seguinte link: [Registrar Usuário](https://eteg-front-end-production.up.railway.app/users/register)

### Sucesso no Registro

Após concluir o registro com sucesso, você será redirecionado para: [Sucesso ao Registrar](https://eteg-front-end-production.up.railway.app/users/register/success)

## Configuração do Ambiente

1. **Clone o repositório:**

   ```bash
   git clone <url-do-repositorio>
   ```

2. **Backend:**

   - Navegue até a pasta do backend:
     ```bash
     cd back-end
     ```
   - Configure as variáveis de ambiente conforme o arquivo `.env.example`
   - Inicie o container do banco Postgres no Docker:
     ```bash
     docker compose up
     ```

3. **Frontend:**
   - Navegue até a pasta do frontend:
     ```bash
     cd front-end
     ```
   - Configure as variáveis de ambiente conforme o arquivo `.env.example`

## Testes

Para executar os testes de integração no backend, utilize o seguinte comando:

```bash
yarn test
```

## Estrutura do Projeto

### Backend

- **@shared/**: Contém códigos gerais da aplicação, que poderá ser usado em vários contextos
- **@types/**: Contém tipos que podem ser usados em vários contextos
- **users/**: Contém o módulo do usuário com _useCases/dtos/validations/controller/tests_ relacionado ao usuário

### Frontend

- **app/**: Contém as páginas principais da aplicação
- **components/**: Contém os componentes reutilizáveis
- **hooks/**: Contém os hooks reutilizáveis
- **routes/**: Contém as telas de cada página
