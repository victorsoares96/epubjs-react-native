module.exports = {
  '**/*.ts?(x)': () => [
    'npm run prettier:format',
    'npm run lint:fix',
    'npm run type-check',
  ],
};
