import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import type { LoadingComponentProps } from 'src/types';

import { styles } from './styles';

export function LoadingComponent({ downloadProgress }: LoadingComponentProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />

      <Text style={styles.text}>Loading {downloadProgress}%</Text>
    </View>
  );
}
