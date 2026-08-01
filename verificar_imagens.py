import re, os, urllib.parse

arquivos = ['index.html','produto.html','busca.html','style.css','produto.css','busca.css']
falta = []

for f in arquivos:
    if not os.path.exists(f):
        continue
    t = open(f, encoding='utf-8', errors='ignore').read()
    # Remove HTML comments
    t = re.sub(r'<!--.*?-->', '', t, flags=re.DOTALL)
    achados  = re.findall(r'url\(\s*[\'"]?([^\'")]+)', t)
    achados += re.findall(r'<img[^>]+src=["\']([^"\']+)', t)
    for u in achados:
        u_clean = u.strip()
        if u_clean.startswith(('data:', 'http')) or "'" in u_clean or '+' in u_clean or '(' in u_clean or u_clean == 'p':
            continue
        p = urllib.parse.unquote(u_clean.lstrip('/'))
        if not os.path.exists(p):
            falta.append((f, p))

print('FALTANDO:', len(falta))
for x in falta:
    print('  ', x)
