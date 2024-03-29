/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useReader } from '@epubjs-react-native/core';

export function Footer() {
  const { currentLocation, totalLocations, theme } = useReader();

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
          styles.location,
          {
            color: contrast,
          },
        ]}
      >
        Location: {currentLocation ? currentLocation.start.location : 0} of{' '}
        {totalLocations}
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
  location: {
    letterSpacing: 1,
  },
});
