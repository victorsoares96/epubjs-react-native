/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useReader } from '@epubjs-react-native/core';
import Slider from '@react-native-community/slider';
import { useDebounceCallback } from 'usehooks-ts';
import { Text } from 'react-native-paper';

export function Footer() {
  const { theme, totalLocations, injectJavascript, currentLocation } =
    useReader();
  const debounced = useDebounceCallback((percentage) => {
    injectJavascript(`
      try {
        const cfi = book.locations.cfiFromPercentage(${percentage} / 100);
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: "onCfiFromPercentage", cfi })); true
      } catch (error) {
        alert(error?.message);
      }
    `);
  }, 1000);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.body.background,
        },
      ]}
    >
      <Text variant="labelMedium" style={styles.currentPercentage}>
        Current Percentage:{' '}
        {((currentLocation?.start.percentage || 0) * 100).toFixed(0)}%
      </Text>

      <View style={styles.row}>
        <Text variant="labelMedium">0%</Text>

        <Slider
          style={styles.slider}
          disabled={totalLocations === 0}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#c0c0c0"
          maximumTrackTintColor="#000000"
          step={1}
          tapToSeek
          onValueChange={(percentage) => debounced(percentage)}
        />

        <Text variant="labelMedium">100%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  slider: { width: '75%', height: 40 },
  currentPercentage: {},
});
