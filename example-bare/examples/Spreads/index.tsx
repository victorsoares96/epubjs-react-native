import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { Reader, ReaderProvider } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';

export function Spreads() {
  return (
    <SafeAreaView>
      <ReaderProvider>
        <Reader
          src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
          fileSystem={useFileSystem}
          spread="always"
        />
      </ReaderProvider>
    </SafeAreaView>
  );
}
