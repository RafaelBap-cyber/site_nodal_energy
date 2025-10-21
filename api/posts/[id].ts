import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query('SELECT * FROM blog_posts WHERE id = $1', [id]);
      
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }
      
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Erro ao buscar post:', error);
      res.status(500).json({ error: 'Erro ao buscar post' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { title, content, author, category, excerpt, tags, coverImage, metaDescription, keywords, featured } = req.body;
      
      // Verificar se o post existe
      const { rows: existingPost } = await pool.query('SELECT * FROM blog_posts WHERE id = $1', [id]);
      
      if (existingPost.length === 0) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }

      // Atualizar post
      const { rows } = await pool.query(`
        UPDATE blog_posts 
        SET 
          title = COALESCE($1, title),
          content = COALESCE($2, content),
          author = COALESCE($3, author),
          category = COALESCE($4, category),
          excerpt = COALESCE($5, excerpt),
          tags = COALESCE($6, tags),
          cover_image = COALESCE($7, cover_image),
          meta_description = COALESCE($8, meta_description),
          keywords = COALESCE($9, keywords),
          featured = COALESCE($10, featured),
          updated_at = $11
        WHERE id = $12
        RETURNING *
      `, [title, content, author, category, excerpt, JSON.stringify(tags), coverImage, metaDescription, JSON.stringify(keywords), featured, new Date().toISOString(), id]);

      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      res.status(500).json({ error: 'Erro ao atualizar post' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { rows } = await pool.query('DELETE FROM blog_posts WHERE id = $1 RETURNING *', [id]);
      
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }
      
      res.status(200).json({ message: 'Post deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar post:', error);
      res.status(500).json({ error: 'Erro ao deletar post' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
