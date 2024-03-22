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
      onChangeAnnotations={(annotations) => console.log(annotations)}
      menuItems={[
        {
          label: 'Highlight',
          action: (cfiRange) => {
            addAnnotation(
              'highlight',
              cfiRange,
              { foo: 'bar' },
              { color: '#4c12a1', opacity: 0.3 }
            );
            return true;
          },
        },
        {
          label: 'Underline',
          action: (cfiRange) => {
            addAnnotation(
              'underline',
              cfiRange,
              { foo: 'bar' },
              { color: '#4c12a1', opacity: 0.5 }
            );
            return true;
          },
        },
        {
          label: 'Mark',
          action: (cfiRange) => {
            addAnnotation(
              'mark',
              cfiRange,
              { foo: 'bar' },
              undefined,
              'epubjs-mk-heart'
            );
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
