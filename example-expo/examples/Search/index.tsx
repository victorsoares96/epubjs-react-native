import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { Reader, ReaderProvider } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Header } from './Header';
import { SearchList } from './SearchList';

function Inner() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const searchListRef = React.useRef<BottomSheetModal>(null);
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Header onPressSearch={() => searchListRef.current?.present()} />

      <Reader
        src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
        height={height * 0.8}
        fileSystem={useFileSystem}
      />

      <SearchList
        ref={searchListRef}
        onClose={() => searchListRef.current?.dismiss()}
      />
    </GestureHandlerRootView>
  );
}

export function Search() {
  return (
    <ReaderProvider>
      <Inner />
    </ReaderProvider>
  );
}
