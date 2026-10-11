/**
 * Injected into the book WebView on iOS when custom menuItems are present.
 * Suppresses the native callout and re-emits selection so the RN overlay can
 * reappear after handle drags and taps on an existing selection.
 */
export const SELECTION_MENU_BRIDGE_SCRIPT = `
(function () {
  try {
    if (typeof rendition === 'undefined' || !rendition) {
      true;
      return;
    }

    rendition.themes.default({
      'body': {
        '-webkit-touch-callout': 'none !important'
      },
      '*': {
        '-webkit-touch-callout': 'none !important'
      }
    });

    function postSelection(contents) {
      var sel = contents.window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
        reactNativeWebview.postMessage(JSON.stringify({ type: 'onSelectionCleared' }));
        return;
      }

      var range = sel.getRangeAt(0);
      var cfiRange = contents.cfiFromRange
        ? contents.cfiFromRange(range)
        : new ePub.CFI(range, contents.cfiBase).toString();
      var rect = null;
      if (typeof window.getSelectionRectInWebView === 'function') {
        rect = window.getSelectionRectInWebView(contents, range);
      }

      reactNativeWebview.postMessage(JSON.stringify({
        type: 'onSelected',
        cfiRange: cfiRange,
        text: range.toString(),
        rect: rect
      }));
    }

    function bindSelectionMenuBridge(contents) {
      if (!contents || !contents.document || contents.document.__rnSelectionMenuBound) {
        return;
      }

      contents.document.__rnSelectionMenuBound = true;

      if (contents.document.documentElement && contents.document.documentElement.style) {
        contents.document.documentElement.style.webkitTouchCallout = 'none';
      }
      if (contents.document.body && contents.document.body.style) {
        contents.document.body.style.webkitTouchCallout = 'none';
      }

      var style = contents.document.getElementById('rn-selection-menu-suppress');
      if (!style) {
        style = contents.document.createElement('style');
        style.id = 'rn-selection-menu-suppress';
        style.appendChild(
          contents.document.createTextNode(
            'html,body,*{-webkit-touch-callout:none !important;}'
          )
        );
        (contents.document.head || contents.document.documentElement).appendChild(style);
      }

      contents.document.addEventListener('contextmenu', function (event) {
        event.preventDefault();
      });

      contents.document.addEventListener('selectionchange', function () {
        var sel = contents.window.getSelection();
        if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
          reactNativeWebview.postMessage(JSON.stringify({ type: 'onSelectionCleared' }));
        }
      });

      contents.document.addEventListener('touchend', function () {
        setTimeout(function () {
          postSelection(contents);
        }, 0);
      }, { passive: true });
    }

    if (rendition.getContents) {
      rendition.getContents().forEach(bindSelectionMenuBridge);
    }

    if (
      !window.__rnSelectionMenuHookRegistered &&
      rendition.hooks &&
      rendition.hooks.content
    ) {
      window.__rnSelectionMenuHookRegistered = true;
      rendition.hooks.content.register(bindSelectionMenuBridge);
    }
  } catch (error) {}
  true;
})();
`;
