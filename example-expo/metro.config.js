const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);
const appNodeModules = path.resolve(projectRoot, 'node_modules');

const pinnedPackages = [
  'react',
  'react-native',
  'react-native-reanimated',
  'react-native-gesture-handler',
  'react-native-worklets',
  'expo-file-system',
];

config.resolver.extraNodeModules = Object.fromEntries(
  pinnedPackages.map((pkg) => [pkg, path.resolve(appNodeModules, pkg)])
);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const pin = pinnedPackages.find(
    (pkg) => moduleName === pkg || moduleName.startsWith(`${pkg}/`)
  );

  if (pin) {
    return {
      type: 'sourceFile',
      filePath: require.resolve(moduleName, { paths: [projectRoot] }),
    };
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
