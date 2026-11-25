#!/usr/bin/env python3
"""Remplace l'adresse provisoire du site par la vraie adresse (GitHub Pages) dans tous les fichiers.
Utilisation : python tools/set-url.py https://VOTRE-PSEUDO.github.io/NOM-DU-DEPOT/
(Python 3 suffit, aucune installation supplémentaire.)"""
import sys,os
OLD="https://VOTRE-NOM.github.io/purification-biomolecules/"
if len(sys.argv)<2:
    print(__doc__);sys.exit(1)
new=sys.argv[1].strip()
if not new.startswith("http"):print("L'adresse doit commencer par https://");sys.exit(1)
if not new.endswith("/"):new+="/"
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
files=["index.html","sitemap.xml","robots.txt","js/config.js","README.md","GUIDE-PUBLICATION.md","PARTAGE-RESEAUX.md"]
n=0
for f in files:
    p=os.path.join(root,f)
    if not os.path.exists(p):continue
    t=open(p,encoding="utf-8").read()
    if OLD in t:
        open(p,"w",encoding="utf-8").write(t.replace(OLD,new));n+=1;print("mis à jour :",f)
print(n,"fichier(s) modifié(s). Adresse du site :",new)
print("Pensez ensuite à régénérer le code QR (tools/qr-generator.html) pour Word, PowerPoint et les PDF.")
