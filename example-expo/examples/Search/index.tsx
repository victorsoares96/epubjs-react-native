import * as React from 'react';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import { Chapter, Reader, ReaderProvider } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { styles } from './styles';
import { Header } from './Header';
import { SearchList } from './SeachList';
import { ChapterList } from './ChapterList';

function Inner() {
  const { width, height } = useWindowDimensions();

  const searchListRef = React.useRef<BottomSheet>(null);
  const chapterListRef = React.useRef<BottomSheet>(null);

  const [chapter, setChapter] = React.useState<Chapter | null>(null);
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
          onClose={() => searchListRef.current?.close()}
        />

        <ChapterList
          ref={chapterListRef}
          onClose={() => chapterListRef.current.close()}
          onSelectChapter={(selectedChapter) => setChapter(selectedChapter)}
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
