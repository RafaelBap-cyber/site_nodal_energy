# Configuração SQLite com Vercel

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com:

```
JWT_SECRET=sua-chave-secreta-super-segura-aqui-mude-em-producao
```

## Configuração no Vercel

1. Acesse o dashboard do Vercel
2. Vá para Settings > Environment Variables
3. Adicione a variável:
   - Name: `JWT_SECRET`
   - Value: `sua-chave-secreta-super-segura-aqui-mude-em-producao`

## Funcionalidades Implementadas

### API Endpoints

- `GET /api/posts` - Listar todos os posts
- `POST /api/posts` - Criar novo post
- `GET /api/posts/[id]` - Buscar post específico
- `PUT /api/posts/[id]` - Atualizar post
- `DELETE /api/posts/[id]` - Deletar post
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/verify` - Verificar token

### Banco de Dados

- SQLite com better-sqlite3
- Tabelas: `posts`, `users`
- Dados de exemplo inseridos automaticamente
- Usuário padrão: `admin` / `admin123`

### Frontend

- Editor de blog integrado
- Sistema de autenticação
- CRUD completo de posts
- Interface responsiva

## Deploy

O projeto está configurado para deploy automático no Vercel com:

- Runtime Node.js 20.x
- SQLite como banco de dados
- CORS configurado
- Rotas da API funcionais
