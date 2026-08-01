/**
 * Cria/atualiza no banco as linhas de ajuste de cada artesão e cada peça,
 * lendo a estrutura de catalogo.js (a fonte de verdade do acervo).
 *
 * É idempotente: rode de novo depois de acrescentar peças no catalogo.js e
 * ele só insere o que falta, sem apagar os números já cadastrados.
 *
 *   cd backend
 *   node scripts/seed-ajustes.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const RAIZ = path.resolve(__dirname, '..', '..');

// catalogo.js declara ARTESAOS/PRODUTOS com var no escopo do módulo
eval(fs.readFileSync(path.join(RAIZ, 'catalogo.js'), 'utf8'));

/* Números informados pela marca. Só preenchem quem ainda está sem número —
   o que o admin cadastrar sempre tem precedência. */
const NUMEROS = JSON.parse(fs.readFileSync(path.join(__dirname, 'numeros-iniciais.json'), 'utf8'));

async function semearCatalogo() {
  let artesaosNovos = 0, pecasNovas = 0, nomesSincronizados = 0, numerosPreenchidos = 0;

  for (const a of ARTESAOS) {
    const existente = await prisma.artesao.findUnique({ where: { id: a.id } });
    const numero = NUMEROS[a.id] || null;

    if (existente) {
      const dados = {};
      if (existente.nome !== a.nome) dados.nome = a.nome;
      // nunca sobrescreve número já cadastrado
      if (!existente.whatsapp && numero) { dados.whatsapp = numero; numerosPreenchidos++; }
      if (Object.keys(dados).length) {
        await prisma.artesao.update({ where: { id: a.id }, data: dados });
      }
    } else {
      await prisma.artesao.create({ data: { id: a.id, nome: a.nome, whatsapp: numero } });
      if (numero) numerosPreenchidos++;
      artesaosNovos++;
    }
  }

  for (const p of PRODUTOS) {
    const existente = await prisma.peca.findUnique({ where: { id: p.id } });
    if (existente) {
      // Nome editado no admin é preservado; os demais acompanham o catálogo.
      const dados = { artesaos: { set: p.artesaos.map((id) => ({ id })) } };
      if (!existente.nomeEditado && existente.nome !== p.nome) {
        dados.nome = p.nome;
        nomesSincronizados++;
      }
      await prisma.peca.update({ where: { id: p.id }, data: dados });
    } else {
      await prisma.peca.create({
        data: {
          id: p.id,
          nome: p.nome,
          artesaos: { connect: p.artesaos.map((id) => ({ id })) }
        }
      });
      pecasNovas++;
    }
  }

  console.log(`artesãos: ${ARTESAOS.length} no catálogo (${artesaosNovos} inseridos agora)`);
  console.log(`peças:    ${PRODUTOS.length} no catálogo (${pecasNovas} inseridas agora)`);
  console.log(`nomes de peça sincronizados do catalogo.js: ${nomesSincronizados}`);
  console.log(`números de WhatsApp preenchidos: ${numerosPreenchidos}`);

  const semNumero = await prisma.artesao.findMany({ where: { whatsapp: null }, select: { nome: true } });
  if (semNumero.length) {
    console.log(`AINDA SEM NÚMERO: ${semNumero.map((a) => a.nome).join(', ')}`);
  }
}

async function garantirAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@essenciadaserra.com.br';
  const existente = await prisma.user.findUnique({ where: { email } });

  if (existente) {
    if (existente.role !== 'ADMIN') {
      await prisma.user.update({ where: { email }, data: { role: 'ADMIN' } });
      console.log(`\nusuário ${email} promovido a ADMIN`);
    } else {
      console.log(`\nadmin já existe: ${email} (senha inalterada)`);
    }
    return;
  }

  // Sem senha no .env, gera uma forte e mostra uma única vez.
  const gerada = !process.env.ADMIN_PASSWORD;
  const senha = process.env.ADMIN_PASSWORD || crypto.randomBytes(9).toString('base64url');

  await prisma.user.create({
    data: {
      name: 'Administração',
      email,
      password: await bcrypt.hash(senha, 10),
      role: 'ADMIN'
    }
  });

  console.log('\n--- ACESSO AO ADMIN ---');
  console.log(`  e-mail: ${email}`);
  console.log(`  senha:  ${senha}`);
  if (gerada) console.log('  (senha gerada agora — guarde, ela não será mostrada de novo)');
  console.log('-----------------------');
}

semearCatalogo()
  .then(garantirAdmin)
  .catch((e) => { console.error(e); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
