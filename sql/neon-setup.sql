-- Criar tabela de posts do blog
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    excerpt TEXT,
    tags JSONB DEFAULT '[]',
    cover_image VARCHAR(500),
    meta_description TEXT,
    keywords JSONB DEFAULT '[]',
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    read_time VARCHAR(20),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de sessões de admin
CREATE TABLE IF NOT EXISTS admin_sessions (
    username VARCHAR(100) PRIMARY KEY,
    token TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);

-- Inserir post de exemplo
INSERT INTO blog_posts (title, content, author, category, excerpt, tags, slug, read_time, featured)
VALUES (
    'Bem-vindo ao CMS Nodal Energy',
    '# Bem-vindo ao CMS Nodal Energy\n\nEste é o primeiro post do seu blog. Você pode editá-lo ou deletá-lo através do painel administrativo.\n\n## Funcionalidades\n\n- Criação de posts\n- Edição de conteúdo\n- Gerenciamento de categorias\n- Sistema de tags\n- Posts em destaque\n\n## Como usar\n\n1. Acesse o painel administrativo\n2. Clique em "Novo Post"\n3. Preencha os campos\n4. Salve o post\n\nBoa sorte com seu blog!',
    'Equipe Nodal Energy',
    'Inovação',
    'Bem-vindo ao sistema de gerenciamento de conteúdo da Nodal Energy.',
    '["bem-vindo", "cms", "nodal-energy"]',
    'bem-vindo-ao-cms-nodal-energy',
    '2 min',
    true
) ON CONFLICT (slug) DO NOTHING;
