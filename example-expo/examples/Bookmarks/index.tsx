import React from 'react';
import { useWindowDimensions } from 'react-native';
import { ReaderProvider, Reader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from './Header';
import { BookmarksList } from './BookmarksList';

export function Bookmarks() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
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
      <ReaderProvider>
        <Header onOpenBookmarksList={() => bottomSheetRef.current?.present()} />

        <Reader
          src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
          width={width}
          height={height}
          fileSystem={useFileSystem}
          waitForLocationsReady
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
          onClose={() => bottomSheetRef.current?.dismiss()}
        />
      </ReaderProvider>
    </GestureHandlerRootView>
  );
}
