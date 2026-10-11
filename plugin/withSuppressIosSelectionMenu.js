const { createRequire } = require('module');
const path = require('path');
const { patchWebViewImpl } = require('./patchWebViewImpl');

function loadWithDangerousMod() {
  const roots = [process.cwd(), path.join(__dirname, '..')];
  for (const root of roots) {
    try {
      return createRequire(path.join(root, 'package.json'))(
        '@expo/config-plugins'
      ).withDangerousMod;
    } catch (error) {
      // Keep looking from the app that is running prebuild.
    }
  }

  return require('expo/config-plugins').withDangerousMod;
}

const withDangerousMod = loadWithDangerousMod();

function withSuppressIosSelectionMenu(config) {
  return withDangerousMod(config, [
    'ios',
    async (modConfig) => {
      const impl = path.join(
        modConfig.modRequest.projectRoot,
        'node_modules/react-native-webview/apple/RNCWebViewImpl.m'
      );
      patchWebViewImpl(impl);
      return modConfig;
    },
  ]);
}

module.exports = withSuppressIosSelectionMenu;
module.exports.patchWebViewImpl = patchWebViewImpl;
