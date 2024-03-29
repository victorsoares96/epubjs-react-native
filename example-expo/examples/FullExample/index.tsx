/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import {
  SafeAreaView,
  useWindowDimensions,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { ReaderProvider, Reader, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import { Header } from './Header';
import { Footer } from './Footer';
import { MAX_FONT_SIZE, MIN_FONT_SIZE } from './utils';

function Component() {
  const { width, height } = useWindowDimensions();

  const { theme, changeFontSize } = useReader();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentFontSize, setCurrentFontSize] = useState(14);

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

  const switchTheme = () => {};

  const switchFontFamily = () => {};

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.body.background }}
    >
      <StatusBar translucent showHideTransition="none" hidden />

      {!isFullScreen && (
        <Header
          showSettings={showSettings}
          toggleShowSetting={() => setShowSettings((oldState) => !oldState)}
          currentFontSize={currentFontSize}
          increaseFontSize={increaseFontSize}
          decreaseFontSize={decreaseFontSize}
          switchTheme={switchTheme}
          switchFontFamily={switchFontFamily}
        />
      )}

      <Reader
        src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
        width={width}
        height={!isFullScreen ? height * 0.85 : height}
        fileSystem={useFileSystem}
        initialLocation="introduction_001.xhtml"
        onDoublePress={() => setIsFullScreen((oldState) => !oldState)}
      />

      {!isFullScreen && <Footer />}
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
