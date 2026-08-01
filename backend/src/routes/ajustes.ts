import express, { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate, authorizeAdmin, AuthRequest } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * Ajustes editáveis do catálogo: nome da peça e para qual WhatsApp o pedido vai.
 *
 * O acervo em si (tipo, cor, técnica, fotos) fica em catalogo.js, no front —
 * é o que casa com os arquivos de /Art. Aqui trafega só o que o admin muda,
 * indexado pelo mesmo slug. Assim o site continua funcionando se a API cair.
 */

/** Guarda só dígitos com DDI. Aceita "(86) 99999-9999", "86999999999", "+55 86...". */
function normalizarWhatsapp(valor: unknown): string | null {
  if (valor === null || valor === undefined) return null;
  const bruto = String(valor).trim();
  if (!bruto) return null;

  let digitos = bruto.replace(/\D/g, '');
  // número brasileiro digitado sem o DDI (10 = fixo com DDD, 11 = celular)
  if (digitos.length === 10 || digitos.length === 11) digitos = '55' + digitos;

  if (digitos.length < 12 || digitos.length > 15) {
    throw new Error('Número inválido. Use DDD + número, ex.: (86) 99999-9999.');
  }
  return digitos;
}

function normalizarNome(valor: unknown): string {
  const nome = String(valor ?? '').trim().replace(/\s+/g, ' ');
  if (nome.length < 2 || nome.length > 120) {
    throw new Error('O nome da peça deve ter entre 2 e 120 caracteres.');
  }
  return nome;
}

/* ------------------------------------------------------------------ *
 * PÚBLICO — o site lê isto para sobrepor ao catalogo.js
 * ------------------------------------------------------------------ */
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const [artesaos, pecas] = await Promise.all([
      prisma.artesao.findMany({ select: { id: true, nome: true, whatsapp: true } }),
      prisma.peca.findMany({
        select: {
          id: true, nome: true, nomeEditado: true, whatsapp: true, artesaoContato: true,
          artesaos: { select: { id: true } }
        }
      })
    ]);

    const porArtesao: Record<string, { nome: string; whatsapp: string | null }> = {};
    artesaos.forEach((a) => { porArtesao[a.id] = { nome: a.nome, whatsapp: a.whatsapp }; });

    const porPeca: Record<string, {
      nome: string | null; whatsapp: string | null; artesaoContato: string | null; artesaos: string[];
    }> = {};
    pecas.forEach((p) => {
      porPeca[p.id] = {
        // null quando ninguém renomeou: o front usa o nome do catalogo.js
        nome: p.nomeEditado ? p.nome : null,
        whatsapp: p.whatsapp,
        artesaoContato: p.artesaoContato,
        artesaos: p.artesaos.map((a) => a.id)
      };
    });

    res.json({ artesaos: porArtesao, pecas: porPeca });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar os ajustes.' });
  }
});

/* ------------------------------------------------------------------ *
 * ADMIN — número padrão de um artesão
 * ------------------------------------------------------------------ */
router.patch('/artesaos/:id', authenticate, authorizeAdmin,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;

      const existente = await prisma.artesao.findUnique({ where: { id } });
      if (!existente) {
        res.status(404).json({ error: 'Artesão não encontrado.' });
        return;
      }

      let whatsapp: string | null;
      try {
        whatsapp = normalizarWhatsapp(req.body.whatsapp);
      } catch (e: any) {
        res.status(400).json({ error: e.message });
        return;
      }

      const atualizado = await prisma.artesao.update({
        where: { id },
        data: { whatsapp }
      });

      res.json({ id: atualizado.id, nome: atualizado.nome, whatsapp: atualizado.whatsapp });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao salvar o número do artesão.' });
    }
  });

/* ------------------------------------------------------------------ *
 * ADMIN — nome da peça, número de exceção e quem atende
 * ------------------------------------------------------------------ */
router.patch('/pecas/:id', authenticate, authorizeAdmin,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;

      const peca = await prisma.peca.findUnique({
        where: { id },
        include: { artesaos: { select: { id: true } } }
      });
      if (!peca) {
        res.status(404).json({ error: 'Peça não encontrada.' });
        return;
      }

      const dados: {
        nome?: string; nomeEditado?: boolean;
        whatsapp?: string | null; artesaoContato?: string | null;
      } = {};

      try {
        if ('nome' in req.body) {
          dados.nome = normalizarNome(req.body.nome);
          dados.nomeEditado = true;
        }
        if ('whatsapp' in req.body) dados.whatsapp = normalizarWhatsapp(req.body.whatsapp);
      } catch (e: any) {
        res.status(400).json({ error: e.message });
        return;
      }

      if ('artesaoContato' in req.body) {
        const escolhido = req.body.artesaoContato;
        if (escolhido === null || escolhido === '') {
          dados.artesaoContato = null;
        } else {
          const creditados = peca.artesaos.map((a) => a.id);
          if (!creditados.includes(String(escolhido))) {
            res.status(400).json({
              error: 'Esse artesão não é creditado nesta peça.',
              creditados
            });
            return;
          }
          dados.artesaoContato = String(escolhido);
        }
      }

      if (!Object.keys(dados).length) {
        res.status(400).json({ error: 'Nada para atualizar.' });
        return;
      }

      const atualizada = await prisma.peca.update({ where: { id }, data: dados });

      res.json({
        id: atualizada.id,
        nome: atualizada.nome,
        whatsapp: atualizada.whatsapp,
        artesaoContato: atualizada.artesaoContato
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao salvar a peça.' });
    }
  });

export default router;
