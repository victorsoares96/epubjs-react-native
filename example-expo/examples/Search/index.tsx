import * as React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Reader, ReaderProvider, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import { styles } from './styles';

function Inner() {
  const { width, height } = useWindowDimensions();
  const { search, searchResults, goToLocation } = useReader();
  const [term, setTerm] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Reader
        src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
        width={width}
        height={height * 0.5}
        fileSystem={useFileSystem}
      />

      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => goToLocation(item.cfi)}>
            <Text>{item.excerpt}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

export function Search() {
  return (
    <ReaderProvider>
      <Inner />
    </ReaderProvider>
  );
}
