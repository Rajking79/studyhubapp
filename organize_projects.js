const fs = require('fs');
const path = require('path');

const root = 'd:/studyhubapp';

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === '.dart_tool') {
      continue;
    }

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('📦 Syncing Admin Panel to studyhub_admin_panel...');
copyDirRecursive(path.join(root, 'admin'), path.join(root, 'studyhub_admin_panel'));

console.log('📦 Syncing Backend Server to studyhub_backend_server...');
copyDirRecursive(path.join(root, 'backend'), path.join(root, 'studyhub_backend_server'));

console.log('📦 Syncing Mobile App files to studyhub_mobile_app...');
const mobileFiles = ['lib', 'android', 'ios', 'web', 'windows', 'macos', 'linux', 'pubspec.yaml', 'pubspec.lock', 'studyhubapp.iml'];
for (let f of mobileFiles) {
  const src = path.join(root, f);
  const dest = path.join(root, 'studyhub_mobile_app', f);
  if (fs.existsSync(src)) {
    if (fs.statSync(src).isDirectory()) {
      copyDirRecursive(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}

// Create README.md for each standalone repository
fs.writeFileSync(path.join(root, 'studyhub_admin_panel', 'README.md'), `# StudyHub Admin Control Panel\n\nReact + Tailwind CSS v4 + Chakra UI Admin Web Panel.\n\n## Run Locally\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n`);

fs.writeFileSync(path.join(root, 'studyhub_backend_server', 'README.md'), `# StudyHub Backend REST API Server\n\nNode.js + Express Server + Postman Collection + Real-time Sync DataStore.\n\n## Run Locally\n\`\`\`bash\nnpm install\nnode server.js\n\`\`\`\n`);

fs.writeFileSync(path.join(root, 'studyhub_mobile_app', 'README.md'), `# StudyHub Mobile App\n\nFlutter Mobile App for Android & iOS.\n\n## Run Locally\n\`\`\`bash\nflutter pub get\nflutter run\n\`\`\`\n`);

console.log('✅ All 3 Standalone Project Folders Organized Successfully!');
