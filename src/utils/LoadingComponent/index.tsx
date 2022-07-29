import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { styles } from './styles';

export function LoadingComponent() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />

      <Text style={styles.text}>Loading</Text>
    </View>
  );
}
