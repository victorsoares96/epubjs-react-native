/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useReader, Annotation } from '@epubjs-react-native/core';
import {
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Button, Text } from 'react-native-paper';
import { contrast } from '../FullExample/utils';
import AnnotationForm from './AnnotationForm';
import AnnotationItem from './AnnotationItem';
import { Selection } from './utils';

interface Props {
  selection: Selection | null;
  selectedAnnotation?: Annotation;
  annotations: Annotation[];
  onPressAnnotation: (annotation: Annotation) => void;
  onClose: () => void;
}
export type Ref = BottomSheetModalMethods;

export const AnnotationsList = forwardRef<Ref, Props>(
  (
    { selection, selectedAnnotation, annotations, onPressAnnotation, onClose },
    ref
  ) => {
    const { theme, removeAnnotation } = useReader();

    const snapPoints = React.useMemo(() => ['50%', '75%', '100%'], []);

    const dismiss = React.useCallback(() => {
      if (ref && typeof ref !== 'function') {
        ref.current?.dismiss();
      }
    }, [ref]);

    const renderItem = React.useCallback(
      ({ item }: { item: Annotation }) => (
        <AnnotationItem
          annotation={item}
          isSelected={
            selectedAnnotation?.cfiRange === item.cfiRange &&
            selectedAnnotation?.type === item.type
          }
          onPressAnnotation={onPressAnnotation}
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
            dismiss();
          }}
        />
      ),
      [
        annotations,
        dismiss,
        onPressAnnotation,
        removeAnnotation,
        selectedAnnotation,
      ]
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
              onPress={dismiss}
            >
              Close
            </Button>
          </View>

          {(selection || selectedAnnotation) && (
            <AnnotationForm
              annotation={selectedAnnotation}
              selection={selection}
              onClose={dismiss}
            />
          )}
        </View>
      ),
      [dismiss, selectedAnnotation, selection, theme.body.background]
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        enableContentPanningGesture={false}
        style={{
          ...styles.container,
          backgroundColor: theme.body.background,
        }}
        handleStyle={{ backgroundColor: theme.body.background }}
        backgroundStyle={{ backgroundColor: theme.body.background }}
        onDismiss={onClose}
      >
        <BottomSheetFlatList<Annotation>
          data={annotations.filter(
            (annotation) =>
              !annotation?.data?.isTemp && annotation.type !== 'mark'
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) =>
            `${item.type}-${item.cfiRange}-${index}`
          }
          renderItem={renderItem}
          ListHeaderComponent={header}
          style={{ width: '100%' }}
          maxToRenderPerBatch={20}
        />
      </BottomSheetModal>
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
});
