const fs = require('fs');

const BUILD_MENU_SIGNATURE =
  '- (void)buildMenuWithBuilder:(id<UIMenuBuilder>)builder API_AVAILABLE(ios(13.0))';

const INSTALLED_MARKER = 'rnc_attachMenuSuppression';
const PREVIOUS_CLUSTER =
  '+ (Method)rnc_method:(SEL)selector implementedByClass:(Class)cls {';

const INTERFACE_NEEDLE = `@property (nonatomic, copy) NSArray<NSString *> * _Nullable suppressMenuItems;
#endif // !TARGET_OS_OSX
@end`;

const INTERFACE_PATCHED = `@property (nonatomic, copy) NSArray<NSString *> * _Nullable suppressMenuItems;
- (void)rnc_attachMenuSuppression;
#endif // !TARGET_OS_OSX
@end`;

const PREVIOUS_INTERFACE_METHOD =
  '+ (void)rnc_installSystemMenuSuppression;\n';
const ATTACH_INTERFACE_METHOD = '- (void)rnc_attachMenuSuppression;\n';

const SET_SUPPRESS_ORIGINAL = `-(void)setSuppressMenuItems:(NSArray<NSString *> *)suppressMenuItems {
    _suppressMenuItems = suppressMenuItems;
    _webView.suppressMenuItems = suppressMenuItems;
}`;

const PREVIOUS_SET_SUPPRESS = `-(void)setSuppressMenuItems:(NSArray<NSString *> *)suppressMenuItems {
    [RNCWKWebView rnc_installSystemMenuSuppression];
    _suppressMenuItems = suppressMenuItems;
    _webView.suppressMenuItems = suppressMenuItems;
    if (@available(iOS 18.0, *)) {
      if (suppressMenuItems.count > 0 && _webView != nil) {
        _webView.configuration.writingToolsBehavior = UIWritingToolsBehaviorNone;
      }
    }
}`;

const SET_SUPPRESS_PATCHED = `-(void)setSuppressMenuItems:(NSArray<NSString *> *)suppressMenuItems {
    _suppressMenuItems = suppressMenuItems;
    _webView.suppressMenuItems = suppressMenuItems;
    [_webView rnc_attachMenuSuppression];
    if (@available(iOS 18.0, *)) {
      if (suppressMenuItems.count > 0 && _webView != nil) {
        _webView.configuration.writingToolsBehavior = UIWritingToolsBehaviorNone;
      }
    }
}

- (void)webView:(WKWebView *)webView willPresentEditMenuWithAnimator:(id<UIEditMenuInteractionAnimating>)animator API_AVAILABLE(ios(16.4)) {
  if (![webView isKindOfClass:[RNCWKWebView class]]) {
    return;
  }
  RNCWKWebView *rncWebView = (RNCWKWebView *)webView;
  if (rncWebView.menuItems == nil && rncWebView.suppressMenuItems.count == 0) {
    return;
  }
  [rncWebView rnc_attachMenuSuppression];
  [rncWebView rnc_dismissSystemEditMenus];
  [animator addCompletion:^{
    [rncWebView rnc_dismissSystemEditMenus];
  }];
}`;

const WINDOW_NEEDLE = `    _webView.suppressMenuItems = _suppressMenuItems;
    _webView.scrollView.delegate = self;`;

const WINDOW_PATCHED = `    _webView.suppressMenuItems = _suppressMenuItems;
    [_webView rnc_attachMenuSuppression];
    _webView.scrollView.delegate = self;`;

const CONFIG_RETURN_NEEDLE = `  if (_applicationNameForUserAgent) {
    wkWebViewConfig.applicationNameForUserAgent = [NSString stringWithFormat:@"%@ %@", wkWebViewConfig.applicationNameForUserAgent, _applicationNameForUserAgent];
  }

  return wkWebViewConfig;
}`;

const CONFIG_RETURN_PATCHED = `  if (_applicationNameForUserAgent) {
    wkWebViewConfig.applicationNameForUserAgent = [NSString stringWithFormat:@"%@ %@", wkWebViewConfig.applicationNameForUserAgent, _applicationNameForUserAgent];
  }

  if (@available(iOS 18.0, *)) {
    if (_suppressMenuItems.count > 0) {
      wkWebViewConfig.writingToolsBehavior = UIWritingToolsBehaviorNone;
    }
  }

  return wkWebViewConfig;
}`;

const PREVIOUS_FILE_SCOPE = `#if !TARGET_OS_OSX
static IMP rnc_originalCanPerformIMP = NULL;
static SEL rnc_canPerformSelector = NULL;
#endif
`;

const FILE_SCOPE_STATE = `#if !TARGET_OS_OSX
static IMP rnc_originalEditMenuIMP = NULL;
static IMP rnc_originalPresentIMP = NULL;

static BOOL rnc_viewWantsSystemMenuHidden(id receiver) {
  UIView *view = [receiver isKindOfClass:[UIView class]] ? (UIView *)receiver : nil;
  while (view != nil) {
    if ([view isKindOfClass:[RNCWKWebView class]]) {
      RNCWKWebView *webView = (RNCWKWebView *)view;
      return webView.menuItems != nil || webView.suppressMenuItems.count > 0;
    }
    view = view.superview;
  }
  return NO;
}

static UIMenu *rnc_suppressedEditMenu(id receiver, SEL selector, id interaction, id configuration, id suggestedActions) {
  (void)interaction;
  (void)configuration;
  (void)suggestedActions;
  if (rnc_viewWantsSystemMenuHidden(receiver)) {
    return [UIMenu menuWithTitle:@"" children:@[]];
  }
  if (rnc_originalEditMenuIMP != NULL && rnc_originalEditMenuIMP != (IMP)rnc_suppressedEditMenu) {
    return ((UIMenu *(*)(id, SEL, id, id, id))rnc_originalEditMenuIMP)(receiver, selector, interaction, configuration, suggestedActions);
  }
  return nil;
}

static void rnc_suppressedPresent(id receiver, SEL selector, id configuration) {
  UIView *view = nil;
  if (@available(iOS 16.0, *)) {
    if ([receiver isKindOfClass:[UIEditMenuInteraction class]]) {
      view = ((UIEditMenuInteraction *)receiver).view;
    }
  }
  if (view != nil && rnc_viewWantsSystemMenuHidden(view)) {
    return;
  }
  if (rnc_originalPresentIMP != NULL && rnc_originalPresentIMP != (IMP)rnc_suppressedPresent) {
    ((void (*)(id, SEL, id))rnc_originalPresentIMP)(receiver, selector, configuration);
  }
}
#endif

`;

const SUPPRESSION_METHODS = `+ (void)rnc_installPresentMenuSuppression {
  if (@available(iOS 16.0, *)) {
    SEL selector = @selector(presentEditMenuWithConfiguration:);
    Method method = class_getInstanceMethod([UIEditMenuInteraction class], selector);
    if (method == NULL) {
      return;
    }
    IMP current = method_getImplementation(method);
    if (current == (IMP)rnc_suppressedPresent) {
      return;
    }
    rnc_originalPresentIMP = current;
    method_setImplementation(method, (IMP)rnc_suppressedPresent);
  }
}

+ (void)rnc_swizzleEditMenuOnClass:(Class)contentClass {
  if (contentClass == Nil) {
    return;
  }
  if (@available(iOS 16.0, *)) {
    SEL selector = @selector(editMenuInteraction:menuForConfiguration:suggestedActions:);
    Method method = class_getInstanceMethod(contentClass, selector);
    if (method == NULL) {
      return;
    }
    IMP current = method_getImplementation(method);
    if (current == (IMP)rnc_suppressedEditMenu) {
      return;
    }
    rnc_originalEditMenuIMP = current;
    method_setImplementation(method, (IMP)rnc_suppressedEditMenu);
  }
}

- (NSArray<UIView *> *)rnc_contentViews {
  NSMutableArray<UIView *> *matches = [NSMutableArray array];
  for (UIView *view in self.scrollView.subviews) {
    if ([NSStringFromClass(object_getClass(view)) containsString:@"WKContent"]) {
      [matches addObject:view];
      continue;
    }
    for (UIView *child in view.subviews) {
      if ([NSStringFromClass(object_getClass(child)) containsString:@"WKContent"]) {
        [matches addObject:child];
      }
    }
  }
  return matches;
}

- (void)rnc_dismissSystemEditMenus {
  if (@available(iOS 16.0, *)) {
    NSMutableArray<UIView *> *views = [NSMutableArray arrayWithArray:[self rnc_contentViews]];
    [views addObject:self];
    for (UIView *view in views) {
      for (id<UIInteraction> interaction in view.interactions) {
        if ([interaction isKindOfClass:[UIEditMenuInteraction class]]) {
          [(UIEditMenuInteraction *)interaction dismissMenu];
        }
      }
    }
  }
}

- (void)rnc_attachMenuSuppression {
  if (self.menuItems == nil && self.suppressMenuItems.count == 0) {
    return;
  }
  [RNCWKWebView rnc_installPresentMenuSuppression];
  for (UIView *view in [self rnc_contentViews]) {
    [RNCWKWebView rnc_swizzleEditMenuOnClass:object_getClass(view)];
  }
}

- (void)layoutSubviews {
  [super layoutSubviews];
  [self rnc_attachMenuSuppression];
}

- (void)buildMenuWithBuilder:(id<UIMenuBuilder>)builder API_AVAILABLE(ios(13.0))  {
    [super buildMenuWithBuilder:builder];
    if (@available(iOS 16.0, *)) {
      if (self.menuItems != nil || self.suppressMenuItems.count > 0) {
        [builder replaceChildrenOfMenuForIdentifier:UIMenuRoot
                                fromChildrenBlock:^NSArray<UIMenuElement *> *(NSArray<UIMenuElement *> *children) {
          (void)children;
          return @[];
        }];
      }
    }
}`;

function patchFailure(filePath, reason) {
  throw new Error(
    `Could not hide the iOS system selection menu. ${reason} (${filePath})`
  );
}

function findMethodEnd(source, signatureStart) {
  const open = source.indexOf('{', signatureStart);
  if (open === -1) {
    return -1;
  }

  let depth = 0;
  for (let index = open; index < source.length; index += 1) {
    const character = source[index];
    if (character === '{') {
      depth += 1;
    } else if (character === '}') {
      depth -= 1;
      if (depth === 0) {
        return index + 1;
      }
    }
  }

  return -1;
}

function replaceOnce(source, needle, replacement, filePath, reason) {
  const start = source.indexOf(needle);
  if (start === -1) {
    patchFailure(filePath, reason);
  }
  if (source.indexOf(needle, start + needle.length) !== -1) {
    patchFailure(filePath, `${reason} (matched more than once)`);
  }
  return `${source.slice(0, start)}${replacement}${source.slice(start + needle.length)}`;
}

function insertFileScope(source, filePath) {
  if (source.includes('static UIMenu *rnc_suppressedEditMenu')) {
    return source;
  }
  if (source.includes(PREVIOUS_FILE_SCOPE)) {
    return source.replace(PREVIOUS_FILE_SCOPE, FILE_SCOPE_STATE);
  }
  const implementationStart = source.indexOf('@implementation RNCWKWebView');
  if (implementationStart === -1) {
    patchFailure(filePath, 'RNCWKWebView implementation was not found');
  }
  return `${source.slice(0, implementationStart)}${FILE_SCOPE_STATE}${source.slice(implementationStart)}`;
}

function applySharedHooks(source, filePath) {
  if (source.includes(PREVIOUS_INTERFACE_METHOD)) {
    source = source.replace(PREVIOUS_INTERFACE_METHOD, ATTACH_INTERFACE_METHOD);
  } else if (
    source.includes(INTERFACE_NEEDLE) &&
    !source.includes(ATTACH_INTERFACE_METHOD)
  ) {
    source = replaceOnce(
      source,
      INTERFACE_NEEDLE,
      INTERFACE_PATCHED,
      filePath,
      'RNCWKWebView interface was not found'
    );
  }

  if (source.includes(PREVIOUS_SET_SUPPRESS)) {
    source = source.replace(PREVIOUS_SET_SUPPRESS, SET_SUPPRESS_PATCHED);
  }

  if (
    source.includes(WINDOW_NEEDLE) &&
    !source.includes(WINDOW_PATCHED)
  ) {
    source = source.replace(WINDOW_NEEDLE, WINDOW_PATCHED);
  }

  if (
    source.includes(CONFIG_RETURN_NEEDLE) &&
    !source.includes('wkWebViewConfig.writingToolsBehavior')
  ) {
    source = replaceOnce(
      source,
      CONFIG_RETURN_NEEDLE,
      CONFIG_RETURN_PATCHED,
      filePath,
      'WKWebView configuration setup was not found'
    );
  }

  return insertFileScope(source, filePath);
}

function patchWebViewImpl(filePath) {
  if (!fs.existsSync(filePath)) {
    patchFailure(
      filePath,
      'react-native-webview apple/RNCWebViewImpl.m was not found'
    );
  }

  let source = fs.readFileSync(filePath, 'utf8');
  if (source.includes(INSTALLED_MARKER)) {
    return true;
  }

  if (source.includes(PREVIOUS_CLUSTER)) {
    const clusterStart = source.indexOf(PREVIOUS_CLUSTER);
    const signatureStart = source.indexOf(BUILD_MENU_SIGNATURE, clusterStart);
    const methodEnd = findMethodEnd(source, signatureStart);
    if (signatureStart === -1 || methodEnd === -1) {
      patchFailure(filePath, 'the previous menu patch could not be upgraded');
    }
    source = `${source.slice(0, clusterStart)}${SUPPRESSION_METHODS}${source.slice(methodEnd)}`;
    source = applySharedHooks(source, filePath);
    fs.writeFileSync(filePath, source);
    return true;
  }

  const signatureStart = source.indexOf(BUILD_MENU_SIGNATURE);
  if (signatureStart === -1) {
    patchFailure(
      filePath,
      'buildMenuWithBuilder was not found, so this react-native-webview version is not supported'
    );
  }

  const methodEnd = findMethodEnd(source, signatureStart);
  if (methodEnd === -1) {
    patchFailure(filePath, 'buildMenuWithBuilder has no method body to replace');
  }

  if (!source.includes(SET_SUPPRESS_ORIGINAL)) {
    patchFailure(
      filePath,
      'setSuppressMenuItems was not found, so this react-native-webview version is not supported'
    );
  }

  source = `${source.slice(0, signatureStart)}${SUPPRESSION_METHODS}${source.slice(methodEnd)}`;
  source = replaceOnce(
    source,
    SET_SUPPRESS_ORIGINAL,
    SET_SUPPRESS_PATCHED,
    filePath,
    'setSuppressMenuItems was not found, so this react-native-webview version is not supported'
  );
  source = applySharedHooks(source, filePath);
  fs.writeFileSync(filePath, source);
  return true;
}

module.exports = { patchWebViewImpl, INSTALLED_MARKER };
