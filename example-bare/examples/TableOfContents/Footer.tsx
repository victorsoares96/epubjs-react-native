/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useReader } from '@epubjs-react-native/core';

export function Footer() {
  const { section, theme } = useReader();

  const contrast = theme.p.color.split(' ')[0];
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.body.background,
        },
      ]}
    >
      <Text
        style={[
          styles.section,
          {
            color: contrast,
          },
        ]}
      >
        {section?.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    flex: 0,
    paddingBottom: 10,
  },
  section: {
    letterSpacing: 1,
    textAlign: 'center',
  },
});
