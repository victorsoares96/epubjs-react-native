/* eslint-disable @typescript-eslint/no-use-before-define */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { IconButton } from 'react-native-paper';

interface Props {
  onPressSearch: () => void;
}

export function Header({ onPressSearch }: Props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-left"
        size={22}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.actions}>
        <IconButton icon="magnify" size={20} onPress={onPressSearch} />
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
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
