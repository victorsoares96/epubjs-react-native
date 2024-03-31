/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { SafeAreaView, useWindowDimensions, StyleSheet } from 'react-native';
import { ReaderProvider, Reader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Header } from './Header';
import { BookmarksList } from './BookmarksList';

export function Bookmarks() {
  const { width, height } = useWindowDimensions();

  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <ReaderProvider>
          <Header
            onOpenBookmarksList={() => bottomSheetRef.current.present()}
          />

          <Reader
            src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
            width={width}
            height={height * 0.8}
            fileSystem={useFileSystem}
            onAddBookmark={(bookmark) => console.log('onAddBookmark', bookmark)}
            onRemoveBookmark={(bookmark) =>
              console.log('onRemoveBookmark', bookmark)
            }
            onUpdateBookmark={(bookmark) =>
              console.log('onUpdateBookmark', bookmark)
            }
            onChangeBookmarks={(bookmarks) =>
              console.log('onChangeBookmarks', bookmarks)
            }
          />

          <BookmarksList
            ref={bottomSheetRef}
            onClose={() => bottomSheetRef.current.dismiss()}
          />
        </ReaderProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
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
