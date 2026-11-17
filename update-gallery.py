#!/usr/bin/env python3
"""Rebuild gallery/gallery.json from the pictures in the gallery/ folder.

Usage:  python3 update-gallery.py
Run it after adding pictures, then deploy the folder. Newest files come first.
Captions come from file names: Sripur_Durga_Puja_1998.jpg -> "Sripur Durga Puja 1998".
Existing custom captions in gallery.json are preserved.
"""
import json, os, re, sys

here = os.path.dirname(os.path.abspath(__file__))
gdir = os.path.join(here, "gallery")
out = os.path.join(gdir, "gallery.json")
exts = (".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif", ".svg")

old = {}
if os.path.exists(out):
    try:
        for x in json.load(open(out, encoding="utf-8")):
            if isinstance(x, dict) and x.get("caption"):
                old[x["src"]] = x["caption"]
    except Exception:
        pass

files = [f for f in os.listdir(gdir) if f.lower().endswith(exts)]
files.sort(key=lambda f: os.path.getmtime(os.path.join(gdir, f)), reverse=True)

items = []
for f in files:
    src = "gallery/" + f
    item = {"src": src}
    if src in old:
        item["caption"] = old[src]
    items.append(item)

with open(out, "w", encoding="utf-8") as fh:
    json.dump(items, fh, indent=2, ensure_ascii=False)
print(f"{len(items)} picture(s) listed in gallery/gallery.json")
