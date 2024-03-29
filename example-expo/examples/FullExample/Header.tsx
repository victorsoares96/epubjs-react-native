/* eslint-disable @typescript-eslint/no-use-before-define */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

import { useReader } from '@epubjs-react-native/core';
import { IconButton, MD3Colors } from 'react-native-paper';
import { MAX_FONT_SIZE, MIN_FONT_SIZE } from './utils';

interface Props {
  showSettings: boolean;
  toggleShowSetting: () => void;
  currentFontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  switchTheme: () => void;
  switchFontFamily: () => void;
}

export function Header({
  showSettings,
  toggleShowSetting,
  currentFontSize,
  increaseFontSize,
  decreaseFontSize,
  switchTheme,
  switchFontFamily,
}: Props) {
  const navigation = useNavigation();
  const { progress, theme } = useReader();

  return (
    <View style={styles.container}>
      <IconButton
        icon="mdi-arrow-left"
        size={20}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.actions}>
        {!showSettings && <Text>{progress}</Text>}

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

        {!showSettings && (
          <IconButton
            icon="content-save"
            iconColor={MD3Colors.error50}
            size={20}
          />
        )}

        <IconButton
          icon={showSettings ? 'cog' : 'cog-outline'}
          iconColor={MD3Colors.error50}
          size={20}
          onPress={toggleShowSetting}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
});
