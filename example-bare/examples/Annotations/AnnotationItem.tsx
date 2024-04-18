/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { BottomSheetView, TouchableOpacity } from '@gorhom/bottom-sheet';
import { Annotation, useReader } from '@epubjs-react-native/core';
import { StyleSheet, View } from 'react-native';
import { IconButton, MD3Colors, Text } from 'react-native-paper';
import { contrast } from '../FullExample/utils';

interface Props {
  annotation: Annotation;
  onPressAnnotation: (annotation: Annotation) => void;
  onRemoveAnnotation: (annotation: Annotation) => void;
}

function AnnotationItem({
  annotation,
  onPressAnnotation,
  onRemoveAnnotation,
}: Props) {
  const { theme } = useReader();
  return (
    <BottomSheetView key={annotation.cfiRange} style={styles.container}>
      <View style={styles.row}>
        <View
          style={{
            ...styles.color,
            backgroundColor: annotation.styles?.color,
            borderColor: contrast[theme.body.background],
          }}
        />

        <TouchableOpacity onPress={() => onPressAnnotation(annotation)}>
          {annotation.type === 'highlight' && (
            <Text
              style={{
                ...styles.cfiRange,
                color: contrast[theme.body.background],
              }}
            >
              {annotation.cfiRange}
            </Text>
          )}

          {annotation.type !== 'highlight' && (
            <Text
              style={{
                ...styles.observation,
                color: contrast[theme.body.background],
              }}
            >
              {annotation.data?.observation}
            </Text>
          )}

          <Text
            style={{
              ...styles.cfiRangeText,
              color: contrast[theme.body.background],
            }}
            numberOfLines={2}
          >
            &quot;{annotation.cfiRangeText}&quot;
          </Text>
        </TouchableOpacity>
      </View>

      <IconButton
        icon="trash-can-outline"
        iconColor={MD3Colors.error50}
        size={20}
        onPress={() => onRemoveAnnotation(annotation)}
      />
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  color: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 10,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  cfiRange: {
    fontWeight: '600',
    marginLeft: 5,
  },
  cfiRangeText: {
    fontStyle: 'italic',
    flexWrap: 'wrap',
    maxWidth: 220,
  },
  observation: {
    fontWeight: '600',
    marginLeft: 5,
  },
});

export default AnnotationItem;
