import { cpSync, mkdirSync, copyFileSync, readdirSync, existsSync } from 'fs';

// Create public directory structure
mkdirSync('public/dist', { recursive: true });
mkdirSync('public/fonts', { recursive: true });

// Copy built assets
for (const f of readdirSync('dist')) {
  if (f.endsWith('.js') || f.endsWith('.css')) {
    copyFileSync(`dist/${f}`, `public/dist/${f}`);
  }
}

// Copy HTML pages — homepage becomes index.html
for (const f of readdirSync('webflow-pages')) {
  if (!f.endsWith('.html')) continue;
  if (f === 'homepage.html') {
    copyFileSync(`webflow-pages/${f}`, `public/index.html`);
  } else {
    // Strip .html for clean URLs: about.html -> about/index.html
    const name = f.replace('.html', '');
    mkdirSync(`public/${name}`, { recursive: true });
    copyFileSync(`webflow-pages/${f}`, `public/${name}/index.html`);
  }
}

// Copy Netlify _redirects
if (existsSync('_redirects')) {
  copyFileSync('_redirects', 'public/_redirects');
}

console.log('Site built to public/');
