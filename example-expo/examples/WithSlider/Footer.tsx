/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useReader } from '@epubjs-react-native/core';
import Slider from '@react-native-community/slider';

export function Footer() {
  const { theme, totalLocations } = useReader();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.body.background,
        },
      ]}
    >
      <Slider
        style={{ width: '90%', height: 40 }}
        disabled={totalLocations === 0}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor="#c0c0c0"
        maximumTrackTintColor="#000000"
        step={1}
        tapToSeek
        onValueChange={(value) => console.log({ value })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    letterSpacing: 1,
    textAlign: 'center',
  },
  slider: {
    width: 300,
    opacity: 1,
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 0,
  },
  outer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#11FF11',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerTrue: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0F0FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#111111',
  },
  innerTrue: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0F0FFF',
  },
  outerSmall: {
    width: 4,
    height: 4,
    top: 6,
    borderRadius: 2,
    backgroundColor: '#003366',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerTrueSmall: {
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: '#ABCDEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerSmall: {
    width: 7,
    height: 7,
    borderRadius: 1,
    backgroundColor: '#223366',
  },
  innerTrueSmall: {
    width: 7,
    height: 7,
    borderRadius: 1,
    backgroundColor: '#334488',
  },
});
