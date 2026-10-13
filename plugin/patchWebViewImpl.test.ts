import fs from 'fs';
import os from 'os';
import path from 'path';

const { patchWebViewImpl } = require('./patchWebViewImpl');

const ORIGINAL = `@interface RNCWKWebView : WKWebView
#if !TARGET_OS_OSX
@property (nonatomic, copy) NSArray<NSDictionary *> * _Nullable menuItems;
@property (nonatomic, copy) NSArray<NSString *> * _Nullable suppressMenuItems;
#endif // !TARGET_OS_OSX
@end
@implementation RNCWKWebView
- (void)buildMenuWithBuilder:(id<UIMenuBuilder>)builder API_AVAILABLE(ios(13.0))  {
    if (@available(iOS 16.0, *)) {
      if(self.menuItems){
        [builder removeMenuForIdentifier:UIMenuLookup];
      }
    }
    [super buildMenuWithBuilder:builder];
}
@end

- (WKWebViewConfiguration *)setUpWkWebViewConfig
{
  if (_applicationNameForUserAgent) {
    wkWebViewConfig.applicationNameForUserAgent = [NSString stringWithFormat:@"%@ %@", wkWebViewConfig.applicationNameForUserAgent, _applicationNameForUserAgent];
  }

  return wkWebViewConfig;
}

-(void)setSuppressMenuItems:(NSArray<NSString *> *)suppressMenuItems {
    _suppressMenuItems = suppressMenuItems;
    _webView.suppressMenuItems = suppressMenuItems;
}`;

const PREVIOUS_PATCH = ORIGINAL.replace(
  `- (void)buildMenuWithBuilder:(id<UIMenuBuilder>)builder API_AVAILABLE(ios(13.0))  {
    if (@available(iOS 16.0, *)) {
      if(self.menuItems){
        [builder removeMenuForIdentifier:UIMenuLookup];
      }
    }
    [super buildMenuWithBuilder:builder];
}`,
  `- (void)buildMenuWithBuilder:(id<UIMenuBuilder>)builder API_AVAILABLE(ios(13.0))  {
    [super buildMenuWithBuilder:builder];
    if (@available(iOS 16.0, *)) {
      if(self.menuItems || self.suppressMenuItems.count > 0){
        [builder removeMenuForIdentifier:UIMenuLookup];
        [builder removeMenuForIdentifier:UIMenuShare];
        [builder removeMenuForIdentifier:UIMenuStandardEdit];
        [builder removeMenuForIdentifier:UIMenuReplace];
      }
    }
}`
);

function writeFixture(name: string, contents: string) {
  const file = path.join(os.tmpdir(), `RNCWebViewImpl-${Date.now()}-${name}.m`);
  fs.writeFileSync(file, contents);
  return file;
}

describe('patchWebViewImpl', () => {
  it('hides the WKContentView selection callout when suppressMenuItems is set', () => {
    const file = writeFixture('ok', ORIGINAL);

    expect(patchWebViewImpl(file)).toBe(true);

    const patched = fs.readFileSync(file, 'utf8');
    expect(patched).toContain('rnc_attachMenuSuppression');
    expect(patched).toContain('layoutSubviews');
    expect(patched).toContain('willPresentEditMenuWithAnimator:');
    expect(patched).toContain('presentEditMenuWithConfiguration:');
    expect(patched).toContain('static UIMenu *rnc_suppressedEditMenu');
    expect(patched).toContain('writingToolsBehavior = UIWritingToolsBehaviorNone');
    expect(patched).not.toContain('dispatch_once');

    expect(patchWebViewImpl(file)).toBe(true);
    expect(fs.readFileSync(file, 'utf8').match(/rnc_attachMenuSuppression/g)?.length).toBe(
      patched.match(/rnc_attachMenuSuppression/g)?.length
    );
    fs.unlinkSync(file);
  });

  it('upgrades the previous WKWebView-only menu removal', () => {
    const file = writeFixture('upgrade', PREVIOUS_PATCH);

    expect(patchWebViewImpl(file)).toBe(true);

    const patched = fs.readFileSync(file, 'utf8');
    expect(patched).toContain('presentEditMenuWithConfiguration:');
    expect(patched).toContain('static UIMenu *rnc_suppressedEditMenu');
    expect(patched).not.toContain('removeMenuForIdentifier:UIMenuShare');
    fs.unlinkSync(file);
  });

  it('upgrades the one-shot content-view swizzle', () => {
    const file = writeFixture(
      'dispatch-once',
      `#if !TARGET_OS_OSX
static IMP rnc_originalCanPerformIMP = NULL;
static SEL rnc_canPerformSelector = NULL;
#endif

@implementation RNCWKWebView
+ (Method)rnc_method:(SEL)selector implementedByClass:(Class)cls {
  return NULL;
}
- (void)buildMenuWithBuilder:(id<UIMenuBuilder>)builder API_AVAILABLE(ios(13.0))  {
    [super buildMenuWithBuilder:builder];
}
@end
`
    );

    expect(patchWebViewImpl(file)).toBe(true);

    const patched = fs.readFileSync(file, 'utf8');
    expect(patched).toContain('static UIMenu *rnc_suppressedEditMenu');
    expect(patched).toContain('- (void)layoutSubviews');
    expect(patched).not.toContain('rnc_originalCanPerformIMP');
    expect(patched).not.toContain('dispatch_once');
    fs.unlinkSync(file);
  });

  it('fails when RNCWebViewImpl.m is missing', () => {
    const file = path.join(os.tmpdir(), `missing-${Date.now()}.m`);

    expect(() => patchWebViewImpl(file)).toThrow(/was not found/);
  });

  it('fails when this WebView version has no buildMenuWithBuilder method', () => {
    const file = writeFixture('unknown', '/* unrelated webview source */\n');

    expect(() => patchWebViewImpl(file)).toThrow(/not supported/);
    fs.unlinkSync(file);
  });
});
