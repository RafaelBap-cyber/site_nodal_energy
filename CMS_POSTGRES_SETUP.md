# 🐘 CMS Online com Vercel Postgres - Nodal Energy

## 📋 Visão Geral

O CMS foi migrado para usar **Vercel Postgres** como banco de dados, oferecendo uma solução robusta e escalável para gerenciamento de conteúdo.

## 🔧 Configuração na Vercel

### **1. Instalar Vercel Postgres**

#### **Passo a Passo:**

1. **Acesse o Marketplace da Vercel**
   - Vá para [vercel.com/integrations](https://vercel.com/integrations)
   - Procure por "Postgres"
   - Clique em "Add Integration"

2. **Configurar o Banco**
   - **Nome**: `nodal-energy-cms`
   - **Região**: Escolha a mais próxima (ex: `iad1` para EUA)
   - **Plano**: Hobby (gratuito para começar)

3. **Aguardar Criação**
   - O processo pode levar alguns minutos
   - Você receberá as credenciais automaticamente

### **2. Configurar Variáveis de Ambiente**

#### **Credenciais do Postgres (automáticas):**
```
POSTGRES_URL=postgres://default:xxxxx@ep-xxxxx.us-east-1.postgres.vercel-storage.com/verceldb
POSTGRES_PRISMA_URL=postgres://default:xxxxx@ep-xxxxx.us-east-1.postgres.vercel-storage.com/verceldb?pgbouncer=true&connect_timeout=15
POSTGRES_URL_NON_POOLING=postgres://default:xxxxx@ep-xxxxx.us-east-1.postgres.vercel-storage.com/verceldb
POSTGRES_USER=default
POSTGRES_HOST=ep-xxxxx.us-east-1.postgres.vercel-storage.com
POSTGRES_PASSWORD=xxxxx
POSTGRES_DATABASE=verceldb
```

#### **Variável Adicional:**
```
JWT_SECRET=nodal-energy-jwt-secret-2024-very-secure-key
```

### **3. Criar Tabelas no Banco**

#### **Opção A: Via Dashboard Vercel**
1. **Acesse o dashboard do projeto**
2. **Vá para "Storage" → "Postgres"**
3. **Clique em "Query"**
4. **Execute o SQL do arquivo `sql/setup.sql`**

#### **Opção B: Via CLI**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Executar SQL
vercel db sql < sql/setup.sql
```

### **4. Instalar Dependências**

```bash
npm install @vercel/postgres jsonwebtoken @types/jsonwebtoken
```

### **5. Deploy do Projeto**

```bash
git add .
git commit -m "feat: migrate to Vercel Postgres"
git push origin main
```

## 🎯 Funcionalidades do CMS

### **Acesso ao CMS**
- **URL**: `https://seu-dominio.vercel.app/admin`
- **Credenciais**:
  - Usuário: `FábioCarrascoCEO`
  - Senha: `Faralufe`

### **Estrutura do Banco de Dados**

#### **Tabela: blog_posts**
```sql
- id (SERIAL PRIMARY KEY)
- title (VARCHAR)
- content (TEXT)
- author (VARCHAR)
- category (VARCHAR)
- excerpt (TEXT)
- tags (JSONB)
- cover_image (VARCHAR)
- meta_description (TEXT)
- keywords (JSONB)
- date (TIMESTAMP)
- slug (VARCHAR UNIQUE)
- read_time (VARCHAR)
- featured (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### **Tabela: admin_sessions**
```sql
- username (VARCHAR PRIMARY KEY)
- token (TEXT)
- expires_at (TIMESTAMP)
- created_at (TIMESTAMP)
```

## 🔒 Segurança

### **Autenticação**
- **JWT Tokens**: Sessões seguras de 24h
- **Validação no servidor**: Todas as operações protegidas
- **Sessões no banco**: Controle de acesso robusto

### **Proteção de Dados**
- **SQL Injection**: Protegido com prepared statements
- **Validação de entrada**: Todos os dados verificados
- **Sanitização**: Dados limpos antes do armazenamento

## 🚀 Como Usar

### **1. Acessar o CMS**
1. Vá para `https://seu-dominio.vercel.app/admin`
2. Faça login com as credenciais
3. Acesse o dashboard

### **2. Gerenciar Posts**
- **Criar**: Clique em "Novo Post"
- **Editar**: Clique no ícone de edição
- **Deletar**: Clique no ícone de lixeira
- **Visualizar**: Clique no ícone de olho

### **3. Funcionalidades Avançadas**
- **Tags**: Sistema de organização
- **Categorias**: Classificação temática
- **Posts em destaque**: Destaque especial
- **SEO**: Metadados automáticos
- **Tempo de leitura**: Cálculo automático

## 🔧 Manutenção

### **Backup Automático**
- **Vercel Postgres**: Backup automático diário
- **Retenção**: 7 dias (plano Hobby)
- **Recuperação**: Via dashboard da Vercel

### **Monitoramento**
- **Logs**: Dashboard da Vercel
- **Métricas**: Performance e uso
- **Alertas**: Notificações de erro

### **Limpeza de Sessões**
```sql
-- Limpar sessões expiradas
DELETE FROM admin_sessions WHERE expires_at < NOW();
```

## 📊 Vantagens do Postgres

### **vs KV (Key-Value)**
- ✅ **Relacional**: Estrutura organizada
- ✅ **Consultas complexas**: SQL avançado
- ✅ **Índices**: Performance otimizada
- ✅ **Relacionamentos**: Dados conectados

### **vs JSON simples**
- ✅ **Validação**: Tipos de dados
- ✅ **Integridade**: Constraints
- ✅ **Performance**: Índices otimizados
- ✅ **Escalabilidade**: Crescimento controlado

## 🎉 Benefícios da Migração

1. **Banco Relacional**: Estrutura organizada e escalável
2. **Performance**: Consultas otimizadas com índices
3. **Segurança**: Validação de dados no banco
4. **Backup**: Sistema robusto de backup
5. **Monitoramento**: Logs e métricas detalhadas
6. **Escalabilidade**: Suporte a crescimento
7. **Manutenção**: Ferramentas de administração

## 📞 Suporte

### **Troubleshooting**
- **Conexão**: Verificar variáveis de ambiente
- **Tabelas**: Executar `sql/setup.sql`
- **Logs**: Dashboard da Vercel → Functions
- **Performance**: Monitorar uso do banco

### **Recursos**
- **Documentação**: Vercel Postgres docs
- **Comunidade**: Vercel Discord
- **Suporte**: Vercel Support

## 🎯 Próximos Passos

1. ✅ **Postgres configurado**
2. ✅ **Tabelas criadas**
3. ✅ **Variáveis configuradas**
4. ✅ **Deploy realizado**
5. ✅ **CMS testado**
6. ✅ **Cliente treinado**

O CMS está totalmente funcional com Postgres! 🚀
