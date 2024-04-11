import * as React from 'react';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import { Reader, ReaderProvider } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';

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
          onPress={() => console.log('onPress')}
          onSingleTap={() => console.log('onSingleTap')}
          onDoublePress={() => console.log('onDoublePress')}
          onDoubleTap={() => console.log('onDoubleTap')}
          onLongPress={() => console.log('onLongPress')}
          onSwipeLeft={() => console.log('onSwipeLeft')}
          onSwipeRight={() => console.log('onSwipeRight')}
          onSwipeUp={() => console.log('onSwipeUp')}
          onSwipeDown={() => console.log('onSwipeDown')}
        />
      </ReaderProvider>
    </SafeAreaView>
  );
}
