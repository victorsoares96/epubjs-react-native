/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { SafeAreaView, useWindowDimensions, StyleSheet } from 'react-native';
import {
  ReaderProvider,
  Reader,
  Themes,
  useReader,
} from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from './Header';

function Component() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const { theme } = useReader();

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: theme.body.background,
      }}
    >
      <Header />

      <Reader
        src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
        height={height * 0.8}
        fileSystem={useFileSystem}
        defaultTheme={Themes.DARK}
      />
    </SafeAreaView>
  );
}

export function CustomThemes() {
  return (
    <ReaderProvider>
      <Component />
    </ReaderProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
