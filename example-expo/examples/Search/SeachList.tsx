/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { forwardRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useReader } from '@epubjs-react-native/core';
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { IconButton, MD3Colors, Text } from 'react-native-paper';
import SearchResult from './SearchResult';

interface Props {
  onClose: () => void;
}
export type Ref = BottomSheetModalMethods;

export const SearchList = forwardRef<Ref, Props>(({ onClose }, ref) => {
  const {
    searchResults,
    goToLocation,
    search,
    clearSearchResults,
    isSearching,
  } = useReader();

  const [searchTerm, setSearchTerm] = useState('');
  const snapPoints = React.useMemo(() => ['50%', '75%'], []);

  const handleSearchTerm = () => {
    if (searchTerm) {
      search(searchTerm, 1, 20);
    }
  };
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BottomSheetModal
          ref={ref}
          index={1}
          snapPoints={snapPoints}
          onDismiss={clearSearchResults}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.title}>
              <Text variant="titleMedium">Search Results</Text>

              {searchResults.length > 0 && (
                <Text style={{ color: MD3Colors.primary50 }}>
                  found: {searchResults.length}
                </Text>
              )}
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <BottomSheetTextInput
                defaultValue={searchTerm}
                style={styles.input}
                placeholder="Type an term here..."
                onChangeText={(text) => setSearchTerm(text)}
              />

              <IconButton icon="magnify" size={20} onPress={handleSearchTerm} />
            </View>

            {searchResults.length === 0 && (
              <View style={styles.title}>
                <Text variant="bodyMedium" style={{ fontStyle: 'italic' }}>
                  No results...
                </Text>
              </View>
            )}

            <BottomSheetFlatList
              data={searchResults}
              keyExtractor={(i) => i.cfi}
              renderItem={({ item }) => (
                <SearchResult
                  searchTerm={searchTerm}
                  searchResult={item}
                  onPress={(searchResult) => {
                    goToLocation(searchResult.cfi);
                    onClose();
                  }}
                />
              )}
              contentContainerStyle={{}}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bookmarkInfo: {
    flexDirection: 'row',
  },
  title: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  bookmarkLocationNumber: {
    marginTop: -12,
  },
  input: {
    width: '90%',
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
});
