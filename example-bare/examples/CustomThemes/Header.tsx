/* eslint-disable @typescript-eslint/no-use-before-define */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Themes, useReader } from '@epubjs-react-native/core';
import { IconButton } from 'react-native-paper';

const THEMES = Object.values(Themes);

export function Header() {
  const navigation = useNavigation();
  const { changeTheme, theme } = useReader();

  const switchTheme = () => {
    const index = Object.values(THEMES).indexOf(theme);
    const nextTheme =
      Object.values(THEMES)[(index + 1) % Object.values(THEMES).length];

    changeTheme(nextTheme);
  };
  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-left"
        size={22}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.actions}>
        <TouchableOpacity onPress={switchTheme}>
          <View
            style={{
              ...styles.themeIcon,
              backgroundColor: theme.body.background,
            }}
          />
        </TouchableOpacity>
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
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
