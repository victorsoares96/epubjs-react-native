/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { SafeAreaView, useWindowDimensions, StyleSheet } from 'react-native';
import {
  ReaderProvider,
  Reader,
  useReader,
  Theme,
} from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Header } from './Header';
import { Footer } from './Footer';
import { MAX_FONT_SIZE, MIN_FONT_SIZE, availableFonts, themes } from './utils';
import { SearchList } from './SeachList';

function Component() {
  const { width, height } = useWindowDimensions();

  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const { theme, changeFontSize, changeFontFamily, changeTheme } = useReader();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentFontSize, setCurrentFontSize] = useState(14);
  const [currentFontFamily, setCurrentFontFamily] = useState(availableFonts[0]);
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

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
    const index = Object.values(themes).indexOf(currentTheme);
    const nextTheme =
      Object.values(themes)[(index + 1) % Object.values(themes).length];

    setCurrentTheme(nextTheme);
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
            onPressSearch={() => bottomSheetRef.current?.present()}
          />
        )}

        <Reader
          src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
          width={width}
          height={!isFullScreen ? height * 0.7 : height}
          fileSystem={useFileSystem}
          defaultTheme={themes[1]}
          initialLocation="introduction_001.xhtml"
          onDoublePress={() => setIsFullScreen((oldState) => !oldState)}
        />

        <SearchList
          ref={bottomSheetRef}
          onClose={() => bottomSheetRef.current?.dismiss()}
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
