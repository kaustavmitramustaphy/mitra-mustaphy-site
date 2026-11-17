# The River and the Seal — Mitra Mustaphy family page

Static site (no build step). Deploy the whole folder to GitHub Pages, Netlify, Cloudflare Pages, etc.

## Adding pictures later
1. Drop images (jpg, png, webp, gif, avif) into `gallery/`.
   Name them like `Sripur_Durga_Puja_1998.jpg` — the file name becomes the caption.
2. Run `python3 update-gallery.py` (rebuilds `gallery/gallery.json`, newest first).
3. Re-deploy the folder. The Family Album at the bottom of the page renders them automatically.

Hosts that expose folder listings (e.g. `python3 -m http.server`, nginx autoindex) show new pictures even without step 2.
To override a caption, edit its entry in `gallery/gallery.json`; the script preserves custom captions.

Preview locally: `python3 -m http.server 8000` then open http://localhost:8000

© Somenath Mustaphy — somenathmustaphy@gmail.com
