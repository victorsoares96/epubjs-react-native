import * as React from 'react';
import { Reader, ReaderProvider } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';

export function Basic() {
  return (
    <ReaderProvider>
      <Reader
        src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
        fileSystem={useFileSystem}
      />
    </ReaderProvider>
  );
}
