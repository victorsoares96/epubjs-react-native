import * as React from 'react';
// import DocumentPicker from 'react-native-document-picker';
import { SafeAreaView, Text, useWindowDimensions, View } from 'react-native';
import { Reader, ReaderProvider, useReader } from 'epubjs-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
  const { goNext } = useReader();
  console.log('oie');
  return (
    <View>
      <TouchableOpacity onPress={goNext}>
        <Text>Next Page</Text>
      </TouchableOpacity>
      <Reader
        src={{
          uri: 'https://epubjs-react-native.s3.amazonaws.com/the-book-of-koli.epub',
        }}
        width={width}
        height={height}
      />
    </View>
  );
}
