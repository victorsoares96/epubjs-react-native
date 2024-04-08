import * as React from 'react';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import { Section, Reader, ReaderProvider } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { styles } from './styles';
import { Header } from './Header';
import { SearchList } from './SearchList';
import { TableOfContents } from '../TableOfContents/TableOfContents';

function Inner() {
  const { width, height } = useWindowDimensions();

  const searchListRef = React.useRef<BottomSheet>(null);
  const tableOfContentsRef = React.useRef<BottomSheet>(null);

  const [section, setSection] = React.useState<Section | null>(null);
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <Header onPressSearch={() => searchListRef.current?.snapToIndex(0)} />

        <Reader
          src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
          width={width}
          height={height * 0.8}
          fileSystem={useFileSystem}
        />

        <SearchList
          ref={searchListRef}
          section={section}
          onOpenTableOfContents={() =>
            tableOfContentsRef.current?.snapToIndex(0)
          }
          onClearFilter={() => setSection(null)}
          onClose={() => searchListRef.current?.close()}
        />

        <TableOfContents
          ref={tableOfContentsRef}
          onClose={() => tableOfContentsRef.current?.close()}
          onPressSection={(selectedSection) => {
            setSection(selectedSection);
            tableOfContentsRef.current?.close();
          }}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

export function Search() {
  return (
    <ReaderProvider>
      <BottomSheetModalProvider>
        <Inner />
      </BottomSheetModalProvider>
    </ReaderProvider>
  );
}
