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
import AnnotationForm, { COLORS } from './AnnotationForm';

function Book() {
  const { width, height } = useWindowDimensions();
  const { addAnnotation, removeAnnotation, annotations } = useReader();
  const [selection, setSelection] = React.useState<{
    cfiRange: string;
    text: string;
  } | null>(null);
  const [selectedAnnotation, setSelectedAnnotation] = React.useState<
    Annotation | undefined
  >(undefined);
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
        enableSelection
        initialLocation="introduction_001.xhtml"
        initialAnnotations={[
          // Chapter 1
          {
            cfiRange: 'epubcfi(/6/10!/4/2/4,/1:0,/1:319)',
            data: {},
            sectionIndex: 4,
            styles: { color: '#23CE6B' },
            cfiRangeText:
              'The pale Usher—threadbare in coat, heart, body, and brain; I see him now. He was ever dusting his old lexicons and grammars, with a queer handkerchief, mockingly embellished with all the gay flags of all the known nations of the world. He loved to dust his old grammars; it somehow mildly reminded him of his mortality.',
            type: 'highlight',
          },
          // Chapter 5
          {
            cfiRange: 'epubcfi(/6/22!/4/2/4,/1:80,/1:88)',
            data: {},
            sectionIndex: 3,
            styles: { color: '#CBA135' },
            cfiRangeText: 'landlord',
            type: 'highlight',
          },
        ]}
        onAddAnnotation={(annotation) => {
          if (annotation.type === 'highlight' && annotation.data?.isTemp) {
            setTempMark(annotation);
          }
        }}
        onPressAnnotation={(annotation) => {
          setSelectedAnnotation(annotation);
          bottomSheetRef.current?.snapToIndex(0);
        }}
        onChangeAnnotations={(annotation) => {
          console.log('onChangeAnnotations', annotation);
        }}
        menuItems={[
          {
            label: '🟡',
            action: (cfiRange) => {
              addAnnotation('highlight', cfiRange, undefined, {
                color: COLORS[2],
              });
              return true;
            },
          },
          {
            label: '🔴',
            action: (cfiRange) => {
              addAnnotation('highlight', cfiRange, undefined, {
                color: COLORS[0],
              });
              return true;
            },
          },
          {
            label: '🟢',
            action: (cfiRange) => {
              addAnnotation('highlight', cfiRange, undefined, {
                color: COLORS[3],
              });
              return true;
            },
          },
          {
            label: 'Add Note',
            action: (cfiRange, text) => {
              setSelection({ cfiRange, text });
              addAnnotation('highlight', cfiRange, { isTemp: true });
              bottomSheetRef.current?.snapToIndex(0);
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
          setSelectedAnnotation(undefined);
        }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <AnnotationForm
            annotation={selectedAnnotation}
            selection={selection}
            onClose={() => {
              bottomSheetRef.current?.close();
              if (tempMark) removeAnnotation(tempMark);
              setTempMark(null);
            }}
          />

          <AnnotationsList
            annotations={annotations}
            onClose={() => bottomSheetRef.current?.close()}
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
