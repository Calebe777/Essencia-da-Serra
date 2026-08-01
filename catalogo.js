/* ==========================================================================
   CATÁLOGO — ESSÊNCIA DA SERRA
   Vínculo entre artesãos, peças e fotos da pasta /Art.

   Cada foto foi conferida visualmente. Uma mesma foto pode aparecer em mais
   de um produto (e em mais de uma pasta de artesão) porque o editorial
   fotografa o look completo: a camisa de quem costurou, o bordado de quem
   bordou e a bolsa de quem crocheta dividem o mesmo quadro. Por isso
   `artesaos` é uma lista.
   ========================================================================== */

var ARTESAOS = [
  { id:'arilene',   nome:'Arilene',              oficio:'Bordado & Crochê',        foto:'Art/Arilene.jpg',                            bio:'Trabalha com bordado ponto cruz e com todos os tipos de crochê há mais de 10 anos.', whatsapp:'5589981291404' },
  { id:'arteniza',  nome:'Arteniza',             oficio:'Bordado Richelieu',       foto:'Art/Arteniza.jpg',                           bio:'Trabalha há 10 anos com bordado richelieu.', whatsapp:'5589981205893' },
  { id:'arylandia', nome:'Arylândia Mota',       oficio:'Crochê',                  foto:'Art/Arylandia.jpg',                          bio:'Trabalha com peças em crochê desde a adolescência.', whatsapp:'5589981283271' },
  { id:'cristina',  nome:'Cristina',             oficio:'Pintura & Bordado',       foto:'Art/Cristina.jpg',                           bio:'Há 29 anos trabalha com pintura em tecido e bordados ponto cruz, ponto livre, pedraria e crochê.', whatsapp:'5589981310537' },
  { id:'dani',      nome:'Daniela Costuras',     oficio:'Costura',                 foto:'Art/Dani Costuras.jpg',                      bio:'Desde a adolescência trabalha com costura de roupas personalizadas.', whatsapp:'5589981137945' },
  { id:'gil',       nome:'Gil Paes',             oficio:'Pintura & Cerâmica',      foto:'Art/Gil Paes.jpg',                           bio:'Há 32 anos trabalha com pintura em tecido e cerâmica artesanal.', whatsapp:'5589981489408' },
  { id:'girlene',   nome:'Girlene',              oficio:'Bordado & Pintura',       foto:'Art/Girleinia.jpg',                          bio:'Trabalha com a produção de peças em bordado e pintura à mão.', whatsapp:'5589981021703' },
  { id:'juliana',   nome:'Juliana',              oficio:'Joias Rupestres',         foto:'Art/Juliana.jpg',                            bio:'Produz joias com desenhos das pinturas rupestres da Serra da Capivara.', whatsapp:'5589981124624' },
  { id:'kivia',     nome:'Kívia',                oficio:'Crochê',                  foto:'Art/Kívia.jpg',                              bio:'Faz roupas e acessórios, como bolsas, em crochê desde os 12 anos de idade.', whatsapp:'5589981105153' },
  { id:'leda',      nome:'Leda',                 oficio:'Bordado Ponto Cruz',      foto:'Art/Leda.jpg',                               bio:'Há 15 anos trabalha com bordado ponto cruz.', whatsapp:'5589981205893' },
  { id:'luan',      nome:'Luan Dias',            oficio:'Pintura em Tecido',       foto:'Art/Luan.png',                               bio:'Desde criança pinta desenhos e usa esse dom no artesanato com pintura em tecido.', whatsapp:'5589981381169' },
  { id:'lucrecia',  nome:'Lucrécia Assis',       oficio:'Costura, Bordado & Crochê', foto:'Art/Lucrecia.jpg',                         bio:'Costura, bordado e crochê são o seu forte há mais de 25 anos.', whatsapp:'5589981020080' },
  { id:'luiza',     nome:'Luíza Oliveira',       oficio:'Crochê',                  foto:'Art/Luiza Oliveira.jpg',                     bio:'Ainda criança aprendeu a fazer crochê. Produz roupas e bolsas, tudo em crochê.', whatsapp:'5589981005901' },
  { id:'maricelia', nome:'Maricelia',            oficio:'Crochê & Fuxico',         foto:'Art/Maricelia.jpg',                          bio:'Desde muito cedo aprendeu a fazer crochê. Trabalha produzindo peças em crochê e fuxico.', whatsapp:'5589981455175' },
  { id:'maryland',  nome:'Francílio & Maryland', oficio:'Macramê & Madeira',       foto:'Art/Francilio e Maryland.jpg',               bio:'Proprietários da Art Samaga. Trabalham com bolsas, roupas e cintos em madeira e macramê.', whatsapp:'5589981008509' },
  { id:'mercedes',  nome:'Mercedes Sousa',       oficio:'Crochê',                  foto:'Art/Mercedes.jpg',                           bio:'Há 61 anos trabalha com crochê, produzindo roupas.', whatsapp:'5589981110377' },
  { id:'nara',      nome:'Nara Luzia',           oficio:'Richelieu & Ponto Cheio', foto:'Art/Nara luzia (Nalu artes & bordados).jpg', bio:'Proprietária da Nalu Bordados. Produz peças em richelieu e ponto cheio há mais de 16 anos.', whatsapp:'5589981372689' },
  { id:'oveide',    nome:'Oveide & Ary',         oficio:'Artesanato em Madeira',   foto:'Art/Ovide.png',                              bio:'Produzem artesanato em madeira, como colares sofisticados e peças personalizadas, há mais de 20 anos.', whatsapp:'5589981171900' },
  { id:'raimunda',  nome:'Raimunda',             oficio:'Bordado & Biojoias',      foto:'Art/Raimunda.jpg',                           bio:'Bordadeira em ponto cruz. Faz biojoias em cabaça e semente há 10 anos.', whatsapp:'5589981015934' },
  { id:'rosalia',   nome:'Rosália',              oficio:'Colares & Bordado',       foto:'Art/Rosalia.jpg',                            bio:'Trabalha com artesanato em colares de sementes e bordado em tecido.', whatsapp:'5589981054638' }
];

/* --------------------------------------------------------------------------
   PRODUTOS
   tipo      — vestido, camisa, calça, saia, blusa, conjunto, bolsa, brinco...
   cor       — cor dominante da peça (é por aqui que se busca "vestido marrom")
   tecnica   — crochê, macramê, bordado, richelieu, pintura em tecido, biojoia
   categoria — Vestuário | Bolsas | Acessórios
   artesaos  — ids de quem produziu a peça
   fotos     — todas as fotos em que a peça aparece, na pasta de cada artesão
   -------------------------------------------------------------------------- */

var PRODUTOS = [

  /* ---------- ARILENE — crochê ---------- */
  { id:'saia-longa-croche-verde', nome:'Saia longa em crochê verde', tipo:'saia', cor:'verde', tecnica:'crochê',
    categoria:'Vestuário', artesaos:['arilene'],
    fotos:['Art/Arilene/RAI_9728.jpg','Art/Arilene/RAI_9732.jpg','Art/Girlene/RAI_9712.jpg','Art/Girlene/RAI_9714.jpg','Art/Dani/RAI_9709.jpg'] },

  { id:'top-faixa-croche-verde', nome:'Top faixa em crochê verde', tipo:'top', cor:'verde', tecnica:'crochê',
    categoria:'Vestuário', artesaos:['arilene'],
    fotos:['Art/Arilene/RAI_9732.jpg','Art/Arilene/RAI_9728.jpg'] },

  /* ---------- ARTENIZA — bordado / aplicação ---------- */
  { id:'camisa-marrom-bordada-rupestre', nome:'Camisa marrom bordada com figuras rupestres', tipo:'camisa', cor:'marrom', tecnica:'bordado',
    categoria:'Vestuário', artesaos:['arteniza'],
    fotos:['Art/Arteniza/RAI_9812.jpg','Art/Arteniza/RAI_9815.jpg'] },

  { id:'conjunto-marrom-bordado-rupestre', nome:'Conjunto camisa e calça marrom com bordado rupestre', tipo:'conjunto', cor:'marrom', tecnica:'bordado',
    categoria:'Vestuário', artesaos:['arteniza'],
    fotos:['Art/Arteniza/RAI_9977.jpg','Art/Arteniza/RAI_9985.jpg','Art/Arteniza/RAI_9987.jpg','Art/Arteniza/RAI_9988.jpg','Art/Arteniza/RAI_9991.jpg','Art/Arteniza/RAI_9994.jpg'] },

  /* ---------- ARYLANDIA — crochê ---------- */
  { id:'blusa-poncho-croche-verde-militar', nome:'Blusa de crochê com cena do beijo da Serra da Capivara', tipo:'blusa', cor:'verde', tecnica:'crochê',
    categoria:'Vestuário', artesaos:['arylandia'],
    fotos:['Art/Arylandia/RAI_0040.jpg','Art/Arylandia/RAI_0025.jpg','Art/Arylandia/RAI_0035.jpg','Art/Arylandia/RAI_0039.jpg','Art/Arylandia/RAI_0045.jpg','Art/Arylandia/RAI_0046.jpg'] },

  { id:'saia-curta-pintada-caatinga', nome:'Saia curta pintada à mão com a caatinga verde', tipo:'saia', cor:'verde', tecnica:'pintura em tecido',
    categoria:'Vestuário', artesaos:['arylandia'],
    fotos:['Art/Arylandia/RAI_0046.jpg','Art/Arylandia/RAI_0040.jpg','Art/Arylandia/RAI_0035.jpg','Art/Arylandia/RAI_0039.jpg'] },

  /* ---------- CRISTINA — pintura em tecido ---------- */
  { id:'conjunto-pintado-terracota', nome:'Conjunto de blusa e calça pintada como a Pedra Furada e rochas da Serra da Capivara', tipo:'conjunto', cor:'terracota', tecnica:'pintura em tecido',
    categoria:'Vestuário', artesaos:['cristina'],
    fotos:['Art/Cristina/RAI_9701.jpg','Art/Cristina/RAI_9696.jpg','Art/Cristina/RAI_9703.jpg'] },

  { id:'conjunto-top-saia-pintado-serra', nome:'Conjunto de saia e blusa com pedra furada', tipo:'conjunto', cor:'amarelo', tecnica:'pintura em tecido',
    categoria:'Vestuário', artesaos:['cristina'],
    fotos:['Art/Cristina/RAI_9763.jpg','Art/Cristina/RAI_9757.jpg','Art/Cristina/RAI_9768.jpg'] },

  /* ---------- DANI + GIL — costura e pintura ---------- */
  { id:'camisa-amarela-pintada-serra', nome:'Camisa amarela pintada à mão com a Serra', tipo:'camisa', cor:'amarelo', tecnica:'pintura em tecido',
    categoria:'Vestuário', artesaos:['dani','gil'],
    fotos:['Art/Dani/RAI_9556.jpg','Art/Dani/RAI_9546.jpg','Art/Dani/RAI_9553.jpg','Art/Gil/RAI_9556.jpg','Art/Gil/RAI_9546.jpg','Art/Gil/RAI_9553.jpg'] },

  { id:'calca-verde-pintada', nome:'Calça verde pintada à mão', tipo:'calça', cor:'verde', tecnica:'pintura em tecido',
    categoria:'Vestuário', artesaos:['dani','gil'],
    fotos:['Art/Dani/RAI_9546.jpg','Art/Dani/RAI_9553.jpg','Art/Dani/RAI_9556.jpg','Art/Gil/RAI_9546.jpg','Art/Gil/RAI_9553.jpg'] },

  /* ---------- DANI + GIRLENE — camisa verde com bordado de mandacaru ---------- */
  { id:'camisa-verde-bordado-mandacaru', nome:'Camisa verde oliva com bordado de mandacaru', tipo:'camisa', cor:'verde', tecnica:'bordado',
    categoria:'Vestuário', artesaos:['dani','girlene'],
    fotos:['Art/Dani/RAI_9714.jpg','Art/Dani/RAI_9709.jpg','Art/Dani/RAI_9712.jpg','Art/Dani/RAI_9722.jpg','Art/Dani/RAI_9724.jpg','Art/Dani/RAI_9735.jpg','Art/Dani/RAI_9738.jpg','Art/Dani/RAI_9741.jpg','Art/Dani/RAI_9742.jpg','Art/Dani/RAI_9744.jpg','Art/Girlene/RAI_9712.jpg','Art/Girlene/RAI_9714.jpg','Art/Girlene/RAI_9722.jpg','Art/Girlene/RAI_9724.jpg','Art/Girlene/RAI_9728.jpg','Art/Girlene/RAI_9735.jpg','Art/Girlene/RAI_9741.jpg','Art/Girlene/RAI_9742.jpg','Art/Girlene/RAI_9744.jpg'] },

  /* ---------- DANI + GIRLENE — conjunto caqui bordado ---------- */
  { id:'conjunto-caqui-bordado-rupestre', nome:'Conjunto camisa e calça caqui com bordado rupestre', tipo:'conjunto', cor:'caqui', tecnica:'bordado',
    categoria:'Vestuário', artesaos:['dani','girlene'],
    fotos:['Art/Girlene/RAI_9862.jpg','Art/Girlene/RAI_9859.jpg','Art/Girlene/RAI_9864.jpg','Art/Girlene/RAI_9867.jpg','Art/Girlene/RAI_9869.jpg','Art/Girlene/RAI_9873.jpg','Art/Girlene/RAI_9875.jpg','Art/Girlene/RAI_9877.jpg','Art/Girlene/RAI_9879.jpg','Art/Dani/RAI_9859.jpg','Art/Dani/RAI_9862.jpg','Art/Dani/RAI_9864.jpg','Art/Dani/RAI_9879.jpg'] },

  /* ---------- GIRLENE — conjunto marrom bordado em linha clara ---------- */
  { id:'conjunto-marrom-bordado-branco', nome:'Conjunto camisa e calça marrom com bordado rupestre claro', tipo:'conjunto', cor:'marrom', tecnica:'bordado',
    categoria:'Vestuário', artesaos:['girlene'],
    fotos:['Art/Girlene/RAI_9796.jpg','Art/Girlene/RAI_9794.jpg','Art/Girlene/RAI_9798.jpg','Art/Kivia/RAI_9801.jpg','Art/Kivia/RAI_9800.jpg'] },

  /* ---------- GIL — pintura e biojoias ---------- */
  { id:'vestido-azul-pintado-serra', nome:'Vestido tomara-que-caia azul com pintura da Serra', tipo:'vestido', cor:'azul', tecnica:'pintura em tecido',
    categoria:'Vestuário', artesaos:['gil'],
    fotos:['Art/Gil/RAI_0089.jpg','Art/Gil/RAI_0085.jpg','Art/Kivia/RAI_0093.jpg'] },

  { id:'conjunto-creme-short-pintado', nome:'Camisa creme e short pintados com a paisagem da Serra', tipo:'conjunto', cor:'creme', tecnica:'pintura em tecido',
    categoria:'Vestuário', artesaos:['gil'],
    fotos:['Art/Gil/RAI_9899.jpg','Art/Gil/RAI_9900.jpg'] },

  { id:'brinco-cobre-rupestre', nome:'Brinco redondo em cobre martelado com arte rupestre', tipo:'brinco', cor:'cobre', tecnica:'biojoia',
    categoria:'Acessórios', artesaos:['gil'],
    fotos:['Art/Gil/RAI_9625.jpg','Art/Gil/RAI_9499.jpg','Art/Gil/RAI_9622.jpg','Art/Gil/RAI_9626.jpg','Art/Gil/RAI_9628.jpg','Art/Gil/RAI_9631.jpg','Art/Gil/RAI_9660.jpg','Art/Gil/RAI_9664.jpg'] },

  { id:'colar-trancado-terracota', nome:'Colar trançado em terracota', tipo:'colar', cor:'terracota', tecnica:'biojoia',
    categoria:'Acessórios', artesaos:['gil'],
    fotos:['Art/Gil/RAI_9626.jpg','Art/Gil/RAI_9622.jpg','Art/Gil/RAI_9625.jpg','Art/Gil/RAI_9628.jpg','Art/Gil/RAI_9631.jpg','Art/Gil/RAI_9660.jpg','Art/Gil/RAI_9664.jpg'] },

  /* ---------- JULIANA — biojoias em prata ---------- */
  { id:'colar-prata-rupestre', nome:'Colar em prata com pingente de arte rupestre', tipo:'colar', cor:'prata', tecnica:'biojoia',
    categoria:'Acessórios', artesaos:['juliana'],
    fotos:['Art/Juliana/RAI_0100.jpg','Art/Juliana/RAI_0097.jpg','Art/Juliana/RAI_9534.jpg','Art/Juliana/RAI_9535.jpg','Art/Juliana/RAI_9537.jpg','Art/Juliana/DSC02204 copiar.jpg'] },

  { id:'brinco-argola-prata-rupestre', nome:'Brinco argola em prata com pingente rupestre', tipo:'brinco', cor:'prata', tecnica:'biojoia',
    categoria:'Acessórios', artesaos:['juliana'],
    fotos:['Art/Juliana/RAI_9753.jpg','Art/Juliana/RAI_9749.jpg','Art/Juliana/RAI_9755.jpg'] },

  /* ---------- KÍVIA — bolsas em crochê ---------- */
  { id:'bolsa-franjas-laranja', nome:'Bolsa com franjas laranja e alça de madeira', tipo:'bolsa', cor:'laranja', tecnica:'crochê',
    categoria:'Bolsas', artesaos:['kivia'],
    fotos:['Art/Kivia/RAI_0093.jpg','Art/Gil/RAI_0089.jpg','Art/Gil/RAI_0085.jpg'] },

  { id:'clutch-croche-verde-musgo', nome:'Clutch em crochê verde musgo', tipo:'clutch', cor:'verde', tecnica:'crochê',
    categoria:'Bolsas', artesaos:['kivia'],
    fotos:['Art/Kivia/RAI_9581.jpg','Art/Kivia/RAI_9578.jpg','Art/Kivia/RAI_9582.jpg','Art/Kivia/RAI_9583.jpg','Art/Maryland/RAI_9578.jpg','Art/Maryland/RAI_9581.jpg','Art/Maricelia/RAI_9574.jpg','Art/Maricelia/RAI_9571.jpg','Art/Maricelia/RAI_9575.jpg'] },

  { id:'pochete-croche-bege', nome:'Pochete em crochê bege', tipo:'pochete', cor:'bege', tecnica:'crochê',
    categoria:'Bolsas', artesaos:['kivia'],
    fotos:['Art/Kivia/RAI_9803.jpg','Art/Kivia/RAI_9800.jpg','Art/Kivia/RAI_9801.jpg'] },

  { id:'clutch-croche-telha', nome:'Clutch em crochê laranja telha', tipo:'clutch', cor:'laranja', tecnica:'crochê',
    categoria:'Bolsas', artesaos:['kivia'],
    fotos:['Art/Kivia/RAI_9896.jpg'] },

  { id:'bolsa-franjas-marrom', nome:'Bolsa com franjas marrom e alça longa', tipo:'bolsa', cor:'marrom', tecnica:'crochê',
    categoria:'Bolsas', artesaos:['kivia'],
    fotos:['Art/Kivia/RAI_9906.jpg','Art/Kivia/RAI_9909.jpg'] },

  { id:'bolsa-croche-marrom-couro', nome:'Bolsa em crochê marrom com alças de couro', tipo:'bolsa', cor:'marrom', tecnica:'crochê',
    categoria:'Bolsas', artesaos:['kivia'],
    fotos:['Art/Kivia/RAI_9958.jpg','Art/Kivia/RAI_9956.jpg'] },

  { id:'top-croche-marrom', nome:'Top em crochê marrom', tipo:'top', cor:'marrom', tecnica:'crochê',
    categoria:'Vestuário', artesaos:['kivia'],
    fotos:['Art/Kivia/RAI_9953.jpg','Art/Kivia/RAI_9949.jpg','Art/Oveide/RAI_9952.jpg','Art/Oveide/RAI_9964.jpg','Art/Oveide/RAI_9969.jpg','Art/Rosalia/RAI_9960.jpg'] },

  { id:'vestido-marrom-fluido-croche', nome:'Vestido marrom fluido com aplicação de crochê', tipo:'vestido', cor:'marrom', tecnica:'crochê',
    categoria:'Vestuário', artesaos:['kivia'],
    fotos:['Art/Kivia/RAI_9949.jpg','Art/Kivia/RAI_9953.jpg','Art/Kivia/RAI_9956.jpg','Art/Kivia/RAI_9958.jpg'] },

  /* ---------- LEDA — modelagem ---------- */
  { id:'conjunto-kimono-marrom', nome:'Conjunto kimono e calça marrom com bolsos bordados', tipo:'conjunto', cor:'marrom', tecnica:'bordado',
    categoria:'Vestuário', artesaos:['leda','dani'],
    fotos:['Art/Leda/RAI_9936.jpg','Art/Leda/RAI_9922.jpg','Art/Leda/RAI_9926.jpg','Art/Leda/RAI_9934.jpg','Art/Leda/RAI_9939.jpg','Art/Leda/RAI_9943.jpg','Art/Dani/RAI_9936.jpg'] },

  /* ---------- LUAN — pintura em tecido ---------- */
  { id:'conjunto-poncho-calca-pintado-serra', nome:'Poncho e calça ocre pintados com a Serra e a lua', tipo:'conjunto', cor:'ocre', tecnica:'pintura em tecido',
    categoria:'Vestuário', artesaos:['luan'],
    fotos:['Art/Luan/RAI_0055.jpg','Art/Luan/RAI_0048.jpg','Art/Luan/RAI_0054.jpg','Art/Luan/RAI_0057.jpg','Art/Luan/RAI_0061.jpg','Art/Luan/RAI_0068.jpg','Art/Luan/RAI_0072.jpg'] },

  { id:'camisa-crua-aplicacao-rupestre', nome:'Camisa crua com aplicação de figuras rupestres', tipo:'camisa', cor:'cru', tecnica:'bordado',
    categoria:'Vestuário', artesaos:['luan'],
    fotos:['Art/Luan/RAI_9678.jpg','Art/Luan/RAI_9675.jpg','Art/Luan/RAI_9680.jpg','Art/Luan/RAI_9684.jpg','Art/Luan/RAI_9686.jpg'] },

  { id:'calca-camuflada-terrosa', nome:'Calça estampada camuflada em tons terrosos', tipo:'calça', cor:'marrom', tecnica:'pintura em tecido',
    categoria:'Vestuário', artesaos:['luan'],
    fotos:['Art/Luan/RAI_9561.jpg','Art/Luan/RAI_9559.jpg','Art/Luan/RAI_9563.jpg','Art/Luan/RAI_9564.jpg','Art/Luiza/RAI_9561.jpg','Art/Maryland/RAI_9567.jpg'] },

  /* ---------- LUCRECIA — crochê e bordado ---------- */
  { id:'conjunto-bege-bordado-casal-rupestre', nome:'Top e saia bege com bordado de casal rupestre', tipo:'conjunto', cor:'bege', tecnica:'bordado',
    categoria:'Vestuário', artesaos:['lucrecia'],
    fotos:['Art/Lucrecia/RAI_9605.jpg','Art/Lucrecia/RAI_9591.jpg','Art/Lucrecia/RAI_9598.jpg','Art/Lucrecia/RAI_9599.jpg','Art/Lucrecia/RAI_9602.jpg','Art/Lucrecia/RAI_9607.jpg','Art/Lucrecia/RAI_9609.jpg'] },

  { id:'blusa-croche-bege-franjas', nome:'Blusa em crochê bege com franjas', tipo:'blusa', cor:'bege', tecnica:'crochê',
    categoria:'Vestuário', artesaos:['lucrecia'],
    fotos:['Art/Lucrecia/RAI_9637.jpg','Art/Lucrecia/RAI_9635.jpg','Art/Lucrecia/RAI_9638.jpg','Art/Lucrecia/RAI_9641.jpg','Art/Lucrecia/RAI_9645.jpg'] },

  { id:'saia-bege-aplicacao-croche', nome:'Saia bege com aplicação de crochê', tipo:'saia', cor:'bege', tecnica:'crochê',
    categoria:'Vestuário', artesaos:['lucrecia'],
    fotos:['Art/Lucrecia/RAI_9645.jpg','Art/Lucrecia/RAI_9635.jpg','Art/Lucrecia/RAI_9638.jpg','Art/Lucrecia/RAI_9641.jpg'] },

  { id:'clutch-croche-caramelo', nome:'Clutch em crochê caramelo', tipo:'clutch', cor:'caramelo', tecnica:'crochê',
    categoria:'Bolsas', artesaos:['lucrecia'],
    fotos:['Art/Lucrecia/RAI_9605.jpg','Art/Lucrecia/RAI_9598.jpg','Art/Lucrecia/RAI_9599.jpg','Art/Lucrecia/RAI_9602.jpg','Art/Lucrecia/RAI_9607.jpg','Art/Lucrecia/RAI_9609.jpg'] },

  /* ---------- LUIZA OLIVEIRA — crochê ---------- */
  { id:'blusa-croche-caramelo-bufante', nome:'Blusa em crochê caramelo com manga bufante', tipo:'blusa', cor:'caramelo', tecnica:'crochê',
    categoria:'Vestuário', artesaos:['luiza'],
    fotos:['Art/Luiza/RAI_9561.jpg','Art/Luiza/RAI_9563.jpg','Art/Luiza/RAI_9564.jpg','Art/Luan/RAI_9559.jpg','Art/Luan/RAI_9561.jpg','Art/Luan/RAI_9563.jpg','Art/Luan/RAI_9564.jpg','Art/Maryland/RAI_9567.jpg'] },

  /* ---------- MARICELIA — crochê ---------- */
  { id:'vestido-croche-marrom-floral', nome:'Vestido curto em crochê marrom com pontos florais', tipo:'vestido', cor:'marrom', tecnica:'crochê',
    categoria:'Vestuário', artesaos:['maricelia'],
    fotos:['Art/Maricelia/RAI_9513.jpg','Art/Maricelia/RAI_9506.jpg','Art/Maricelia/RAI_9509.jpg','Art/Maricelia/RAI_9517.jpg'] },

  { id:'vestido-croche-rose-midi', nome:'Vestido midi em crochê rosé', tipo:'vestido', cor:'rosé', tecnica:'crochê',
    categoria:'Vestuário', artesaos:['maricelia'],
    fotos:['Art/Maricelia/RAI_9574.jpg','Art/Maricelia/RAI_9571.jpg','Art/Maricelia/RAI_9575.jpg','Art/Kivia/RAI_9578.jpg','Art/Kivia/RAI_9581.jpg','Art/Kivia/RAI_9582.jpg','Art/Kivia/RAI_9583.jpg','Art/Maryland/RAI_9578.jpg','Art/Maryland/RAI_9581.jpg'] },

  /* ---------- FRANCILIO & MARYLAND — macramê ---------- */
  { id:'poncho-macrame-marrom', nome:'Vestido com bata em macramê', tipo:'poncho', cor:'marrom', tecnica:'macramê',
    categoria:'Vestuário', artesaos:['maryland'],
    fotos:['Art/Maryland/RAI_0014.jpg','Art/Maryland/RAI_0002.jpg','Art/Maryland/RAI_0011.jpg','Art/Rosalia/RAI_0017.jpg','Art/Rosalia/RAI_0020.jpg'] },

  { id:'vestido-macrame-marrom', nome:'Vestido em macramê marrom com franjas longas', tipo:'vestido', cor:'marrom', tecnica:'macramê',
    categoria:'Vestuário', artesaos:['maryland'],
    fotos:['Art/Maryland/RAI_9843.jpg','Art/Maryland/RAI_9826.jpg','Art/Maryland/RAI_9834.jpg','Art/Maryland/RAI_9841.jpg','Art/Maryland/RAI_9844.jpg','Art/Maryland/RAI_9845.jpg'] },

  { id:'cinto-corda-macrame', nome:'Cinto de corda em macramê com fivela de madeira', tipo:'cinto', cor:'cru', tecnica:'macramê',
    categoria:'Acessórios', artesaos:['maryland'],
    fotos:['Art/Maryland/RAI_0119.jpg','Art/Maryland/RAI_9567.jpg','Art/Nara/RAI_0120.jpg','Art/Nara/RAI_0124.jpg','Art/Nara/RAI_0132.jpg','Art/Nara/RAI_0134.jpg','Art/Luiza/RAI_9561.jpg','Art/Luiza/RAI_9563.jpg','Art/Luiza/RAI_9564.jpg'] },

  { id:'cinto-trancado-fivela-rupestre', nome:'Cinto trançado com fivela de arte rupestre', tipo:'cinto', cor:'marrom', tecnica:'macramê',
    categoria:'Acessórios', artesaos:['maryland'],
    fotos:['Art/Maryland/RAI_9581.jpg','Art/Maryland/RAI_9578.jpg','Art/Kivia/RAI_9578.jpg','Art/Kivia/RAI_9581.jpg','Art/Kivia/RAI_9582.jpg','Art/Kivia/RAI_9583.jpg','Art/Maricelia/RAI_9571.jpg','Art/Maricelia/RAI_9574.jpg'] },

  /* ---------- MERCEDES SOUSA — crochê ---------- */
  { id:'conjunto-croche-terracota', nome:'Top faixa e saia midi em crochê terracota', tipo:'conjunto', cor:'terracota', tecnica:'crochê',
    categoria:'Vestuário', artesaos:['mercedes'],
    fotos:['Art/Mercedes/RAI_9657.jpg','Art/Mercedes/RAI_9656.jpg'] },

  /* ---------- NARA LUZIA — richelieu ---------- */
  { id:'conjunto-verde-richelieu-cactos-fem', nome:'Camisa e short verde com richelieu de cactos', tipo:'conjunto', cor:'verde', tecnica:'richelieu',
    categoria:'Vestuário', artesaos:['nara'],
    fotos:['Art/Nara/RAI_0114.jpg','Art/Nara/RAI_0102.jpg','Art/Nara/RAI_0107.jpg','Art/Nara/RAI_0120.jpg','Art/Nara/RAI_0124.jpg','Art/Nara/RAI_0132.jpg','Art/Nara/RAI_0134.jpg','Art/Maryland/RAI_0119.jpg'] },

  { id:'conjunto-verde-richelieu-cactos-masc', nome:'Camisa e calça verde com richelieu de cactos', tipo:'conjunto', cor:'verde', tecnica:'richelieu',
    categoria:'Vestuário', artesaos:['nara'],
    fotos:['Art/Nara/RAI_9780.jpg','Art/Nara/RAI_9777.jpg','Art/Nara/RAI_9784.jpg','Art/Nara/RAI_9786.jpg','Art/Nara/RAI_9789.jpg','Art/Nara/RAI_9791.jpg'] },

  /* ---------- OVEIDE — entalhe em madeira ---------- */
  { id:'colar-madeira-folha', nome:'Colar com pingente de folha em madeira entalhada', tipo:'colar', cor:'madeira', tecnica:'entalhe em madeira',
    categoria:'Acessórios', artesaos:['oveide'],
    fotos:['Art/Oveide/RAI_9964.jpg','Art/Oveide/RAI_9952.jpg','Art/Oveide/RAI_9969.jpg','Art/Kivia/RAI_9953.jpg','Art/Kivia/RAI_9949.jpg'] },

  /* ---------- RAIMUNDA — biojoias ---------- */
  { id:'brinco-gota-madeira-rupestre', nome:'Brinco em semente com cena do beijo', tipo:'brinco', cor:'marrom', tecnica:'biojoia',
    categoria:'Acessórios', artesaos:['raimunda'],
    fotos:['Art/Raimunda/DSC02171 copiar.jpg','Art/Raimunda/DSC02173 copiar.jpg'] },

  { id:'brinco-gota-prata-rupestre', nome:'Brinco gota em prata com gravação rupestre', tipo:'brinco', cor:'prata', tecnica:'biojoia',
    categoria:'Acessórios', artesaos:['raimunda'],
    fotos:['Art/Raimunda/RAI_9817.jpg'] },

  /* ---------- ROSALIA — biojoias ---------- */
  { id:'brinco-vermelho-resina', nome:'Brinco vermelho em resina', tipo:'brinco', cor:'vermelho', tecnica:'biojoia',
    categoria:'Acessórios', artesaos:['rosalia'],
    fotos:['Art/Rosalia/RAI_0020.jpg','Art/Rosalia/RAI_0017.jpg'] },

  { id:'brinco-madeira-pedra', nome:'Brinco em madeira e pedra natural', tipo:'brinco', cor:'marrom', tecnica:'biojoia',
    categoria:'Acessórios', artesaos:['rosalia'],
    fotos:['Art/Rosalia/RAI_9587.jpg'] },

  { id:'brinco-contas-vermelhas', nome:'Brinco de contas vermelhas e bege', tipo:'brinco', cor:'vermelho', tecnica:'biojoia',
    categoria:'Acessórios', artesaos:['rosalia'],
    fotos:['Art/Rosalia/RAI_9960.jpg','Art/Oveide/RAI_9952.jpg','Art/Oveide/RAI_9964.jpg','Art/Oveide/RAI_9969.jpg'] }
];

/* --------------------------------------------------------------------------
   Derivados e utilitários
   -------------------------------------------------------------------------- */

PRODUTOS.forEach(function (p) {
  /* `fotos` guarda a referência em cada pasta de artesão creditado, então o
     mesmo arquivo aparece mais de uma vez (Dani/RAI_9712.jpg e
     Girlene/RAI_9712.jpg são a mesma imagem). `galeria` é o que se mostra:
     uma entrada por foto real, sem repetição, na ordem original. */
  p.galeria = (function () {
    var vistos = {}, unicas = [];
    p.fotos.forEach(function (f) {
      var arquivo = f.split('/').pop();
      if (vistos[arquivo]) return;
      vistos[arquivo] = true;
      unicas.push(f);
    });
    return unicas;
  })();

  /* Primeira foto da lista é a capa escolhida (o melhor enquadramento). */
  p.capa = p.galeria[0];
  p.artesaosNomes = p.artesaos.map(function (id) {
    var a = ARTESAOS.filter(function (x) { return x.id === id; })[0];
    return a ? a.nome : id;
  });
  /* Texto único usado pela busca — acentos removidos para tolerar digitação. */
  p.busca = normalizar([
    p.nome, p.tipo, p.cor, p.tecnica, p.categoria,
    p.artesaosNomes.join(' ')
  ].join(' '));
});

/* --------------------------------------------------------------------------
   Versões web das fotos

   Os arquivos em /Art são os originais de estúdio — 6,8 MB em média, alguns
   passam de 16 MB. Nunca devem ir para o navegador. `otimizar_imagens.py`
   gera duas reduções espelhando a estrutura de pastas:

     Art/Dani/RAI_9714.jpg -> web/card/Dani/RAI_9714.jpg   (800px, grades)
                           -> web/full/Dani/RAI_9714.jpg  (1600px, galeria)

   Rode o script de novo depois de acrescentar fotos em /Art.
   Estas funções já devolvem o caminho pronto para usar em src/url() — não
   passe o resultado por outro escape.
   -------------------------------------------------------------------------- */
function fotoWeb(caminho, tamanho) {
  var relativo = String(caminho)
    .replace(/^Art\//, '')
    .replace(/\.(jpe?g|png|webp)$/i, '.webp');
  return encodeURI('web/' + tamanho + '/' + relativo)
    .replace(/'/g, '%27').replace(/\(/g, '%28')
    .replace(/\)/g, '%29').replace(/&/g, '%26');
}
function fotoCard(caminho) { return fotoWeb(caminho, 'card'); }
function fotoFull(caminho) { return fotoWeb(caminho, 'full'); }

function normalizar(s) {
  return (s || '').toLowerCase()
    .replace(/[áàâã]/g, 'a').replace(/[éê]/g, 'e').replace(/í/g, 'i')
    .replace(/[óôõ]/g, 'o').replace(/ú/g, 'u').replace(/ç/g, 'c');
}

/* Peças de um artesão, na ordem em que aparecem no catálogo. */
function produtosDoArtesao(idArtesao) {
  return PRODUTOS.filter(function (p) {
    return p.artesaos.indexOf(idArtesao) !== -1;
  });
}

/* Busca livre: casa por peça, cor, tipo, técnica ou nome do artesão. */
function buscarProdutos(termo) {
  var q = normalizar(termo).trim();
  if (!q) return [];
  var termos = q.split(/\s+/);
  return PRODUTOS.filter(function (p) {
    return termos.every(function (t) { return p.busca.indexOf(t) !== -1; });
  });
}

/* ==========================================================================
   AJUSTES DO ADMIN (nome da peça e WhatsApp de atendimento)

   Vêm da API (backend/). O que está acima neste arquivo é o acervo fixo, que
   casa com os arquivos de /Art. Se a API estiver fora do ar, o site funciona
   normalmente com os nomes daqui e o número padrão da marca.
   ========================================================================== */

/* Em produção, sirva a API no mesmo domínio sob /api e isto funciona sem
   mudança. Em desenvolvimento o site roda na 8000 e a API na 3000. */
/* O teste de `location` é protegido porque este arquivo também é lido fora do
   navegador (o seed do backend usa ARTESAOS/PRODUTOS daqui). */
var API_AJUSTES = (typeof location !== 'undefined' &&
                   (location.hostname === '127.0.0.1' || location.hostname === 'localhost'))
  ? 'http://127.0.0.1:3000/api/ajustes'
  : '/api/ajustes';

/* Usado só quando nem a peça nem os artesãos creditados têm número. */
var WHATSAPP_PADRAO = '5589981291404';

var _ouvintesCatalogo = [];

/* Registra algo para rodar de novo quando os ajustes chegarem da API. */
function aoAtualizarCatalogo(fn) { _ouvintesCatalogo.push(fn); }

/* Para qual número vai o pedido desta peça:
   1. exceção cadastrada na própria peça
   2. artesão definido como quem atende
   3. primeiro artesão creditado que tenha número
   4. número padrão da marca */
function whatsappDaPeca(p) {
  if (p.whatsapp) return p.whatsapp;

  var ordem = [];
  if (p.artesaoContato) ordem.push(p.artesaoContato);
  p.artesaos.forEach(function (id) { if (ordem.indexOf(id) === -1) ordem.push(id); });

  for (var i = 0; i < ordem.length; i++) {
    var a = ARTESAOS.filter(function (x) { return x.id === ordem[i]; })[0];
    if (a && a.whatsapp) return a.whatsapp;
  }
  return WHATSAPP_PADRAO;
}

/* Nome de quem vai atender o pedido (para o texto da mensagem). */
function atendenteDaPeca(p) {
  var id = p.artesaoContato || p.artesaos[0];
  var a = ARTESAOS.filter(function (x) { return x.id === id; })[0];
  return a ? a.nome : p.artesaosNomes[0];
}

/* Sobrepõe os dados da API ao catálogo em memória. */
function aplicarAjustes(dados) {
  if (!dados) return;

  if (dados.artesaos) {
    ARTESAOS.forEach(function (a) {
      var ajuste = dados.artesaos[a.id];
      if (ajuste && ajuste.whatsapp) a.whatsapp = ajuste.whatsapp;
    });
  }

  if (dados.pecas) {
    PRODUTOS.forEach(function (p) {
      var ajuste = dados.pecas[p.id];
      if (!ajuste) return;
      if (ajuste.nome && ajuste.nome !== p.nome) {
        p.nome = ajuste.nome;
        /* o índice de busca precisa acompanhar o nome novo */
        p.busca = normalizar([
          p.nome, p.tipo, p.cor, p.tecnica, p.categoria, p.artesaosNomes.join(' ')
        ].join(' '));
      }
      if (ajuste.whatsapp) p.whatsapp = ajuste.whatsapp;
      if (ajuste.artesaoContato) p.artesaoContato = ajuste.artesaoContato;
    });
  }
}

/* Busca os ajustes e avisa quem estiver ouvindo. Nunca rejeita: se a API não
   responder, o site segue com o catálogo local. */
function carregarAjustes() {
  if (typeof fetch !== 'function') return Promise.resolve(false);

  return fetch(API_AJUSTES, { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (dados) {
      if (!dados) return false;
      aplicarAjustes(dados);
      _ouvintesCatalogo.forEach(function (fn) {
        try { fn(); } catch (e) { /* um ouvinte com erro não derruba os outros */ }
      });
      return true;
    })
    .catch(function () { return false; });
}
