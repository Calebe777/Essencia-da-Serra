import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

// Registrar novo usuário (Apenas Admin pode registrar outros, mas por enquanto vamos deixar aberto ou via script)
// Mas vamos liberar /register para criar os primeiros usuários ou artesãos
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, whatsapp, role } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: 'E-mail já está em uso.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role === 'ADMIN' ? 'ADMIN' : 'ARTISAN';

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        whatsapp,
        role: userRole
      }
    });

    res.status(201).json({ message: 'Usuário criado com sucesso!', userId: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado.' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: 'Senha incorreta.' });
      return;
    }

    const secret = process.env.JWT_SECRET || 'fallback-secret';
    const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1d' });

    res.json({ token, user: { id: user.id, name: user.name, role: user.role, whatsapp: user.whatsapp } });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login.' });
  }
});

// Atualizar o próprio WhatsApp (Apenas o próprio usuário)
router.put('/me', authenticate, async (req: any, res: Response): Promise<void> => {
  try {
    const { whatsapp } = req.body;
    const userId = req.user.id;

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { whatsapp }
    });

    res.json({ message: 'Dados atualizados com sucesso.', whatsapp: updated.whatsapp });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar dados.' });
  }
});

export default router;
