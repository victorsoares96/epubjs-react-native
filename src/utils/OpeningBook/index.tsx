import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import type { ReaderProps } from 'src/types';

import { styles } from './styles';

export function OpeningBook({
  width,
  height,
}: Pick<ReaderProps, 'width' | 'height'>) {
  return (
    <View style={[styles.container, { width, height }]}>
      <ActivityIndicator size="large" />

      <Text style={styles.text}>Opening</Text>
    </View>
  );
}
