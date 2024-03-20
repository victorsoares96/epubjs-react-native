import * as React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import { Reader, ReaderProvider, useReader } from '@epubjs-react-native/core';

export default function Page() {
  const { width, height } = useWindowDimensions();
  const { addMark } = useReader();
  return (
    <View>
      <Reader
        src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
        width={width}
        height={height * 0.7}
        fileSystem={useFileSystem}
        initialLocation="epubcfi(/6/14!/4/2/14/2[c001p0006]/1:348)"
        // highlightOnSelect={false}
        /* onPress={() =>
          addMark('highlight', 'epubcfi(/6/14!/4/2/14/2[c001p0006]/1:348)')
        } */
      />

      <TouchableOpacity
        onPress={() =>
          addMark(
            'highlight',
            'epubcfi(/6/14!/4/2/14/2[c001p0006],/1:911,/1:918)'
          )
        }
      >
        <Text>Press Here</Text>
      </TouchableOpacity>
    </View>
  );
}

export function Basic() {
  return (
    <SafeAreaView>
      <ReaderProvider>
        <Page />
      </ReaderProvider>
    </SafeAreaView>
  );
}
