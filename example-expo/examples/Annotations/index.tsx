/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import { SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';
import {
  Annotation,
  Reader,
  ReaderProvider,
  useReader,
} from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AnnotationsList from './AnnotationsList';
import AnnotationForm from './AnnotationForm';

function Book() {
  const { width, height } = useWindowDimensions();
  const { addAnnotation, removeAnnotation, annotations } = useReader();
  const [selection, setSelection] = React.useState<{
    cfiRange: string;
    text: string;
  } | null>(null);
  const [selectedAnnotation, setSelectedAnnotation] =
    React.useState<Annotation | null>(null);
  const [tempMark, setTempMark] = React.useState<Annotation | null>(null);

  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['50%', '75%', '100%'], []);
  return (
    <GestureHandlerRootView>
      <Reader
        src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
        width={width}
        height={height}
        fileSystem={useFileSystem}
        onAddAnnotation={(annotation) => {
          if (annotation.type === 'highlight') {
            setTempMark(annotation);
          }
        }}
        onPressAnnotation={(annotation) => {
          if (annotation.type !== 'underline') return;
          setSelectedAnnotation(annotation);
          bottomSheetRef.current.snapToIndex(0);
        }}
        onChangeAnnotations={(annotation) => {
          console.log('onChangeAnnotations', annotation);
        }}
        menuItems={[
          {
            label: 'Highlight',
            action: (cfiRange) => {
              addAnnotation('highlight', cfiRange);
              return true;
            },
          },
          {
            label: 'Add Note',
            action: (cfiRange, text) => {
              setSelection({ cfiRange, text });
              addAnnotation('highlight', cfiRange);
              bottomSheetRef.current.snapToIndex(0);
              return true;
            },
          },
          {
            label: 'Mark with 💚',
            action: (cfiRange) => {
              addAnnotation(
                'mark',
                cfiRange,
                undefined,
                undefined,
                'epubjs-mk-heart'
              );
              return true;
            },
          },
        ]}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        keyboardBehavior="fillParent"
        enablePanDownToClose
        onClose={() => {
          setSelection(null);
          if (tempMark) removeAnnotation(tempMark);
          setTempMark(null);
          setSelectedAnnotation(null);
        }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <AnnotationForm
            annotation={selectedAnnotation}
            selection={selection}
            onClose={() => {
              bottomSheetRef.current.close();
              if (tempMark) removeAnnotation(tempMark);
              setTempMark(null);
            }}
          />

          <AnnotationsList
            annotations={annotations}
            onClose={() => bottomSheetRef.current.close()}
          />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

export function Annotations() {
  return (
    <SafeAreaView>
      <ReaderProvider>
        <Book />
      </ReaderProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  input: {
    width: '100%',
    height: 64,
    marginTop: 8,
    marginBottom: 10,
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
