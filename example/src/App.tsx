import * as React from 'react';
// import DocumentPicker from 'react-native-document-picker';
import { SafeAreaView, useWindowDimensions, View } from 'react-native';
import { Reader, ReaderProvider } from 'epubjs-react-native';

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
  return (
    <View>
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
