const fs = require('fs');
const path = require('path');

const nested = path.join(
  'node_modules',
  '@epubjs-react-native',
  'expo-file-system',
  'node_modules',
  'expo-file-system'
);

if (!fs.existsSync(nested)) {
  process.exit(0);
}

const real = fs.realpathSync(nested);
const root = fs.realpathSync('node_modules');
const insideInstall = real.toLowerCase().startsWith(`${root.toLowerCase()}${path.sep}`);

if (insideInstall) {
  fs.rmSync(nested, { recursive: true, force: true });
}
