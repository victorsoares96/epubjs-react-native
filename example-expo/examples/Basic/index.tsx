import * as React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Reader, ReaderProvider, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';

function Book() {
  const { width, height } = useWindowDimensions();
  const { goPrevious, goNext } = useReader();
  return (
    <View>
      <Reader
        src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
        width={width}
        height={height * 0.7}
        fileSystem={useFileSystem}
        onSwipeLeft={() => console.log('swipe left')}
        onSwipeRight={() => console.log('swipe right')}
      />

      <View
        style={{
          marginTop: 20,
          width: '100%',
          justifyContent: 'space-evenly',
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity onPress={goPrevious}>
          <Text>goPrevious</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goNext}>
          <Text>goNext</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export function Basic() {
  return (
    <SafeAreaView>
      <ReaderProvider>
        <Book />
      </ReaderProvider>
    </SafeAreaView>
  );
}
