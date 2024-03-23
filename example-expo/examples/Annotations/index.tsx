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
      onAddAnnotation={(annotation) =>
        console.log('onAddAnnotation', annotation)
      }
      onPressAnnotation={(annotation) =>
        console.log('onPressAnnotation', annotation)
      }
      onChangeAnnotations={(annotations) =>
        console.log('onChangeAnnotations', annotations)
      }
      menuItems={[
        {
          label: 'Highlight',
          action: (cfiRange) => {
            addAnnotation('highlight', cfiRange);
            return true;
          },
        },
        {
          label: 'Add Note',
          action: (cfiRange) => {
            addAnnotation(
              'underline',
              cfiRange,
              { foo: 'bar' },
              { color: '#4c12a1', opacity: 0.5, thickness: 2 }
            );
            return true;
          },
        },
        {
          label: 'Mark with 💚',
          action: (cfiRange) => {
            addAnnotation(
              'mark',
              cfiRange,
              undefined,
              undefined,
              'epubjs-mk-heart'
            );
            return true;
          },
        },
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
