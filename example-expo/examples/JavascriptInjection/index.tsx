import * as React from 'react';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import { Reader, ReaderProvider } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';

export function JavascriptInjection() {
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView>
      <ReaderProvider>
        <Reader
          src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
          width={width}
          height={height * 0.85}
          fileSystem={useFileSystem}
          injectedJavascript={`
            function highlightTextByTagId(tagId) {
              return Promise.all(book.spine.spineItems.map((item) => {
                return item.load(book.load.bind(book)).then(() => {
                  const element = item.document.getElementById('c001p0005');

                  if (!element) return null;

                  const cfi = item.cfiFromElement(element).split(')')[0].concat(',/1:0,/1:').concat(element.textContent.length).concat(')');
                  rendition.annotations.add('highlight', cfi);

                  console.log({
                    cfi,
                    text: element.textContent,
                    element,
                  });

                  item.unload();
                  return Promise.resolve();
                });
              }));
            }

            highlightTextByTagId('c001p0005');
          `}
        />
      </ReaderProvider>
    </SafeAreaView>
  );
}
