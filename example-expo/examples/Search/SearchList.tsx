/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { forwardRef, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import {
  Section,
  SearchResult as SearchResultType,
  useReader,
} from '@epubjs-react-native/core';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Text, Button } from 'react-native-paper';
import SearchResult from './SearchResult';

interface Props {
  section: Section | null;
  onOpenTableOfContents: () => void;
  onClearFilter: () => void;
  onClose: () => void;
}
export type Ref = BottomSheetMethods;

export const SearchList = forwardRef<Ref, Props>(
  ({ section, onOpenTableOfContents, onClearFilter, onClose }, ref) => {
    const {
      searchResults,
      goToLocation,
      search,
      clearSearchResults,
      isSearching,
      addAnnotation,
      removeAnnotationByCfi,
    } = useReader();

    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState<SearchResultType[]>(searchResults.results);
    const [page, setPage] = useState(1);

    const snapPoints = React.useMemo(() => ['50%', '90%'], []);

    const renderItem = React.useCallback(
      ({ item }) => (
        <SearchResult
          searchTerm={searchTerm}
          searchResult={item}
          onPress={(searchResult) => {
            goToLocation(searchResult.cfi);
            addAnnotation('highlight', searchResult.cfi);
            setTimeout(() => {
              removeAnnotationByCfi(searchResult.cfi);
            }, 3000);
            clearSearchResults();
            setPage(1);
            setData([]);

            onClose();
          }}
        />
      ),
      [
        addAnnotation,
        clearSearchResults,
        goToLocation,
        onClose,
        removeAnnotationByCfi,
        searchTerm,
      ]
    );

    const header = React.useCallback(
      () => (
        <View>
          <View style={styles.title}>
            <Text variant="titleMedium">Search Results</Text>

            <Button
              mode="text"
              onPress={() =>
                !section ? onOpenTableOfContents() : onClearFilter()
              }
            >
              Filter: {section?.label || 'Press Here'}
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
              onSubmitEditing={(event) => {
                setSearchTerm(event.nativeEvent.text);
                clearSearchResults();
                setData([]);
                setPage(1);
                search(event.nativeEvent.text, 1, 20, {
                  sectionId: section?.id,
                });
              }}
            />
          </View>

          {isSearching && (
            <View style={styles.title}>
              <Text variant="bodyMedium" style={{ fontStyle: 'italic' }}>
                Searching results...
              </Text>
            </View>
          )}
        </View>
      ),
      [
        clearSearchResults,
        isSearching,
        onClearFilter,
        onOpenTableOfContents,
        search,
        searchTerm,
        section,
      ]
    );

    const footer = React.useCallback(
      () => (
        <View style={styles.title}>
          {isSearching && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ActivityIndicator animating />

              <Text
                variant="bodyMedium"
                style={{ fontStyle: 'italic', marginLeft: 5 }}
              >
                fetching results...
              </Text>
            </View>
          )}

          {data.length > 0 &&
            data.length === searchResults.totalResults &&
            !isSearching && (
              <Text variant="bodyMedium" style={{ fontStyle: 'italic' }}>
                No more results at the moment...
              </Text>
            )}
        </View>
      ),
      [data.length, isSearching, searchResults.totalResults]
    );

    const empty = React.useCallback(
      () => (
        <View style={styles.title}>
          <Text variant="bodyMedium" style={{ fontStyle: 'italic' }}>
            No results...
          </Text>
        </View>
      ),
      []
    );

    const handleClose = React.useCallback(() => {
      clearSearchResults();
      setPage(1);
      setData([]);
    }, [clearSearchResults]);

    const fetchMoreData = React.useCallback(() => {
      if (searchResults.results.length > 0 && !isSearching) {
        search(searchTerm, page + 1, 20, { sectionId: section?.id });
        setPage(page + 1);
      }
    }, [
      isSearching,
      page,
      search,
      searchResults.results.length,
      searchTerm,
      section?.id,
    ]);

    React.useEffect(() => {
      if (searchResults.results.length > 0) {
        setData((oldState) => [...oldState, ...searchResults.results]);
      }
    }, [searchResults]);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        style={styles.container}
        onClose={handleClose}
      >
        <BottomSheetFlatList<SearchResultType>
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.cfi.concat(index.toString())}
          renderItem={renderItem}
          ListHeaderComponent={header}
          ListFooterComponent={footer}
          ListEmptyComponent={empty}
          style={{ width: '100%' }}
          maxToRenderPerBatch={20}
          onEndReachedThreshold={0.2}
          onEndReached={fetchMoreData}
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
    marginVertical: 10,
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
