const fs = require('fs');

const BUILD_MENU_SIGNATURE =
  '- (void)buildMenuWithBuilder:(id<UIMenuBuilder>)builder API_AVAILABLE(ios(13.0))';

const PATCHED_MARKER = 'self.suppressMenuItems.count > 0';

const PATCHED_METHOD = `- (void)buildMenuWithBuilder:(id<UIMenuBuilder>)builder API_AVAILABLE(ios(13.0))  {
    [super buildMenuWithBuilder:builder];
    if (@available(iOS 16.0, *)) {
      if(self.menuItems || self.suppressMenuItems.count > 0){
        [builder removeMenuForIdentifier:UIMenuLookup];
        [builder removeMenuForIdentifier:UIMenuShare];
        [builder removeMenuForIdentifier:UIMenuStandardEdit];
        [builder removeMenuForIdentifier:UIMenuReplace];
      }
    }
}`;

function patchFailure(filePath, reason) {
  throw new Error(
    `Could not hide the iOS system selection menu. ${reason} (${filePath})`
  );
}

function patchWebViewImpl(filePath) {
  if (!fs.existsSync(filePath)) {
    patchFailure(
      filePath,
      'react-native-webview apple/RNCWebViewImpl.m was not found'
    );
  }

  const source = fs.readFileSync(filePath, 'utf8');
  if (source.includes(PATCHED_MARKER)) {
    return true;
  }

  const start = source.indexOf(BUILD_MENU_SIGNATURE);
  if (start === -1) {
    patchFailure(
      filePath,
      'buildMenuWithBuilder was not found, so this react-native-webview version is not supported'
    );
  }

  const end = source.indexOf('\n}', start);
  if (end === -1) {
    patchFailure(filePath, 'buildMenuWithBuilder has no method body to replace');
  }

  const next = `${source.slice(0, start)}${PATCHED_METHOD}${source.slice(end + 2)}`;
  fs.writeFileSync(filePath, next);
  return true;
}

module.exports = { patchWebViewImpl, PATCHED_MARKER };
