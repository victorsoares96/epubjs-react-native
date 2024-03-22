import * as React from 'react';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import { Reader, ReaderProvider, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';

function Book() {
  const { width, height } = useWindowDimensions();
  const { addAnnotation, removeAnnotation } = useReader();
  return (
    <Reader
      src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
      width={width}
      height={height}
      fileSystem={useFileSystem}
      onAddAnnotation={(annotation) => console.log(annotation)}
      menuItems={[
        {
          label: 'Highlight',
          action: (cfiRange, text) => {
            addAnnotation('highlight', cfiRange, 'red', 0.3, {
              foo: 'bar',
            });
            return true;
          },
        },
        /* {
          label: '👍',
          action: (cfiRange, text) => {
            addAnnotation('underline', cfiRange, 'red', undefined, {
              foo: 'bar',
            });
            return true;
          },
        },
        {
          label: '💚',
          action: (cfiRange, text) => {
            removeAnnotation('highlight', cfiRange);
            return true;
          },
        },
        {
          label: '🥰',
          action: (cfiRange, text) => {
            addAnnotation('underline', cfiRange, '#4c12a1');
            return true;
          },
        },
        {
          label: '🥱',
          action: (cfiRange, text) => {
            return true;
          },
        },
        {
          label: '😂',
          action: (cfiRange, text) => {
            return true;
          },
        },
        {
          label: '🤬',
          action: (cfiRange, text) => {
            return true;
          },
        },
        {
          label: '🔴',
          action: (cfiRange, text) => {
            console.log({ cfiRange, text, value: 'amei' });
            return true;
          },
        },
        {
          label: '🔵',
          action: (cfiRange, text) => {
            console.log({ cfiRange, text, value: 'amei' });
            return true;
          },
        },
        {
          label: '🟡',
          action: (cfiRange, text) => {
            console.log({ cfiRange, text, value: 'amei' });
            return true;
          },
        },
        {
          label: '🟢',
          action: (cfiRange, text) => {
            console.log({ cfiRange, text, value: 'amei' });
            return true;
          },
        }, */
      ]}
    />
  );
}

export function Annotations() {
  return (
    <SafeAreaView>
      <ReaderProvider>
        <Book />
      </ReaderProvider>
    </SafeAreaView>
  );
}
