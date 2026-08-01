"""
Gera as versões web das fotos de /Art.

As originais têm em média 6,8 MB (algumas passam de 16 MB) — servir isso
direto no site deixa a vitrine e a troca de foto no hover lentíssimas.
Este script cria dois tamanhos e mantém a estrutura de pastas:

    Art/Dani/RAI_9714.jpg  ->  web/card/Dani/RAI_9714.jpg   (grade, hover, buscas)
                           ->  web/full/Dani/RAI_9714.jpg   (galeria da peça)

É re-executável: só reprocessa o que mudou. Rode depois de acrescentar
fotos novas em /Art.

    python otimizar_imagens.py
"""

import os
import sys
from PIL import Image, ImageOps

RAIZ = os.path.dirname(os.path.abspath(__file__))
ORIGEM = os.path.join(RAIZ, "Art")
DESTINO = os.path.join(RAIZ, "web")

# (subpasta, maior lado em px, qualidade webp)
TAMANHOS = [
    ("card", 800, 85),
    ("full", 1600, 88),
]

IGNORAR_PASTAS = {"repetidas"}
EXTENSOES = (".jpg", ".jpeg", ".png", ".webp")


def imagens():
    for pasta, subpastas, arquivos in os.walk(ORIGEM):
        subpastas[:] = [d for d in subpastas if d.lower() not in IGNORAR_PASTAS]
        for nome in arquivos:
            if nome.lower().endswith(EXTENSOES):
                caminho = os.path.join(pasta, nome)
                yield caminho, os.path.relpath(caminho, ORIGEM)


def converter(origem, destino, lado, qualidade):
    with Image.open(origem) as im:
        im = ImageOps.exif_transpose(im).convert("RGB")
        im.thumbnail((lado, lado), Image.LANCZOS)
        os.makedirs(os.path.dirname(destino), exist_ok=True)
        im.save(destino, "WEBP", quality=qualidade, method=6)


def main():
    forcar = "--forcar" in sys.argv
    total = gerados = pulados = 0
    bytes_orig = bytes_novos = 0

    for origem, relativo in imagens():
        total += 1
        bytes_orig += os.path.getsize(origem)
        base = os.path.splitext(relativo)[0] + ".webp"

        for sub, lado, qualidade in TAMANHOS:
            destino = os.path.join(DESTINO, sub, base)
            atual = (
                not forcar
                and os.path.exists(destino)
                and os.path.getmtime(destino) >= os.path.getmtime(origem)
            )
            if atual:
                pulados += 1
            else:
                try:
                    converter(origem, destino, lado, qualidade)
                    gerados += 1
                except Exception as erro:
                    print("ERRO em", relativo, "->", erro)
                    continue
            if sub == "card":
                bytes_novos += os.path.getsize(destino)

    mb = lambda b: "%.1f MB" % (b / 1048576)
    print("fotos encontradas: %d" % total)
    print("arquivos gerados:  %d (pulados por já estarem atuais: %d)" % (gerados, pulados))
    print("peso original:     %s" % mb(bytes_orig))
    print("peso em web/card:  %s" % mb(bytes_novos))
    if bytes_novos:
        print("redução:           %.0f%%" % (100 - bytes_novos * 100.0 / bytes_orig))


if __name__ == "__main__":
    main()
