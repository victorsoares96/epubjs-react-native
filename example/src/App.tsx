import * as React from 'react';

import { SafeAreaView, Text, useWindowDimensions, View } from 'react-native';
import { Reader, ReaderProvider } from 'epubjs-react-native';

export default function App() {
  return (
    <SafeAreaView>
      <ReaderProvider>
        <Book />
      </ReaderProvider>
    </SafeAreaView>
  );
}

function Book() {
  const { width, height } = useWindowDimensions();
  return (
    <View>
      <Reader
        src={{
          uri: 'https://epubjs-react-native.s3.amazonaws.com/stamped.epub',
        }}
        width={width}
        height={height}
        renderLoadingComponent={(fileSize, progress) => (
          <Text>
            Loading... fileSize: {fileSize} progress: {progress}
          </Text>
        )}
      />
    </View>
  );
}
