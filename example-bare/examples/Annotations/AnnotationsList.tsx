/* eslint-disable react/require-default-props */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useReader, Annotation } from '@epubjs-react-native/core';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Button, Text } from 'react-native-paper';
import { contrast } from '../FullExample/utils';
import AnnotationForm from './AnnotationForm';
import AnnotationItem from './AnnotationItem';
import { Selection } from './utils';

interface Props {
  selection: Selection | null;
  selectedAnnotation?: Annotation;
  annotations: Annotation[];
  onClose: () => void;
}
export type Ref = BottomSheetMethods;

export const AnnotationsList = forwardRef<Ref, Props>(
  ({ selection, selectedAnnotation, annotations, onClose }, ref) => {
    const { theme, removeAnnotation, goToLocation } = useReader();

    const snapPoints = React.useMemo(() => ['50%', '75%', '100%'], []);

    const renderItem = React.useCallback(
      // eslint-disable-next-line react/no-unused-prop-types
      ({ item }: { item: Annotation }) => (
        <AnnotationItem
          annotation={item}
          onPressAnnotation={(annotation) => {
            goToLocation(annotation.cfiRange);
            onClose();
          }}
          onRemoveAnnotation={(annotation) => {
            /**
             * Required for the "add note" scenario, as an "underline" and "mark" type annotation is created in it and both work as one...
             */
            if (annotation.data?.key) {
              const withMarkAnnotations = annotations.filter(
                ({ data }) => data.key === annotation.data.key
              );

              withMarkAnnotations.forEach((_annotation) =>
                removeAnnotation(_annotation)
              );
            } else {
              removeAnnotation(annotation);
            }
            onClose();
          }}
        />
      ),
      [annotations, goToLocation, onClose, removeAnnotation]
    );

    const header = React.useCallback(
      () => (
        <View style={{ backgroundColor: theme.body.background }}>
          <View style={styles.title}>
            <Text
              variant="titleMedium"
              style={{ color: contrast[theme.body.background] }}
            >
              Annotations
            </Text>

            <Button
              mode="text"
              textColor={contrast[theme.body.background]}
              onPress={onClose}
            >
              Close
            </Button>
          </View>

          {(selection || selectedAnnotation) && (
            <AnnotationForm
              annotation={selectedAnnotation}
              selection={selection}
              onClose={onClose}
            />
          )}
        </View>
      ),
      [onClose, selectedAnnotation, selection, theme.body.background]
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        style={{ ...styles.container, backgroundColor: theme.body.background }}
        handleStyle={{ backgroundColor: theme.body.background }}
        backgroundStyle={{ backgroundColor: theme.body.background }}
        onClose={onClose}
      >
        <BottomSheetFlatList<Annotation>
          data={annotations.filter(
            (annotation) =>
              !annotation?.data?.isTemp && annotation.type !== 'mark'
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.cfiRange}
          renderItem={renderItem}
          ListHeaderComponent={header}
          style={{ width: '100%' }}
          maxToRenderPerBatch={20}
        />
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    width: '100%',
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
});
