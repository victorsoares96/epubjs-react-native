const fs = require('fs');

const BUILD_MENU_SIGNATURE =
  '- (void)buildMenuWithBuilder:(id<UIMenuBuilder>)builder API_AVAILABLE(ios(13.0))';

const PATCHED_MARKER = 'self.suppressMenuItems.count > 0';

const PATCHED_METHOD = `- (void)buildMenuWithBuilder:(id<UIMenuBuilder>)builder API_AVAILABLE(ios(13.0))  {
    if (@available(iOS 16.0, *)) {
      if(self.menuItems || self.suppressMenuItems.count > 0){
        [builder removeMenuForIdentifier:UIMenuLookup];
        [builder removeMenuForIdentifier:UIMenuShare];
        [builder removeMenuForIdentifier:UIMenuStandardEdit];
        [builder removeMenuForIdentifier:UIMenuReplace];
      }
    }
    [super buildMenuWithBuilder:builder];
}`;

function patchWebViewImpl(filePath) {
  if (!fs.existsSync(filePath)) {
    return false;
  }

  const source = fs.readFileSync(filePath, 'utf8');
  if (source.includes(PATCHED_MARKER)) {
    return true;
  }

  const start = source.indexOf(BUILD_MENU_SIGNATURE);
  if (start === -1) {
    return false;
  }

  const end = source.indexOf('\n}', start);
  if (end === -1) {
    return false;
  }

  const next = `${source.slice(0, start)}${PATCHED_METHOD}${source.slice(end + 2)}`;
  fs.writeFileSync(filePath, next);
  return true;
}

module.exports = { patchWebViewImpl, PATCHED_MARKER };
