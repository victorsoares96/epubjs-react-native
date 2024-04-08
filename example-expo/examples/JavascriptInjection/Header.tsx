/* eslint-disable @typescript-eslint/no-use-before-define */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useReader } from '@epubjs-react-native/core';
import { IconButton } from 'react-native-paper';

export function Header() {
  const navigation = useNavigation();
  const { injectJavascript } = useReader();

  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-left"
        size={22}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.actions}>
        <IconButton
          icon="script-text-play-outline"
          size={20}
          onPress={() =>
            injectJavascript(`
              alert('Hello World');
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: "onHello", message: "Hello World" }));
            `)
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  themeIcon: {
    width: 24,
    height: 24,
    borderRadius: 32,
    borderColor: '#000',
    borderWidth: 2,
    marginRight: 10,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
