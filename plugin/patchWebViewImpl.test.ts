import fs from 'fs';
import os from 'os';
import path from 'path';

const { patchWebViewImpl } = require('./patchWebViewImpl');

const ORIGINAL = `- (void)buildMenuWithBuilder:(id<UIMenuBuilder>)builder API_AVAILABLE(ios(13.0))  {
    if (@available(iOS 16.0, *)) {
      if(self.menuItems){
        [builder removeMenuForIdentifier:UIMenuLookup];
      }
    }
    [super buildMenuWithBuilder:builder];
}`;

describe('patchWebViewImpl', () => {
  it('strips iOS 16+ lookup/share/edit menus when suppressMenuItems is set', () => {
    const file = path.join(os.tmpdir(), `RNCWebViewImpl-${Date.now()}.m`);
    fs.writeFileSync(file, `header\n${ORIGINAL}\nfooter\n`);

    expect(patchWebViewImpl(file)).toBe(true);

    const patched = fs.readFileSync(file, 'utf8');
    expect(patched).toContain('self.suppressMenuItems.count > 0');
    expect(patched).toContain('UIMenuShare');
    expect(patched).toContain('UIMenuStandardEdit');
    expect(patched.indexOf('[super buildMenuWithBuilder:builder]')).toBeLessThan(
      patched.indexOf('UIMenuShare')
    );
    fs.unlinkSync(file);
  });
});
