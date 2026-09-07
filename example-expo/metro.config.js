const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

config.resolver.extraNodeModules = {
  react: path.resolve(projectRoot, 'node_modules/react'),
  'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
  'react-native-reanimated': path.resolve(
    projectRoot,
    'node_modules/react-native-reanimated'
  ),
  'react-native-gesture-handler': path.resolve(
    projectRoot,
    'node_modules/react-native-gesture-handler'
  ),
  'react-native-worklets': path.resolve(
    projectRoot,
    'node_modules/react-native-worklets'
  ),
};

module.exports = config;
