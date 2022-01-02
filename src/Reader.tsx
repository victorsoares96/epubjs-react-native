import React from 'react';
import { WebView } from 'react-native-webview';

export function Reader() {
  return <WebView source={{ uri: 'https://reactnative.dev/' }} />;
}
