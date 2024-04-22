import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { Reader, ReaderProvider } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';

export function Basic() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ReaderProvider>
        <Reader
          src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
          fileSystem={useFileSystem}
        />
      </ReaderProvider>
    </SafeAreaView>
  );
}
