/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { forwardRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Chapter, useReader } from '@epubjs-react-native/core';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { MD3Colors, Text } from 'react-native-paper';

interface Props {
  onSelectChapter: (chapter: Chapter) => void;
  onClose: () => void;
}
export type Ref = BottomSheetMethods;

export const ChapterList = forwardRef<Ref, Props>(
  ({ onSelectChapter, onClose }, ref) => {
    const { getMeta, chapters } = useReader();

    console.log(JSON.stringify(chapters));
    const snapPoints = React.useMemo(() => ['50%', '90%'], []);

    const renderItem = React.useCallback(
      ({ item }) => (
        <TouchableOpacity
          onPress={() => {
            onSelectChapter(item);
            onClose();
          }}
        >
          <Text>{item.label}</Text>
        </TouchableOpacity>
      ),
      [onClose, onSelectChapter]
    );

    const header = React.useCallback(
      () => (
        <View>
          <View style={styles.title}>
            <Text variant="titleMedium">Chapters</Text>

            <Text style={{ color: MD3Colors.primary50 }}>
              found: {chapters.length}
            </Text>
          </View>
        </View>
      ),
      [chapters.length]
    );

    // console.log(getMeta().cover);

    return <View />;
    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        style={styles.container}
      >
        <BottomSheetFlatList<Chapter>
          data={chapters}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item?.id.concat(index.toString())}
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
