import fs from 'fs';
import path from 'path';

const filesToPatch = [
  path.join(process.cwd(), 'node_modules', 'vite', 'dist', 'node', 'chunks', 'node.js'),
  path.join(process.cwd(), 'node_modules', 'vite', 'dist', 'node', 'module-runner.js')
];

const targetPattern = /const postfixRE = \/\[\?#\]\.\*\$\/;|const postfixRE = \/\\?\.\*\$\|#\(\?\!\[\^\/\\\\\]\*\[\/\\\\\]\.\*\)\.\*\$\/;/;
const replacement = 'const postfixRE = /\\?.*$|#(?![^/\\\\]*[/\\\\].*).*$/;';

filesToPatch.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('const postfixRE = /[?#].*$/;')) {
      content = content.replace('const postfixRE = /[?#].*$/;', replacement);
      fs.writeFileSync(file, content, 'utf8');
      console.log(`[fix-vite] Successfully patched ${file}`);
    } else {
      console.log(`[fix-vite] Already patched or pattern not found in ${file}`);
    }
  }
});
