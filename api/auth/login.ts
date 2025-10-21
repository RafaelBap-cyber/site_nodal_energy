import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    // Credenciais válidas
    const validCredentials = {
      username: 'FábioCarrascoCEO',
      password: 'Faralufe'
    };

    if (username === validCredentials.username && password === validCredentials.password) {
      // Gerar token JWT
      const token = jwt.sign(
        { username, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Salvar sessão no Postgres
      await pool.query(`
        INSERT INTO admin_sessions (username, token, expires_at)
        VALUES ($1, $2, $3)
        ON CONFLICT (username) DO UPDATE SET
        token = $2,
        expires_at = $3
      `, [username, token, new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()]);

      res.status(200).json({
        success: true,
        token,
        user: { username, role: 'admin' }
      });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
