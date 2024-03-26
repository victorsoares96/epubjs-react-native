/* eslint-disable react/require-default-props */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect } from 'react';
import { Annotation, useReader } from '@epubjs-react-native/core';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

interface Props {
  annotation?: Annotation;
  selection: { cfiRange: string; text: string } | null;
  onClose: () => void;
}

export const COLORS = ['#C20114', '#39A2AE', '#CBA135', '#23CE6B', '#090C02'];

function AnnotationForm({ annotation, selection, onClose }: Props) {
  const [observation, setObservation] = React.useState('');
  const [color, setColor] = React.useState(COLORS[0]);

  const { addAnnotation, updateAnnotation, annotations } = useReader();

  useEffect(() => {
    if (annotation) {
      setObservation(annotation.data?.observation);
      setColor(annotation.styles?.color || '');
    }

    return () => {
      setObservation('');
      setColor(COLORS[0]);
    };
  }, [annotation]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Annotations</Text>

      {annotation?.type !== 'highlight' && (
        <BottomSheetTextInput
          value={observation}
          style={styles.input}
          multiline
          placeholder="Type an annotation here..."
          onChangeText={(text) => setObservation(text)}
        />
      )}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
          }}
        >
          {COLORS.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.circle, { backgroundColor: item }]}
              onPress={() => setColor(item)}
            >
              {color === item && (
                <Text
                  style={{
                    color: '#fafafa',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}
                >
                  X
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {!annotation && (
          <TouchableOpacity
            style={{
              backgroundColor: '#f6f8ff',
              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
            }}
            onPress={() => {
              const key = Date.now();
              addAnnotation(
                'underline',
                selection!.cfiRange,
                { key, text: selection!.text, observation },
                { color, opacity: 0.8 }
              );
              addAnnotation('mark', selection!.cfiRange, {
                key,
                text: selection!.text,
                observation,
              });

              setObservation('');
              onClose();
            }}
          >
            <Text style={{ textAlign: 'center', color: '#090c02' }}>
              Add Note
            </Text>
          </TouchableOpacity>
        )}

        {annotation && (
          <TouchableOpacity
            style={{
              backgroundColor: '#f6f8ff',
              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
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
                  updateAnnotation(
                    item,
                    {
                      ...item.data,
                      observation,
                    },
                    { ...item.styles, color }
                  );
                });
              } else {
                updateAnnotation(
                  annotation,
                  {
                    ...annotation.data,
                    observation,
                  },
                  { ...annotation.styles, color }
                );
              }

              onClose();
              setObservation('');
            }}
          >
            <Text style={{ textAlign: 'center', color: '#090c02' }}>
              Update Note
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 64,
    marginTop: 8,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
  title: {
    textAlign: 'left',
    fontSize: 18,
    alignSelf: 'flex-start',
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnnotationForm;
