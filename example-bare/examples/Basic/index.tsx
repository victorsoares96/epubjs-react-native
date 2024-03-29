import * as React from 'react';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import { Reader, ReaderProvider } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';

export function Basic() {
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView>
      <ReaderProvider>
        <Reader
          src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
          width={width}
          height={height}
          fileSystem={useFileSystem}
          onSwipeLeft={() => console.log('swipe left')}
          onSwipeRight={() => console.log('swipe right')}
        />
      </ReaderProvider>
    </SafeAreaView>
  );
}
