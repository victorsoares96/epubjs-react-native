/* eslint-disable @typescript-eslint/no-use-before-define */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { useReader } from '@epubjs-react-native/core';
import { IconButton, MD3Colors } from 'react-native-paper';
import { MAX_FONT_SIZE, MIN_FONT_SIZE } from './utils';

interface Props {
  currentFontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  switchTheme: () => void;
  switchFontFamily: () => void;
  onPressSearch: () => void;
}

export function Header({
  currentFontSize,
  increaseFontSize,
  decreaseFontSize,
  switchTheme,
  switchFontFamily,
  onPressSearch,
}: Props) {
  const navigation = useNavigation();
  const { theme } = useReader();

  const [showSettings, setShowSettings] = useState(false);

  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-left"
        size={22}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.actions}>
        {showSettings && (
          <TouchableOpacity
            onPress={switchTheme}
            style={{
              ...styles.themeIcon,
              backgroundColor: theme.body.background,
            }}
          />
        )}

        {showSettings && (
          <IconButton
            icon="format-font-size-increase"
            iconColor={MD3Colors.error50}
            size={20}
            onPress={increaseFontSize}
            disabled={currentFontSize === MAX_FONT_SIZE}
          />
        )}

        {showSettings && (
          <IconButton
            icon="format-font-size-decrease"
            iconColor={MD3Colors.error50}
            size={20}
            onPress={decreaseFontSize}
            disabled={currentFontSize === MIN_FONT_SIZE}
          />
        )}

        {showSettings && (
          <IconButton
            icon="format-font"
            iconColor={MD3Colors.error50}
            size={20}
            onPress={switchFontFamily}
          />
        )}

        <IconButton icon="magnify" size={20} onPress={onPressSearch} />

        <IconButton icon="bookmark" size={20} />

        <IconButton
          icon={showSettings ? 'cog' : 'cog-outline'}
          size={20}
          onPress={() => setShowSettings((oldState) => !oldState)}
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
