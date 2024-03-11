import * as React from 'react';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import { Reader, ReaderProvider } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';
import { styles } from './styles';

export function InitialLocation() {
  const { width, height } = useWindowDimensions();
  return (
    <ReaderProvider>
      <SafeAreaView style={styles.container}>
        <Reader
          src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
          width={width}
          height={height * 0.7}
          fileSystem={useFileSystem}
          initialLocation="introduction_001.xhtml"
        />
      </SafeAreaView>
    </ReaderProvider>
  );
}
