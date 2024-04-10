/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { SafeAreaView, useWindowDimensions, StyleSheet } from 'react-native';
import {
  ReaderProvider,
  Reader,
  useReader,
  Themes,
  Section,
  Annotation,
} from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Header } from './Header';
import { Footer } from './Footer';
import { MAX_FONT_SIZE, MIN_FONT_SIZE, availableFonts, themes } from './utils';
import { BookmarksList } from '../Bookmarks/BookmarksList';
import { SearchList } from '../Search/SearchList';
import { TableOfContents } from '../TableOfContents/TableOfContents';
import { COLORS } from '../Annotations/AnnotationForm';
import { AnnotationsList } from '../Annotations/AnnotationsList';

function Component() {
  const { width, height } = useWindowDimensions();

  const {
    theme,
    annotations,
    changeFontSize,
    changeFontFamily,
    changeTheme,
    goToLocation,
    addAnnotation,
    removeAnnotation,
  } = useReader();

  const bookmarksListRef = React.useRef<BottomSheetModal>(null);
  const searchListRef = React.useRef<BottomSheet>(null);
  const tableOfContentsRef = React.useRef<BottomSheet>(null);
  const annotationsListRef = React.useRef<BottomSheet>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentFontSize, setCurrentFontSize] = useState(14);
  const [currentFontFamily, setCurrentFontFamily] = useState(availableFonts[0]);
  const [section, setSection] = React.useState<Section | null>(null);
  const [tempMark, setTempMark] = React.useState<Annotation | null>(null);
  const [selection, setSelection] = React.useState<{
    cfiRange: string;
    text: string;
  } | null>(null);
  const [selectedAnnotation, setSelectedAnnotation] = React.useState<
    Annotation | undefined
  >(undefined);

  const increaseFontSize = () => {
    if (currentFontSize < MAX_FONT_SIZE) {
      setCurrentFontSize(currentFontSize + 1);
      changeFontSize(`${currentFontSize + 1}px`);
    }
  };

  const decreaseFontSize = () => {
    if (currentFontSize > MIN_FONT_SIZE) {
      setCurrentFontSize(currentFontSize - 1);
      changeFontSize(`${currentFontSize - 1}px`);
    }
  };

  const switchTheme = () => {
    const index = Object.values(themes).indexOf(theme);
    const nextTheme =
      Object.values(themes)[(index + 1) % Object.values(themes).length];

    changeTheme(nextTheme);
  };

  const switchFontFamily = () => {
    const index = availableFonts.indexOf(currentFontFamily);
    const nextFontFamily = availableFonts[(index + 1) % availableFonts.length];

    setCurrentFontFamily(nextFontFamily);
    changeFontFamily(nextFontFamily);
  };

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.body.background }}
    >
      <GestureHandlerRootView>
        {!isFullScreen && (
          <Header
            currentFontSize={currentFontSize}
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            switchTheme={switchTheme}
            switchFontFamily={switchFontFamily}
            onPressSearch={() => searchListRef.current?.snapToIndex(0)}
            onOpenBookmarksList={() => bookmarksListRef.current?.present()}
            onOpenTableOfContents={() =>
              tableOfContentsRef.current?.snapToIndex(0)
            }
            onOpenAnnotationsList={() =>
              annotationsListRef.current?.snapToIndex(0)
            }
          />
        )}

        <Reader
          src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
          width={width}
          height={!isFullScreen ? height * 0.75 : height}
          fileSystem={useFileSystem}
          defaultTheme={Themes.DARK}
          initialLocation="introduction_001.xhtml"
          initialAnnotations={[
            // Chapter 1
            {
              cfiRange: 'epubcfi(/6/10!/4/2/4,/1:0,/1:319)',
              data: {},
              sectionIndex: 4,
              styles: { color: '#23CE6B' },
              cfiRangeText:
                'The pale Usher—threadbare in coat, heart, body, and brain; I see him now. He was ever dusting his old lexicons and grammars, with a queer handkerchief, mockingly embellished with all the gay flags of all the known nations of the world. He loved to dust his old grammars; it somehow mildly reminded him of his mortality.',
              type: 'highlight',
            },
            // Chapter 5
            {
              cfiRange: 'epubcfi(/6/22!/4/2/4,/1:80,/1:88)',
              data: {},
              sectionIndex: 3,
              styles: { color: '#CBA135' },
              cfiRangeText: 'landlord',
              type: 'highlight',
            },
          ]}
          onAddAnnotation={(annotation) => {
            if (annotation.type === 'highlight' && annotation.data?.isTemp) {
              setTempMark(annotation);
            }
          }}
          onPressAnnotation={(annotation) => {
            setSelectedAnnotation(annotation);
            annotationsListRef.current?.snapToIndex(0);
          }}
          menuItems={[
            {
              label: '🟡',
              action: (cfiRange) => {
                addAnnotation('highlight', cfiRange, undefined, {
                  color: COLORS[2],
                });
                return true;
              },
            },
            {
              label: '🔴',
              action: (cfiRange) => {
                addAnnotation('highlight', cfiRange, undefined, {
                  color: COLORS[0],
                });
                return true;
              },
            },
            {
              label: '🟢',
              action: (cfiRange) => {
                addAnnotation('highlight', cfiRange, undefined, {
                  color: COLORS[3],
                });
                return true;
              },
            },
            {
              label: 'Add Note',
              action: (cfiRange, text) => {
                setSelection({ cfiRange, text });
                addAnnotation('highlight', cfiRange, { isTemp: true });
                annotationsListRef.current?.snapToIndex(0);
                return true;
              },
            },
          ]}
          onDoublePress={() => setIsFullScreen((oldState) => !oldState)}
        />

        <BookmarksList
          ref={bookmarksListRef}
          onClose={() => bookmarksListRef.current?.dismiss()}
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
            goToLocation(selectedSection.href.split('/')[1]);
            tableOfContentsRef.current?.close();
          }}
        />

        <AnnotationsList
          ref={annotationsListRef}
          selection={selection}
          selectedAnnotation={selectedAnnotation}
          annotations={annotations}
          onClose={() => {
            setTempMark(null);
            setSelection(null);
            setSelectedAnnotation(undefined);
            if (tempMark) removeAnnotation(tempMark);
            annotationsListRef.current?.close();
          }}
        />

        {!isFullScreen && <Footer />}
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

export function FullExample() {
  return (
    <ReaderProvider>
      <Component />
    </ReaderProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  themeIcon: {
    width: 24,
    height: 24,
    borderRadius: 32,
    borderColor: '#000',
    borderWidth: 2,
    marginRight: 10,
  },
  actions: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
});
