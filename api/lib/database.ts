// Importação condicional para evitar erro no frontend
let Database: any;
let join: any;

if (typeof window === 'undefined') {
  // Apenas no servidor (Vercel Functions)
  Database = require('better-sqlite3').default;
  join = require('path').join;
}

// Função para obter o caminho do banco de dados
function getDatabasePath(): string {
  // Em produção no Vercel, usar /tmp para armazenamento temporário
  if (process.env.NODE_ENV === 'production') {
    return '/tmp/nodal_energy_blog.db';
  }
  // Em desenvolvimento, usar pasta local
  return join(process.cwd(), 'data', 'blog.db');
}

// Singleton para a instância do banco
let db: Database.Database | null = null;

export function getDatabase(): any {
  if (typeof window !== 'undefined') {
    throw new Error('Database só pode ser acessado no servidor');
  }
  
  if (!db) {
    const dbPath = getDatabasePath();
    console.log('Criando conexão com banco em:', dbPath);
    db = new Database(dbPath);
    console.log('Banco de dados criado com sucesso');
    
    // Criar tabelas se não existirem
    initializeDatabase(db);
    console.log('Tabelas inicializadas com sucesso');
  }
  return db;
}

function initializeDatabase(database: any) {
  console.log('Inicializando banco de dados...');
  
  // Criar tabela de posts
  database.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      author TEXT NOT NULL DEFAULT 'Equipe Nodal Energy',
      category TEXT NOT NULL DEFAULT 'Energia Solar',
      date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      slug TEXT UNIQUE NOT NULL,
      readTime TEXT,
      featured BOOLEAN DEFAULT 0,
      coverImage TEXT,
      metaDescription TEXT,
      keywords TEXT,
      tags TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Criar tabela de usuários para autenticação
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Inserir usuário padrão se não existir
  const userExists = database.prepare('SELECT id FROM users WHERE username = ?').get('FábioCEO');
  if (!userExists) {
    console.log('Criando usuário admin...');
    // Senha: Faralufe101273 (hash em produção)
    database.prepare(`
      INSERT INTO users (username, password) 
      VALUES ('FábioCEO', 'Faralufe101273')
    `).run();
    console.log('Usuário admin criado com sucesso');
  } else {
    console.log('Usuário admin já existe');
  }

  // Inserir posts de exemplo se não existirem
  const postCount = database.prepare('SELECT COUNT(*) as count FROM posts').get() as { count: number };
  if (postCount.count === 0) {
    const examplePosts = [
      {
        title: "O Futuro da Energia Solar no Brasil",
        content: "O Brasil está vivenciando uma revolução no setor de energia solar. Com o aumento da demanda por energia limpa e renovável, o país tem se destacado como um dos principais mercados para investimentos em energia solar.\n\n## Principais Tendências\n\n- Crescimento exponencial da capacidade instalada\n- Redução dos custos de equipamentos\n- Novas políticas de incentivo governamental\n- Aumento da conscientização ambiental\n\n## Oportunidades de Mercado\n\nO setor solar brasileiro oferece diversas oportunidades para investidores, empresas e consumidores que buscam reduzir custos energéticos e contribuir para a sustentabilidade.",
        excerpt: "Análise das tendências e oportunidades no mercado de energia solar brasileiro para os próximos anos.",
        author: "Equipe Nodal Energy",
        category: "Energia Solar",
        slug: "futuro-energia-solar-brasil",
        readTime: "5 min",
        featured: 1,
        tags: JSON.stringify(["energia solar", "brasil", "sustentabilidade"]),
        metaDescription: "Análise das tendências e oportunidades no mercado de energia solar brasileiro",
        keywords: JSON.stringify(["energia solar", "brasil", "sustentabilidade"])
      },
      {
        title: "Como Reduzir Custos Energéticos em 30%",
        content: "A eficiência energética é uma das principais preocupações das empresas modernas. Com o aumento dos custos de energia, implementar estratégias de otimização se tornou essencial para manter a competitividade.\n\n## Estratégias de Eficiência\n\n### 1. Auditoria Energética\nRealize uma análise completa do consumo energético da sua empresa para identificar pontos de melhoria.\n\n### 2. Automação de Sistemas\nImplemente sistemas inteligentes que otimizem o uso de energia automaticamente.\n\n### 3. Treinamento da Equipe\nCapacite seus colaboradores para práticas mais eficientes de uso energético.\n\n## Resultados Esperados\n\nCom a implementação dessas estratégias, é possível alcançar uma redução significativa nos custos energéticos, contribuindo para a sustentabilidade e lucratividade da empresa.",
        excerpt: "Estratégias práticas para empresas que buscam eficiência energética e redução de custos operacionais.",
        author: "Equipe Nodal Energy",
        category: "Eficiência Energética",
        slug: "reduzir-custos-energeticos-30-porcento",
        readTime: "7 min",
        featured: 0,
        tags: JSON.stringify(["eficiência energética", "custos", "empresas"]),
        metaDescription: "Estratégias práticas para empresas que buscam eficiência energética",
        keywords: JSON.stringify(["eficiência energética", "custos", "empresas"])
      }
    ];

    const insertPost = database.prepare(`
      INSERT INTO posts (title, content, excerpt, author, category, slug, readTime, featured, tags, metaDescription, keywords)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    examplePosts.forEach(post => {
      insertPost.run(
        post.title,
        post.content,
        post.excerpt,
        post.author,
        post.category,
        post.slug,
        post.readTime,
        post.featured,
        post.tags,
        post.metaDescription,
        post.keywords
      );
    });
  }
}

// Função para fechar o banco
export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}
