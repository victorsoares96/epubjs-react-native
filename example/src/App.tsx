import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { Reader } from 'epubjs-react-native';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  /*React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);*/

  return (
    <View style={styles.container}>
      <Reader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
