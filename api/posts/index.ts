import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Buscar todos os posts
      const { rows } = await pool.query('SELECT * FROM blog_posts ORDER BY date DESC');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      res.status(500).json({ error: 'Erro ao buscar posts' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, content, author, category, excerpt, tags, coverImage, metaDescription, keywords } = req.body;
      
      // Validar dados obrigatórios
      if (!title || !content || !author || !category) {
        return res.status(400).json({ error: 'Dados obrigatórios não fornecidos' });
      }

      // Criar slug
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const readTime = Math.ceil(content.split(' ').length / 200) + ' min';

      // Inserir novo post
      const { rows } = await pool.query(`
        INSERT INTO blog_posts (title, content, author, category, excerpt, tags, cover_image, meta_description, keywords, date, slug, read_time, featured)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING *
      `, [title, content, author, category, excerpt || '', JSON.stringify(tags || []), coverImage || '', metaDescription || '', JSON.stringify(keywords || []), new Date().toISOString(), slug, readTime, false]);

      res.status(201).json(rows[0]);
    } catch (error) {
      console.error('Erro ao criar post:', error);
      res.status(500).json({ error: 'Erro ao criar post' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
