import * as React from 'react';

import { View, SafeAreaView, useWindowDimensions, Text } from 'react-native';
import { Reader, BookProvider } from 'epubjs-react-native';

export default function App() {
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BookProvider>
        <Reader
          src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
          width={width}
          height={height}
          renderLoadingComponent={() => (
            <View>
              <Text>Loading</Text>
            </View>
          )}
        />
      </BookProvider>
    </SafeAreaView>
  );
}
