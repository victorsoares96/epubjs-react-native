import * as React from 'react';

import { SafeAreaView, useWindowDimensions, View } from 'react-native';
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
        src={{ uri: 'https://s3.amazonaws.com/moby-dick/OPS/package.opf' }}
        width={width}
        height={height}
      />
    </View>
  );
}
