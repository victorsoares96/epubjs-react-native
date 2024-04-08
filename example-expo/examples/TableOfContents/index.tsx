/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { SafeAreaView, useWindowDimensions, StyleSheet } from 'react-native';
import { ReaderProvider, Reader, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Header } from './Header';
import { TableOfContents } from './TableOfContents';
import { Footer } from './Footer';

function Toc() {
  const { width, height } = useWindowDimensions();
  const { goToLocation } = useReader();

  const bottomSheetRef = React.useRef<BottomSheet>(null);
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <Header onOpenTocList={() => bottomSheetRef.current?.snapToIndex(0)} />

        <Reader
          src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
          width={width}
          height={height * 0.8}
          fileSystem={useFileSystem}
        />

        <TableOfContents
          ref={bottomSheetRef}
          onPressSection={(section) => {
            goToLocation(section.href.split('/')[1]);
            bottomSheetRef.current?.close();
          }}
          onClose={() => bottomSheetRef.current?.close()}
        />

        <Footer />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

export default function Wrapper() {
  return (
    <ReaderProvider>
      <Toc />
    </ReaderProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
