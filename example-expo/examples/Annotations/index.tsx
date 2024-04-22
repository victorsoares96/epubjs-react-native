import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import {
  Annotation,
  Reader,
  ReaderProvider,
  useReader,
} from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS } from './AnnotationForm';
import { AnnotationsList } from './AnnotationsList';
import { Selection } from './utils';

function Book() {
  const { width, height } = useWindowDimensions();

  const { addAnnotation, removeAnnotation, annotations } = useReader();
  const [selection, setSelection] = React.useState<Selection | null>(null);
  const [selectedAnnotation, setSelectedAnnotation] = React.useState<
    Annotation | undefined
  >(undefined);
  const [tempMark, setTempMark] = React.useState<Annotation | null>(null);

  const annotationsListRef = React.useRef<BottomSheetModal>(null);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Reader
        src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
        width={width}
        height={height * 0.85}
        fileSystem={useFileSystem}
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
          annotationsListRef.current?.present();
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
              annotationsListRef.current?.present();
              return true;
            },
          },
        ]}
      />

      <AnnotationsList
        ref={annotationsListRef}
        selection={selection}
        selectedAnnotation={selectedAnnotation}
        annotations={annotations}
        onClose={() => {
          setTempMark(null);
          setSelection(null);
          setSelectedAnnotation(undefined);
          if (tempMark) removeAnnotation(tempMark);
          annotationsListRef.current?.dismiss();
        }}
      />
    </GestureHandlerRootView>
  );
}

export function Annotations() {
  return (
    <ReaderProvider>
      <Book />
    </ReaderProvider>
  );
}
