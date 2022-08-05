import * as React from 'react';
// import DocumentPicker from 'react-native-document-picker';
import {
  SafeAreaView,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import { Reader, ReaderProvider, useReader } from 'epubjs-react-native';

export default function App() {
  /* React.useEffect(() => {
    (async () => {
      const [res] = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: false,
        copyTo: 'cachesDirectory',
      });
      console.log(res);
    })();
  }, []); */
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
  const { goPrevious, goNext } = useReader();

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: 'darkgray',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity onPress={goPrevious}>
        <Text>Previous Page</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goNext}>
        <Text>Next Page</Text>
      </TouchableOpacity>

      <Reader
        src={{
          uri:
            'https://epubjs-react-native.s3.amazonaws.com/the-book-of-koli.epub',
        }}
        width={width}
        height={height * 0.8}
      />
    </View>
  );
}
