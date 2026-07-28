import express, { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

// Função auxiliar para gerar link do WhatsApp
const generateWhatsAppLink = (number: string | null, text: string) => {
  if (!number) return null;
  // Remove caracteres que não sejam números
  const cleanNumber = number.replace(/\D/g, '');
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
};

// Obter todas as peças públicas
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        artisan: {
          select: { name: true, whatsapp: true }
        }
      }
    });

    const productsWithContact = products.map(p => ({
      ...p,
      whatsappLink: generateWhatsAppLink(
        p.artisan.whatsapp, 
        `Olá, gostaria de saber mais sobre a peça "${p.title}" que vi no site Essência da Serra.`
      )
    }));

    res.json(productsWithContact);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
});

// Obter uma peça pelo ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { artisan: { select: { name: true, whatsapp: true } } }
    }) as any;

    if (!product) {
      res.status(404).json({ error: 'Peça não encontrada.' });
      return;
    }

    const whatsappLink = generateWhatsAppLink(
      product.artisan.whatsapp, 
      `Olá, gostaria de saber mais sobre a peça "${product.title}" que vi no site Essência da Serra.`
    );

    res.json({ ...product, whatsappLink });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o produto.' });
  }
});

// Criar nova peça (Autenticado)
router.post('/', authenticate, async (req: any, res: Response): Promise<void> => {
  try {
    const { title, description, price, category, imageUrl, status } = req.body;
    const userId = req.user.id;

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
        category,
        imageUrl,
        status: status || 'PUBLISHED',
        artisanId: userId
      }
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar peça.' });
  }
});

// Editar peça (Admin ou Dono da peça)
router.put('/:id', authenticate, async (req: any, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, price, category, imageUrl, status } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      res.status(404).json({ error: 'Peça não encontrada.' });
      return;
    }

    if (userRole !== 'ADMIN' && product.artisanId !== userId) {
      res.status(403).json({ error: 'Sem permissão para editar esta peça.' });
      return;
    }

    const updated = await prisma.product.update({
      where: { id },
      data: { title, description, price, category, imageUrl, status }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar peça.' });
  }
});

// Deletar peça (Admin ou Dono da peça)
router.delete('/:id', authenticate, async (req: any, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      res.status(404).json({ error: 'Peça não encontrada.' });
      return;
    }

    if (userRole !== 'ADMIN' && product.artisanId !== userId) {
      res.status(403).json({ error: 'Sem permissão para excluir esta peça.' });
      return;
    }

    await prisma.product.delete({ where: { id } });

    res.json({ message: 'Peça excluída com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir peça.' });
  }
});

export default router;
