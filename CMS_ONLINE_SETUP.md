# 🚀 CMS Online - Nodal Energy

## 📋 Visão Geral

O CMS foi migrado de um sistema local para um sistema online hospedado na Vercel, permitindo que o cliente gerencie o blog remotamente.

## 🔧 Configuração na Vercel

### 1. **Configurar Vercel KV (Banco de Dados)**

1. Acesse o dashboard da Vercel
2. Vá para o projeto Nodal Energy
3. Acesse a aba "Storage"
4. Crie um novo banco KV
5. Copie as credenciais:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

### 2. **Configurar Variáveis de Ambiente**

No dashboard da Vercel, vá para Settings > Environment Variables e adicione:

```
JWT_SECRET=sua_chave_secreta_jwt_aqui
KV_REST_API_URL=sua_url_kv_aqui
KV_REST_API_TOKEN=seu_token_kv_aqui
KV_REST_API_READ_ONLY_TOKEN=seu_token_readonly_kv_aqui
```

### 3. **Deploy do Projeto**

```bash
# Instalar dependências
npm install

# Build do projeto
npm run build

# Deploy na Vercel
vercel --prod
```

## 🎯 Funcionalidades do CMS Online

### **Acesso ao CMS**
- **URL**: `https://seu-dominio.vercel.app/admin`
- **Credenciais**:
  - Usuário: `FábioCarrascoCEO`
  - Senha: `Faralufe`

### **Funcionalidades Disponíveis**

#### ✅ **Gerenciamento de Posts**
- Criar novos posts
- Editar posts existentes
- Deletar posts
- Visualizar posts publicados
- Sistema de tags
- Categorias predefinidas
- Posts em destaque

#### ✅ **Editor Avançado**
- Editor de texto rico
- Suporte a Markdown
- Preview em tempo real
- Upload de imagens
- Metadados SEO
- Tempo de leitura automático

#### ✅ **Autenticação Segura**
- Login com JWT
- Sessões seguras
- Logout automático
- Proteção de rotas

## 🔒 Segurança

### **Autenticação**
- Tokens JWT com expiração de 24h
- Sessões armazenadas no Redis
- Validação de credenciais no servidor

### **API Routes**
- Todas as rotas protegidas por autenticação
- Validação de dados de entrada
- Tratamento de erros

## 📱 Interface do Usuário

### **Dashboard Principal**
- Lista de todos os posts
- Ações rápidas (editar, visualizar, deletar)
- Filtros por categoria
- Busca por título

### **Editor de Posts**
- Formulário intuitivo
- Campos obrigatórios marcados
- Preview do conteúdo
- Salvamento automático

## 🚀 Como Usar

### **1. Acessar o CMS**
1. Vá para `https://seu-dominio.vercel.app/admin`
2. Faça login com as credenciais
3. Acesse o dashboard

### **2. Criar um Novo Post**
1. Clique em "Novo Post"
2. Preencha os campos obrigatórios:
   - Título
   - Autor
   - Categoria
   - Resumo
   - Conteúdo
3. Adicione tags (opcional)
4. Marque como destaque (opcional)
5. Clique em "Criar Post"

### **3. Editar um Post**
1. Clique no ícone de edição do post
2. Modifique os campos desejados
3. Clique em "Atualizar Post"

### **4. Deletar um Post**
1. Clique no ícone de lixeira
2. Confirme a exclusão

## 🔧 Manutenção

### **Backup dos Posts**
Os posts são armazenados no Vercel KV, que oferece:
- Backup automático
- Redundância
- Alta disponibilidade

### **Monitoramento**
- Logs de acesso no dashboard da Vercel
- Métricas de performance
- Alertas de erro

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o CMS:
- Documentação: Este arquivo
- Logs: Dashboard da Vercel
- Backup: Automático no Vercel KV

## 🎉 Benefícios do CMS Online

1. **Acesso Remoto**: Gerenciar o blog de qualquer lugar
2. **Segurança**: Autenticação robusta
3. **Performance**: Hospedagem na Vercel
4. **Escalabilidade**: Suporte a crescimento
5. **Backup**: Dados seguros na nuvem
6. **Interface Moderna**: Fácil de usar
7. **SEO Otimizado**: Metadados automáticos
