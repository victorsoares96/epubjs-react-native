import * as React from 'react';
import { Reader, ReaderProvider } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';

export function Basic() {
  return (
    <ReaderProvider>
      <Reader
        src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
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
  );
}
