const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔨 Building Product Widget as Web Component...\n');

// Step 1: Build the Angular app
console.log('📦 Building Angular application...');
execSync('ng build --configuration production', { stdio: 'inherit' });

// Step 2: Concatenate JS files
console.log('\n📄 Concatenating JavaScript files...');

const distPath = path.join(__dirname, 'dist', 'product-widget', 'browser');
const outputPath = path.join(__dirname, 'dist', 'product-widget');

// Read all JS files in order
const jsFiles = fs.readdirSync(distPath)
    .filter(file => file.endsWith('.js'))
    .sort((a, b) => {
        // polyfills first, then main
        if (a.includes('polyfills')) return -1;
        if (b.includes('polyfills')) return 1;
        if (a.includes('main')) return 1;
        if (b.includes('main')) return -1;
        return 0;
    });

console.log('  Found JS files:', jsFiles);

// Concatenate all JS files
let concatenatedJs = '// Product Widget - Web Component Bundle\n';
concatenatedJs += '// Generated on: ' + new Date().toISOString() + '\n\n';
concatenatedJs += 'window.__PRODUCT_WIDGET_PRODUCTION__ = true;\n\n';

for (const file of jsFiles) {
    const content = fs.readFileSync(path.join(distPath, file), 'utf8');
    concatenatedJs += `\n// --- ${file} ---\n${content}\n`;
}

// Write concatenated JS
const outputJsPath = path.join(outputPath, 'product-widget.js');
fs.writeFileSync(outputJsPath, concatenatedJs);
console.log('  ✅ Created:', outputJsPath);

// Step 3: Copy CSS
console.log('\n🎨 Copying styles...');
const cssFiles = fs.readdirSync(distPath).filter(file => file.endsWith('.css'));
if (cssFiles.length > 0) {
    let concatenatedCss = '/* Product Widget Styles */\n';
    for (const file of cssFiles) {
        const content = fs.readFileSync(path.join(distPath, file), 'utf8');
        concatenatedCss += content + '\n';
    }
    fs.writeFileSync(path.join(outputPath, 'product-widget.css'), concatenatedCss);
    console.log('  ✅ Created: product-widget.css');
}

// Step 4: Copy assets
console.log('\n📁 Copying assets...');
const assetsSource = path.join(distPath, 'assets');
const assetsTarget = path.join(outputPath, 'assets');

if (fs.existsSync(assetsSource)) {
    fs.cpSync(assetsSource, assetsTarget, { recursive: true });
    console.log('  ✅ Copied assets folder');
}

// Step 5: Create a simple loader HTML for testing
const loaderHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Widget - Test Page</title>
  <link rel="stylesheet" href="product-widget.css">
  <style>
    body { margin: 0; padding: 0; }
  </style>
</head>
<body>
  <!-- The Product Widget Custom Element -->
  <product-widget></product-widget>
  
  <!-- Load the widget bundle -->
  <script src="product-widget.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(outputPath, 'test.html'), loaderHtml);
console.log('  ✅ Created: test.html');

console.log('\n✨ Build complete!');
console.log('\n📦 Output files:');
console.log('   - dist/product-widget/product-widget.js');
console.log('   - dist/product-widget/product-widget.css');
console.log('   - dist/product-widget/assets/');
console.log('   - dist/product-widget/test.html');
console.log('\n🚀 To test: open dist/product-widget/test.html in a browser');
console.log('📤 To deploy: upload the dist/product-widget folder to your Artifactory');
