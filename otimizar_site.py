"""
Gera as versões web das imagens de layout do site (fundos e logos).

As artes originais na raiz têm 2 a 4 MB cada — servir isso direto deixa a
página pesada. Este script cria as reduções em /img, que é o que o CSS e o
HTML referenciam.

É re-executável: só reprocessa o que mudou. Rode sempre que editar uma arte.

    python otimizar_site.py            # só o que está desatualizado
    python otimizar_site.py --forcar   # tudo de novo

Para as fotos das peças (/Art), o script é o outro: otimizar_imagens.py
"""

import os
import sys
from PIL import Image, ImageOps, ImageStat

RAIZ = os.path.dirname(os.path.abspath(__file__))
DESTINO = os.path.join(RAIZ, "img")

# (origem, destino, largura alvo, modo)
#   'foto'  -> JPEG progressivo, sem transparência (fundos)
#   'logo'  -> PNG com transparência, aparando a moldura vazia em volta
TRABALHOS = [
    ("Background-Serra Sem Pessoas.png",
     "img/bg-serra-sem-pessoas.jpg", 1920, "foto"),

    ("secretaria municipal da mulher.png",
     "img/logo-prefeitura-secretaria-mulher.png", 900, "logo"),

    # Coleção Serra Rupestre — a arte existe em duas composições:
    #   desktop: modelos à direita, área de texto à esquerda
    #   mobile:  modelos no topo, área de texto na metade de baixo
    ("Background-Serra 2 - Expandido 1920x820 202.png",
     "img/coll-serra-rupestre-desktop.jpg", 1920, "foto"),

    # A arte mobile já traz o texto da coleção embutido (título, olho e
    # parágrafo), por isso o texto em HTML fica oculto nesse breakpoint.
    ("Background-Serra 2 - Expandido 1920x820 02020.png",
     "img/coll-serra-rupestre-mobile.jpg", 900, "foto"),

    # Hero Mobile
    ("export (2).png",
     "img/hero-mobile.jpg", 1080, "foto"),
]

QUALIDADE_JPEG = 84


def converter_foto(origem, destino, largura):
    with Image.open(origem) as im:
        im = ImageOps.exif_transpose(im).convert("RGB")
        if im.width > largura:
            im = im.resize((largura, round(largura * im.height / im.width)), Image.LANCZOS)
        im.save(destino, "JPEG", quality=QUALIDADE_JPEG, optimize=True, progressive=True)


def converter_logo(origem, destino, largura):
    """Apara a transparência em volta antes de redimensionar: o arquivo da
    Prefeitura tem ~74% da altura em moldura vazia, o que faz o navegador
    reservar uma caixa muito maior que o logo."""
    with Image.open(origem) as im:
        im = im.convert("RGBA")
        caixa = im.getchannel("A").getbbox()
        logo = im.crop(caixa) if caixa else im

        margem = max(1, int(logo.height * 0.06))
        tela = Image.new("RGBA", (logo.width + margem * 2, logo.height + margem * 2), (0, 0, 0, 0))
        tela.paste(logo, (margem, margem))

        if tela.width > largura:
            tela = tela.resize((largura, round(largura * tela.height / tela.width)), Image.LANCZOS)
        tela.save(destino, "PNG", optimize=True)


def luminancia_relativa(rgb):
    def canal(v):
        v /= 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = [canal(x) for x in rgb]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contraste(a, b):
    la, lb = luminancia_relativa(a), luminancia_relativa(b)
    return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)


def relatorio_contraste(caminho):
    """Um fundo mais escuro derruba o contraste do texto por cima. Mede por
    faixa horizontal para avisar se alguma região ficou crítica."""
    TINTA = (0x2E, 0x20, 0x15)      # cor do texto das seções
    with Image.open(caminho) as im:
        im = im.convert("RGB")
        faixas = [("topo", 0.0, 0.34), ("meio", 0.34, 0.67), ("base", 0.67, 1.0)]
        print("    contraste do texto #2E2015 por faixa:")
        pior = 99.0
        for nome, a, b in faixas:
            corte = im.crop((0, int(im.height * a), im.width, int(im.height * b)))
            media = tuple(round(x) for x in ImageStat.Stat(corte).mean)
            r = contraste(TINTA, media)
            pior = min(pior, r)
            print("      %-5s #%02X%02X%02X  %5.1f:1" % (nome, *media, r))
        if pior < 4.5:
            print("      AVISO: faixa abaixo de 4.5:1 — o texto pode ficar ilegível ali.")


def main():
    forcar = "--forcar" in sys.argv
    os.makedirs(DESTINO, exist_ok=True)
    gerados = pulados = 0

    for rel_origem, rel_destino, largura, modo in TRABALHOS:
        origem = os.path.join(RAIZ, rel_origem)
        destino = os.path.join(RAIZ, rel_destino)

        if not os.path.exists(origem):
            print("FONTE AUSENTE:", rel_origem)
            continue

        atual = (not forcar and os.path.exists(destino)
                 and os.path.getmtime(destino) >= os.path.getmtime(origem))
        if atual:
            print("em dia:  %s" % rel_destino)
            pulados += 1
            continue

        if modo == "logo":
            converter_logo(origem, destino, largura)
        else:
            converter_foto(origem, destino, largura)
        gerados += 1

        antes = os.path.getsize(origem) / 1024
        depois = os.path.getsize(destino) / 1024
        with Image.open(destino) as im:
            dim = im.size
        print("gerado:  %s  %dx%d  %.0f KB (de %.0f KB, -%.0f%%)"
              % (rel_destino, dim[0], dim[1], depois, antes, 100 - depois * 100 / antes))

        if modo == "foto":
            relatorio_contraste(destino)

    print("\ngerados: %d | em dia: %d" % (gerados, pulados))


if __name__ == "__main__":
    main()
