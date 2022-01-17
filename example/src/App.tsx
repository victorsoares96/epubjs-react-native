import * as React from 'react';

import { SafeAreaView, Text, useWindowDimensions, View } from 'react-native';
import { Reader, BookProvider, useBook } from 'epubjs-react-native';

export default function App() {
  return (
    <SafeAreaView>
      <BookProvider>
        <Book />
      </BookProvider>
    </SafeAreaView>
  );
}

function Book() {
  const { width, height } = useWindowDimensions();
  const { getCurrentLocation, progress, currentPage, totalPages } = useBook();
  return (
    <View>
      <Reader
        src={{ uri: 'https://s3.amazonaws.com/moby-dick/OPS/package.opf' }}
        width={width}
        height={height * 0.8}
        renderLoadingComponent={() => <Text>Loading...</Text>}
        // initialLocation="epubcfi(/6/12!/4/2/110/2/1:0)"
      />

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <Text onPress={() => console.log(getCurrentLocation())}>
          getCurrentLocation
        </Text>

        <Text onPress={() => console.log(getCurrentLocation())}>
          getCurrentLocation
        </Text>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <Text>progress: {progress}</Text>

        <Text>
          currentPage: {currentPage} totalPages: {totalPages}
        </Text>
      </View>
    </View>
  );
}
