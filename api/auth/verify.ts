import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    // Verificar token
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // Verificar se a sessão ainda existe no Postgres
    const { rows } = await pool.query(`
      SELECT * FROM admin_sessions 
      WHERE username = $1 AND token = $2 AND expires_at > $3
    `, [decoded.username, token, new Date().toISOString()]);
    
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Sessão inválida' });
    }

    res.status(200).json({
      valid: true,
      user: { username: decoded.username, role: decoded.role }
    });
  } catch (error) {
    console.error('Erro na verificação:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
}
