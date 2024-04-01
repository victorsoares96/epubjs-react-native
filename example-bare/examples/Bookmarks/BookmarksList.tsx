/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { forwardRef, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Bookmark, useReader } from '@epubjs-react-native/core';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Button, IconButton, MD3Colors, Text } from 'react-native-paper';

interface Props {
  onClose: () => void;
}
export type Ref = BottomSheetModalMethods;

export const BookmarksList = forwardRef<Ref, Props>(({ onClose }, ref) => {
  const {
    bookmarks,
    removeBookmark,
    removeBookmarks,
    isBookmarked,
    updateBookmark,
    goToLocation,
    currentLocation,
  } = useReader();

  const snapPoints = React.useMemo(() => ['50%', '75%'], []);
  const [note, setNote] = useState('');
  const [currentBookmark, setCurrentBookmark] = useState<Bookmark | null>(null);

  useEffect(() => {
    if (isBookmarked) {
      const bookmark = bookmarks.find(
        (item) =>
          item.location?.start.cfi === currentLocation?.start.cfi &&
          item.location?.end.cfi === currentLocation?.end.cfi
      );

      if (!bookmark) return;

      setCurrentBookmark(bookmark);
      setNote(bookmark.data?.note || '');
    }
  }, [
    bookmarks,
    currentLocation?.end.cfi,
    currentLocation?.start.cfi,
    isBookmarked,
  ]);
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BottomSheetModal ref={ref} index={1} snapPoints={snapPoints}>
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.title}>
              <Text variant="titleMedium">Bookmarks</Text>

              {bookmarks.length > 0 && (
                <Button
                  mode="text"
                  onPress={() => {
                    removeBookmarks();
                    onClose();
                  }}
                >
                  Clear All
                </Button>
              )}
            </View>

            {bookmarks.length === 0 && (
              <View style={styles.title}>
                <Text variant="bodyMedium" style={{ fontStyle: 'italic' }}>
                  No bookmarks...
                </Text>
              </View>
            )}

            {isBookmarked && (
              <View style={{ width: '100%' }}>
                <BottomSheetTextInput
                  defaultValue={note}
                  style={styles.input}
                  multiline
                  placeholder="Type an annotation here..."
                  onChangeText={(text) => setNote(text)}
                />

                <Button
                  mode="text"
                  style={{ alignSelf: 'flex-end' }}
                  onPress={() => updateBookmark(currentBookmark!.id, { note })}
                >
                  Update Annotation
                </Button>
              </View>
            )}

            {bookmarks.map((bookmark) => (
              <View key={bookmark.id} style={styles.bookmarkContainer}>
                <TouchableOpacity
                  style={styles.bookmarkInfo}
                  onPress={() => {
                    goToLocation(bookmark.location.start.cfi);
                    onClose();
                  }}
                >
                  <View style={styles.bookmarkIcon}>
                    <IconButton icon="bookmark" size={20} />
                    <Text
                      style={styles.bookmarkLocationNumber}
                      variant="labelSmall"
                    >
                      {bookmark.location.start.location}
                    </Text>
                  </View>

                  <View style={styles.bookmarkInfoText}>
                    <Text numberOfLines={1} style={{ marginBottom: 2 }}>
                      Chapter: {bookmark.chapter.label}
                    </Text>

                    <Text numberOfLines={2} style={{ fontStyle: 'italic' }}>
                      &quot;{bookmark.text}&quot;
                    </Text>
                  </View>
                </TouchableOpacity>

                <IconButton
                  icon="trash-can-outline"
                  size={20}
                  iconColor={MD3Colors.error50}
                  onPress={() => {
                    removeBookmark(bookmark);
                    onClose();
                  }}
                />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  bookmarkInfo: {
    flexDirection: 'row',
  },
  bookmarkInfoText: {
    width: '80%',
  },
  title: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookmarkIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkLocationNumber: {
    marginTop: -12,
  },
  input: {
    width: '100%',
    height: 64,
    marginTop: 8,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
});
