// ../../acceptance/ersatz-testing/src/mock.test.tsx

import * as React from 'react';
import { waitForWindow } from '@formidable-webview/ersatz-testing';
import { render } from '@testing-library/react-native';
import WebView, { WebViewProps } from 'react-native-webview';

function MyComponent({ source }: Pick<WebViewProps, 'source'>) {
  return (
    <WebView source={source} injectedJavaScript="window.awesomeGlobal = 1;" />
  );
}

describe('MyComponent', () => {
  it('should make awesomeGlobal available to window with value “1”', async () => {
    const window = await waitForWindow(
      render(<MyComponent source={{ html: '<div></div>' }} />)
    );
    expect(window.awesomeGlobal).toEqual(1);
  });
});
