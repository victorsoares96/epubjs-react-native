import * as React from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import { Reader, ReaderProvider, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import { Footer } from './Footer';

export function Book() {
  const { goToLocation } = useReader();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Reader
        src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
        fileSystem={useFileSystem}
        height={Dimensions.get('screen').height * 0.8}
        waitForLocationsReady
        onWebViewMessage={(message) => {
          if (message.type === 'onCfiFromPercentage') {
            goToLocation(message.cfi);
          }
        }}
      />

      <Footer />
    </SafeAreaView>
  );
}

export default function WithSlider() {
  return (
    <ReaderProvider>
      <Book />
    </ReaderProvider>
  );
}
