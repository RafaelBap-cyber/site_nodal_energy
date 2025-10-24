import { VercelRequest, VercelResponse } from '@vercel/node';
import { getDatabase } from '../lib/database';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID do post é obrigatório' });
  }

  try {
    const db = getDatabase();

    if (req.method === 'GET') {
      // Buscar post específico
      const post = db.prepare(`
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
        WHERE id = ?
      `).get(parseInt(id));

      if (!post) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }

      // Converter tags e keywords de JSON string para array
      const formattedPost = {
        ...post,
        tags: post.tags ? JSON.parse(post.tags) : [],
        keywords: post.keywords ? JSON.parse(post.keywords) : [],
        featured: Boolean(post.featured)
      };

      return res.status(200).json(formattedPost);
    }

    if (req.method === 'PUT') {
      // Atualizar post
      const {
        title,
        content,
        excerpt,
        author,
        category,
        tags,
        keywords,
        coverImage,
        metaDescription,
        featured
      } = req.body;

      // Verificar se o post existe
      const existingPost = db.prepare('SELECT id FROM posts WHERE id = ?').get(parseInt(id));
      if (!existingPost) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }

      // Gerar slug se o título mudou
      let slug = existingPost.slug;
      if (title && title !== existingPost.title) {
        slug = title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .trim();
      }

      // Calcular tempo de leitura se o conteúdo mudou
      let readTime = existingPost.readTime;
      if (content && content !== existingPost.content) {
        readTime = Math.ceil(content.length / 1000) + ' min';
      }

      const updatePost = db.prepare(`
        UPDATE posts SET
          title = COALESCE(?, title),
          content = COALESCE(?, content),
          excerpt = COALESCE(?, excerpt),
          author = COALESCE(?, author),
          category = COALESCE(?, category),
          slug = COALESCE(?, slug),
          readTime = COALESCE(?, readTime),
          featured = COALESCE(?, featured),
          coverImage = COALESCE(?, coverImage),
          metaDescription = COALESCE(?, metaDescription),
          tags = COALESCE(?, tags),
          keywords = COALESCE(?, keywords),
          updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
      `);

      updatePost.run(
        title || null,
        content || null,
        excerpt || null,
        author || null,
        category || null,
        slug || null,
        readTime || null,
        featured !== undefined ? (featured ? 1 : 0) : null,
        coverImage || null,
        metaDescription || null,
        tags ? JSON.stringify(tags) : null,
        keywords ? JSON.stringify(keywords) : null,
        parseInt(id)
      );

      return res.status(200).json({ message: 'Post atualizado com sucesso' });
    }

    if (req.method === 'DELETE') {
      // Deletar post
      const deletePost = db.prepare('DELETE FROM posts WHERE id = ?');
      const result = deletePost.run(parseInt(id));

      if (result.changes === 0) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }

      return res.status(200).json({ message: 'Post deletado com sucesso' });
    }

    return res.status(405).json({ error: 'Método não permitido' });

  } catch (error) {
    console.error('Erro na API de posts:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
