/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { SafeAreaView, useWindowDimensions, StyleSheet } from 'react-native';
import { ReaderProvider, Reader, Themes } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';
import { Header } from './Header';

export function CustomThemes() {
  const { height } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <ReaderProvider>
        <Header />

        <Reader
          src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
          height={height * 0.8}
          fileSystem={useFileSystem}
          defaultTheme={Themes.DARK}
        />
      </ReaderProvider>
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
