import * as React from 'react';
import { Linking, SafeAreaView, useWindowDimensions } from 'react-native';
import { Reader, ReaderProvider } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';

export function OpenExternalLink() {
  const { width, height } = useWindowDimensions();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ReaderProvider>
        <Reader
          src="https://github.com/IDPF/epub3-samples/releases/download/20230704/accessible_epub_3.epub"
          width={width}
          height={height}
          fileSystem={useFileSystem}
          initialLocation="pr01s04.xhtml"
          onPressExternalLink={(url) => {
            Linking.openURL(url);
          }}
        />
      </ReaderProvider>
    </SafeAreaView>
  );
}
