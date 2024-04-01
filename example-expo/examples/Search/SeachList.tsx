/* eslint-disable react/no-array-index-key */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { forwardRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SearchResult, useReader } from '@epubjs-react-native/core';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { IconButton, MD3Colors, Text } from 'react-native-paper';

interface Props {
  onClose: () => void;
}
export type Ref = BottomSheetModalMethods;

interface SearchResultItemProps {
  searchTerm: string;
  searchResult: SearchResult;
  onPress: (searchResult: SearchResult) => void;
}

function SearchResultItem({
  searchTerm,
  searchResult,
  onPress,
}: SearchResultItemProps) {
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = searchResult.excerpt.split(regex);

  return (
    <View>
      <Text
        style={{ fontStyle: 'italic' }}
        onPress={() => {
          onPress(searchResult);
        }}
      >
        &quot;
        {parts.filter(String).map((part, index) => {
          return regex.test(part) ? (
            <Text
              style={{ backgroundColor: 'yellow' }}
              key={`${index}-part-highlight`}
            >
              {part}
            </Text>
          ) : (
            <Text key={`${index}-part`}>{part}</Text>
          );
        })}
        &quot;
      </Text>
    </View>
  );
}

export const SearchList = forwardRef<Ref, Props>(({ onClose }, ref) => {
  const { searchResults, goToLocation, search } = useReader();

  const [searchTerm, setSearchTerm] = useState('');
  const snapPoints = React.useMemo(() => ['50%', '75%'], []);

  const handleSearchTerm = () => {
    if (searchTerm) {
      search(searchTerm);
    }
  };
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BottomSheetModal ref={ref} index={1} snapPoints={snapPoints}>
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

            {searchResults.slice(0, 5).map((searchResult) => (
              <View key={searchResult.cfi} style={styles.bookmarkContainer}>
                <TouchableOpacity
                  style={styles.bookmarkInfo}
                  onPress={() => {
                    goToLocation(searchResult.cfi);
                    onClose();
                  }}
                >
                  <View style={styles.bookmarkIcon}>
                    <IconButton icon="bookmark" size={20} />
                    {/* <Text
                      style={styles.bookmarkLocationNumber}
                      variant="labelSmall"
                    >
                      {location}
                    </Text> */}
                  </View>

                  <View style={styles.bookmarkInfoText}>
                    {/* <Text numberOfLines={1} style={{ marginBottom: 2 }}>
                      Chapter: Insert Chapter
                    </Text> */}

                    <SearchResultItem
                      searchTerm={searchTerm}
                      searchResult={searchResult}
                      onPress={(result) => {
                        goToLocation(result.cfi);
                        onClose();
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            ))}
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
  bookmarkContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  bookmarkInfo: {
    flexDirection: 'row',
  },
  bookmarkInfoText: {
    width: '85%',
  },
  title: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  bookmarkIcon: {
    justifyContent: 'center',
    alignItems: 'center',
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
