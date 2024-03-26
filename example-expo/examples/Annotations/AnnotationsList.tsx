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
        .filter(
          (annotation) =>
            !annotation?.data?.isTemp && annotation.type !== 'mark'
        )
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
                  backgroundColor: annotation.styles?.color,
                  borderRadius: 14,
                  marginRight: 10,
                  borderColor: '#000',
                  borderStyle: 'solid',
                  borderWidth: 1,
                }}
              />

              {annotation.type === 'highlight' && (
                <TouchableOpacity
                  onPress={() => {
                    goToLocation(annotation.cfiRange);
                    onClose();
                  }}
                >
                  <Text
                    style={{
                      fontWeight: '600',
                      marginLeft: 5,
                    }}
                  >
                    {annotation.cfiRange}
                  </Text>

                  <Text
                    style={{
                      fontStyle: 'italic',
                      flexWrap: 'wrap',
                      maxWidth: 220,
                    }}
                    numberOfLines={2}
                  >
                    &quot;{annotation.cfiRangeText}&quot;
                  </Text>
                </TouchableOpacity>
              )}

              {annotation.type !== 'highlight' && (
                <TouchableOpacity
                  onPress={() => {
                    goToLocation(annotation.cfiRange);
                    onClose();
                  }}
                >
                  <Text
                    style={{
                      fontWeight: '600',
                      marginLeft: 5,
                    }}
                  >
                    {annotation.data?.observation}
                  </Text>

                  <Text
                    style={{
                      fontStyle: 'italic',
                      flexWrap: 'wrap',
                      maxWidth: 220,
                    }}
                    numberOfLines={2}
                  >
                    &quot;{annotation.cfiRangeText}&quot;
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: '#f6f8ff',
                padding: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                /**
                 * Required for the "add note" scenario, as an "underline" and "mark" type annotation is created in it and both work as one...
                 */
                if (annotation.data?.key) {
                  const withMarkAnnotations = annotations.filter(
                    ({ data }) => data.key === annotation.data.key
                  );

                  withMarkAnnotations.forEach((item) => {
                    removeAnnotation(item);
                  });
                } else {
                  removeAnnotation(annotation);
                }
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
