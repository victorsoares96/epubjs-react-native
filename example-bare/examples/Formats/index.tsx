import * as React from 'react';
import * as DocumentPicker from 'expo-document-picker';
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Reader, ReaderProvider } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import base64 from './base64';
import { styles } from './styles';

const epub =
  'https://epubjs-react-native.s3.amazonaws.com/failing-forward.epub';
const opf = 'https://s3.amazonaws.com/moby-dick/OPS/package.opf';

export function Formats() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [src, setSrc] = React.useState(opf);
  return (
    <SafeAreaView
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View style={styles.options}>
        <TouchableOpacity onPress={() => setSrc(opf)}>
          <Text>Book (.opf)</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSrc(epub)}>
          <Text>Book (.epub)</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSrc(base64)}>
          <Text>Book (base64)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Instructions',
              'To make this work copy the books (.epub) located on your computer and paste in the emulator',
              [
                {
                  text: 'Ok',
                  onPress: async () => {
                    const { assets } = await DocumentPicker.getDocumentAsync();
                    if (!assets) return;

                    const { uri } = assets[0];

                    if (uri) setSrc(uri);
                  },
                },
              ]
            );
          }}
        >
          <Text>Book (local)</Text>
        </TouchableOpacity>
      </View>

      <ReaderProvider>
        <Reader
          src={src}
          width={width}
          height={height * 0.7}
          fileSystem={useFileSystem}
        />
      </ReaderProvider>

      {src === opf && (
        <Text style={styles.currentFormat}>Current format: .opf</Text>
      )}

      {src === epub && (
        <Text style={styles.currentFormat}>Current format: .epub</Text>
      )}

      {src === base64 && (
        <Text style={styles.currentFormat}>Current format: base64</Text>
      )}

      {src !== opf && src !== epub && src !== base64 && (
        <Text style={styles.currentFormat}>Current format: local</Text>
      )}
    </SafeAreaView>
  );
}
