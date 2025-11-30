// build.js - Simple build script for Cloudflare Pages
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting Pemilos 2025 build process...');

// Create necessary directories if they don't exist
const directories = ['dist', 'dist/hasil', 'dist/css', 'dist/js', 'dist/components', 'dist/sections'];
directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
});

// Copy all HTML files and maintain structure
function copyFiles(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) return;
  
  const files = fs.readdirSync(sourceDir);
  
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      copyFiles(sourcePath, targetPath);
    } else if (file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.js') || file.endsWith('.json')) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`📄 Copied: ${sourcePath} → ${targetPath}`);
    }
  });
}

// Copy root files
const rootFiles = ['index.html', 'manifest.json', 'sw.js', 'robots.txt', 'sitemap.xml', '_redirects', '_headers'];
rootFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, `dist/${file}`);
    console.log(`📄 Copied: ${file} → dist/${file}`);
  }
});

// Copy directories
copyFiles('.', 'dist');

// Generate a simple build info file
const buildInfo = {
  buildTime: new Date().toISOString(),
  version: '1.0.0',
  environment: 'production'
};

fs.writeFileSync('dist/build-info.json', JSON.stringify(buildInfo, null, 2));
console.log('📝 Generated build-info.json');

console.log('✅ Build completed successfully!');
console.log('📦 Output directory: dist/');
