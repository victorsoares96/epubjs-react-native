/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useReader } from '@epubjs-react-native/core';
import { Text } from 'react-native-paper';
import { contrast } from './utils';

export function Footer() {
  const { currentLocation, totalLocations, theme, section } = useReader();

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
            color: contrast[theme.body.background],
          },
        ]}
        variant="labelMedium"
      >
        Location: {currentLocation ? currentLocation.start.location : 0} of{' '}
        {totalLocations}
      </Text>

      <Text
        variant="labelMedium"
        numberOfLines={1}
        style={{ ...styles.chapter, color: contrast[theme.body.background] }}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  location: {
    letterSpacing: 1,
  },
  chapter: {
    maxWidth: 180,
    letterSpacing: 1,
    fontStyle: 'italic',
    opacity: 0.5,
  },
});
