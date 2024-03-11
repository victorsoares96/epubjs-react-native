import * as React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Reader, ReaderProvider, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';
import { styles } from './styles';
import { light, dark, sepia } from './themes';

function Inner() {
  const { width, height } = useWindowDimensions();
  const { changeTheme } = useReader();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.options}>
        <TouchableOpacity onPress={() => changeTheme(light)}>
          <Text>Light Theme</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => changeTheme(dark)}>
          <Text>Dark Theme</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => changeTheme(sepia)}>
          <Text>Sepia Theme</Text>
        </TouchableOpacity>
      </View>

      <Reader
        src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
        width={width}
        height={height * 0.7}
        fileSystem={useFileSystem}
      />
    </SafeAreaView>
  );
}

export function CustomThemes() {
  return (
    <ReaderProvider>
      <Inner />
    </ReaderProvider>
  );
}
