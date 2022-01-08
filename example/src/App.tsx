import * as React from 'react';

import { SafeAreaView, Text, useWindowDimensions, View } from 'react-native';
import { Reader, BookProvider, useBook } from 'epubjs-react-native';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BookProvider>
        <EBook />
      </BookProvider>
    </SafeAreaView>
  );
}

function EBook() {
  const { width, height } = useWindowDimensions();
  const { goPrevious, goNext } = useBook();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Reader
        src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
        width={width}
        height={height * 0.9}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
        }}
      >
        <Text onPress={goPrevious}>Previous</Text>
        <Text onPress={goNext}>Next</Text>
      </View>
    </View>
  );
}
