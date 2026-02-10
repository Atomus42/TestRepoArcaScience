import { cpSync, mkdirSync, copyFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

// Create public directory structure
mkdirSync('public/dist', { recursive: true });
mkdirSync('public/fonts', { recursive: true });
mkdirSync('public/images', { recursive: true });
mkdirSync('public/downloads', { recursive: true });

// Copy built assets (JS/CSS)
for (const f of readdirSync('dist')) {
  if (f.endsWith('.js') || f.endsWith('.css')) {
    copyFileSync(`dist/${f}`, `public/dist/${f}`);
  }
}

// Copy fonts
if (existsSync('assets/fonts')) {
  for (const f of readdirSync('assets/fonts')) {
    copyFileSync(`assets/fonts/${f}`, `public/fonts/${f}`);
  }
}

// Recursively copy images
function copyDirRecursive(src, dest) {
  if (!existsSync(src)) return;
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

copyDirRecursive('assets/images', 'public/images');
copyDirRecursive('assets/downloads', 'public/downloads');

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
