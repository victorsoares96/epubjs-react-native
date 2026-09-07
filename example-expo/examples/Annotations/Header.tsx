import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

interface Props {
  onPressAnnotations: () => void;
}

export function Header({ onPressAnnotations }: Props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-left"
        size={22}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.actions}>
        <IconButton
          icon="format-color-highlight"
          size={20}
          onPress={onPressAnnotations}
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
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 48,
  },
});
