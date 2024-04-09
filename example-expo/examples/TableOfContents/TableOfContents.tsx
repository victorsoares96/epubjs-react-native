/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { forwardRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Toc,
  Section as SectionType,
  useReader,
} from '@epubjs-react-native/core';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Button, MD3Colors, Text } from 'react-native-paper';
import Section from './Section';

interface Props {
  onPressSection: (section: SectionType) => void;
  onClose: () => void;
}
export type Ref = BottomSheetMethods;

export const TableOfContents = forwardRef<Ref, Props>(
  ({ onPressSection, onClose }, ref) => {
    const { toc, section } = useReader();

    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState<Toc>(toc);

    const snapPoints = React.useMemo(() => ['50%', '90%'], []);

    const renderItem = React.useCallback(
      ({ item }) => (
        <Section
          searchTerm={searchTerm}
          isCurrentSection={section?.id === item?.id}
          section={item}
          onPress={(_section) => {
            onPressSection(_section);
          }}
        />
      ),
      [onPressSection, searchTerm, section?.id]
    );

    const header = React.useCallback(
      () => (
        <View>
          <View style={styles.title}>
            <Text variant="titleMedium">Table of Contents</Text>

            <Button mode="text" onPress={onClose}>
              Close
            </Button>
          </View>

          <View style={{ width: '100%' }}>
            <BottomSheetTextInput
              inputMode="search"
              returnKeyType="search"
              returnKeyLabel="Search"
              autoCorrect={false}
              autoCapitalize="none"
              defaultValue={searchTerm}
              style={styles.input}
              placeholder="Type an term here..."
              placeholderTextColor={MD3Colors.primary30}
              onSubmitEditing={(event) => {
                event.persist();

                setSearchTerm(event.nativeEvent?.text);
                setData(
                  toc.filter((elem) =>
                    new RegExp(event.nativeEvent?.text, 'gi').test(elem.label)
                  )
                );
              }}
            />
          </View>
        </View>
      ),
      [onClose, searchTerm, toc]
    );

    React.useEffect(() => {
      setData(toc);
    }, [toc]);
    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        style={styles.container}
        onClose={() => setSearchTerm('')}
      >
        <BottomSheetFlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
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
