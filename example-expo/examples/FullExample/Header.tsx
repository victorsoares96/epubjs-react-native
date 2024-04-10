/* eslint-disable @typescript-eslint/no-use-before-define */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { useReader } from '@epubjs-react-native/core';
import { IconButton, MD3Colors } from 'react-native-paper';
import { MAX_FONT_SIZE, MIN_FONT_SIZE } from './utils';

interface Props {
  currentFontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  switchTheme: () => void;
  switchFontFamily: () => void;
  onPressSearch: () => void;
  onOpenBookmarksList: () => void;
  onOpenTableOfContents: () => void;
}

export function Header({
  currentFontSize,
  increaseFontSize,
  decreaseFontSize,
  switchTheme,
  switchFontFamily,
  onPressSearch,
  onOpenBookmarksList,
  onOpenTableOfContents,
}: Props) {
  const navigation = useNavigation();
  const {
    theme,
    bookmarks,
    addBookmark,
    removeBookmark,
    getCurrentLocation,
    isBookmarked,
  } = useReader();

  const [showSettings, setShowSettings] = useState(false);

  const handleChangeBookmark = () => {
    const location = getCurrentLocation();

    if (!location) return;

    if (isBookmarked) {
      const bookmark = bookmarks.find(
        (item) =>
          item.location.start.cfi === location?.start.cfi &&
          item.location.end.cfi === location?.end.cfi
      );

      if (!bookmark) return;
      removeBookmark(bookmark);
    } else addBookmark(location);
  };
  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-left"
        iconColor={MD3Colors.neutral50}
        size={22}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.actions}>
        {showSettings && (
          <TouchableOpacity
            onPress={switchTheme}
            style={{
              ...styles.themeIcon,
              borderColor: MD3Colors.neutral50,
              backgroundColor: theme.body.background,
            }}
          />
        )}

        {showSettings && (
          <IconButton
            icon="format-font-size-increase"
            iconColor={MD3Colors.neutral50}
            size={20}
            onPress={increaseFontSize}
            disabled={currentFontSize === MAX_FONT_SIZE}
          />
        )}

        {showSettings && (
          <IconButton
            icon="format-font-size-decrease"
            iconColor={MD3Colors.neutral50}
            size={20}
            onPress={decreaseFontSize}
            disabled={currentFontSize === MIN_FONT_SIZE}
          />
        )}

        {showSettings && (
          <IconButton
            icon="format-font"
            iconColor={MD3Colors.neutral50}
            size={20}
            onPress={switchFontFamily}
          />
        )}

        {!showSettings && (
          <IconButton
            icon="magnify"
            iconColor={MD3Colors.neutral50}
            size={20}
            onPress={onPressSearch}
          />
        )}

        {!showSettings && (
          <IconButton
            icon={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            iconColor={MD3Colors.neutral50}
            size={20}
            animated
            onPress={handleChangeBookmark}
            onLongPress={onOpenBookmarksList}
          />
        )}

        {!showSettings && (
          <IconButton
            icon="format-list-bulleted-square"
            iconColor={MD3Colors.neutral50}
            size={20}
            onPress={onOpenTableOfContents}
          />
        )}

        <IconButton
          icon={showSettings ? 'cog' : 'cog-outline'}
          iconColor={MD3Colors.neutral50}
          size={20}
          onPress={() => setShowSettings((oldState) => !oldState)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  themeIcon: {
    width: 24,
    height: 24,
    borderRadius: 32,
    borderWidth: 2,
    marginRight: 10,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
