import * as React from 'react';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import { Reader, ReaderProvider } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { styles } from './styles';
import { Header } from './Header';
import { SearchList } from './SeachList';

function Inner() {
  const { width, height } = useWindowDimensions();

  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <Header onPressSearch={() => bottomSheetRef.current.snapToIndex(0)} />

        <Reader
          src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
          width={width}
          height={height * 0.8}
          fileSystem={useFileSystem}
        />

        <SearchList
          ref={bottomSheetRef}
          onClose={() => bottomSheetRef.current?.close()}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

export function Search() {
  return (
    <ReaderProvider>
      <Inner />
    </ReaderProvider>
  );
}
