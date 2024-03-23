/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Annotation, useReader } from '@epubjs-react-native/core';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  annotations: Annotation[];
  onClose: () => void;
}

function AnnotationsList({ annotations, onClose }: Props) {
  const { goToLocation, removeAnnotation } = useReader();
  return (
    <View style={{ width: '100%', marginVertical: 20 }}>
      {annotations
        .filter((annotation) => !annotation.data.isTemp)
        .map((annotation) => (
          <View
            key={annotation.cfiRange}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: annotation.styles.color,
                  borderRadius: 14,
                  marginRight: 10,
                  borderColor: '#000',
                  borderStyle: 'solid',
                  borderWidth: 1,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  goToLocation(annotation.cfiRange);
                  onClose();
                }}
              >
                <Text style={{ fontWeight: '600', marginLeft: 5 }}>
                  {annotation.data?.observation}
                </Text>
                <Text style={{ fontStyle: 'italic' }}>
                  &quot;{annotation.text}&quot;
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: '#f6f8ff',
                padding: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                removeAnnotation(annotation);
                onClose();
              }}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );
}

export default AnnotationsList;
