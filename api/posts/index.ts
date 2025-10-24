import { VercelRequest, VercelResponse } from '@vercel/node';
import { getDatabase } from '../lib/database';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const db = getDatabase();

    if (req.method === 'GET') {
      // Listar todos os posts
      const posts = db.prepare(`
        SELECT 
          id,
          title,
          content,
          excerpt,
          author,
          category,
          date,
          slug,
          readTime,
          featured,
          coverImage,
          metaDescription,
          keywords,
          tags,
          createdAt,
          updatedAt
        FROM posts 
        ORDER BY createdAt DESC
      `).all();

      // Converter tags e keywords de JSON string para array
      const formattedPosts = posts.map(post => ({
        ...post,
        tags: post.tags ? JSON.parse(post.tags) : [],
        keywords: post.keywords ? JSON.parse(post.keywords) : [],
        featured: Boolean(post.featured)
      }));

      return res.status(200).json(formattedPosts);
    }

    if (req.method === 'POST') {
      // Criar novo post
      const {
        title,
        content,
        excerpt,
        author = 'Equipe Nodal Energy',
        category = 'Energia Solar',
        tags = [],
        keywords = [],
        coverImage,
        metaDescription,
        featured = false
      } = req.body;

      if (!title || !content || !excerpt) {
        return res.status(400).json({ error: 'Título, conteúdo e resumo são obrigatórios' });
      }

      // Gerar slug único
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();

      // Calcular tempo de leitura
      const readTime = Math.ceil(content.length / 1000) + ' min';

      const insertPost = db.prepare(`
        INSERT INTO posts (
          title, content, excerpt, author, category, slug, readTime, 
          featured, coverImage, metaDescription, tags, keywords
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const result = insertPost.run(
        title,
        content,
        excerpt,
        author,
        category,
        slug,
        readTime,
        featured ? 1 : 0,
        coverImage || null,
        metaDescription || null,
        JSON.stringify(tags),
        JSON.stringify(keywords)
      );

      return res.status(201).json({
        id: result.lastInsertRowid,
        message: 'Post criado com sucesso'
      });
    }

    return res.status(405).json({ error: 'Método não permitido' });

  } catch (error) {
    console.error('Erro na API de posts:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
