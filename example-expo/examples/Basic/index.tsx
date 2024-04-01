import * as React from 'react';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import { Reader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';

export function Basic() {
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView>
      <Reader
        src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
        width={width}
        height={height}
        fileSystem={useFileSystem}
      />
    </SafeAreaView>
  );
}
