const path = require('path');
const fs = require('fs');

const lib = path.resolve(__dirname, '../lib');

['example-expo', 'example-bare'].forEach(example => {
  const libInExample = path.join(__dirname, '..', example, 'node_modules', '@epubjs-react-native', 'core', 'lib');
  fs.rmSync(libInExample, { recursive: true });
  fs.cpSync(lib, libInExample, { force: true, recursive: true });
});

console.log('DONE')
