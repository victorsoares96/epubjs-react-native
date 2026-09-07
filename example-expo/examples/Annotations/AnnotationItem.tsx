/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { Pressable } from 'react-native-gesture-handler';
import { Annotation, useReader } from '@epubjs-react-native/core';
import { StyleSheet, View } from 'react-native';
import { IconButton, MD3Colors, Text } from 'react-native-paper';
import { contrast } from '../FullExample/utils';

interface Props {
  annotation: Annotation;
  isSelected?: boolean;
  onPressAnnotation: (annotation: Annotation) => void;
  onRemoveAnnotation: (annotation: Annotation) => void;
}

function AnnotationItem({
  annotation,
  isSelected,
  onPressAnnotation,
  onRemoveAnnotation,
}: Props) {
  const { theme } = useReader();
  return (
    <View
      style={[
        styles.container,
        isSelected && {
          backgroundColor: 'rgba(151, 151, 151, 0.2)',
          borderRadius: 8,
        },
      ]}
    >
      <Pressable
        style={styles.row}
        onPress={() => onPressAnnotation(annotation)}
      >
        <View
          style={{
            ...styles.color,
            backgroundColor: annotation.styles?.color || '#CBA135',
            borderColor: isSelected
              ? MD3Colors.primary50
              : contrast[theme.body.background],
            borderWidth: isSelected ? 2 : 1,
          }}
        />

        <View>
          {annotation.type === 'highlight' && (
            <Text
              style={{
                ...styles.cfiRange,
                color: contrast[theme.body.background],
              }}
            >
              {annotation.type}
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
        </View>
      </Pressable>

      <IconButton
        icon="trash-can-outline"
        iconColor={MD3Colors.error50}
        size={20}
        onPress={() => onRemoveAnnotation(annotation)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  row: {
    flex: 1,
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
    textTransform: 'capitalize',
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
