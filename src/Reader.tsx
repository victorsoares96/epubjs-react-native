import React, { useContext, useEffect, useRef } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import GestureRecognizer from 'react-native-swipe-detect';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { BookContext } from './context';
import { defaultTheme } from './hooks/useTheme';
import template from './template';
import type { ReaderProps, SelectedText } from './types';

export function Reader({
  src,
  onStarted = () => {},
  onReady = () => {},
  onDisplayError = () => {},
  onResized = () => {},
  onLocationChange = () => {},
  onRendered = () => {},
  onSearch = () => {},
  onLocationsReady = () => {},
  onSelected = () => {},
  onMarkPressed = () => {},
  onOrientationChange = () => {},
  onLayout = () => {},
  onNavigationLoaded = () => {},
  onBeginning = () => {},
  onFinish = () => {},
  onPress = () => {},
  onDoublePress = () => {},
  width,
  height,
  initialLocation,
  enableSwipe = true,
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
  renderLoadingComponent = () => null,
  enableSelection = false,
  themes = { defaultTheme },
  activeTheme = 'default',
}: ReaderProps) {
  const {
    registerBook,
    setIsLoading,
    setTotalLocations,
    setCurrentLocation,
    setProgress,
    setLocations,
    setAtStart,
    setAtEnd,
    goNext,
    goPrevious,
    isLoading,
    goToLocation,
    locations,
    theme,
    registerThemes,
  } = useContext(BookContext);
  const book = useRef<WebView>(null);

  let injectedJS = `
    window.THEMES = ${JSON.stringify(themes)};
    window.ACTIVE_THEME = '${activeTheme}';
    window.ENABLE_SELECTION = ${enableSelection};
  `;
  /*let injectedJS = `
    window.LOCATIONS = ${locations};
    window.THEME = ${JSON.stringify(theme)};
    window.ENABLE_SELECTION = ${enableSelection};
  `;*/

  if (src.base64) {
    injectedJS = `
      window.BOOK_BASE64 = ${JSON.stringify(src.base64)};
      ${injectedJS}
    `;
  } else if (src.uri) {
    injectedJS = `
      window.BOOK_URI = ${JSON.stringify(src.uri)};
      ${injectedJS}
    `;
  } else {
    throw new Error('src must be a base64 or uri');
  }

  function onMessage(event: WebViewMessageEvent) {
    let parsedEvent = JSON.parse(event.nativeEvent.data);

    let { type } = parsedEvent;

    delete parsedEvent.type;

    if (type === 'onStarted') {
      onStarted();
      setIsLoading(true);
    }

    if (type === 'onReady') {
      const { totalLocations, currentLocation, progress } = parsedEvent;
      setIsLoading(false);
      setTotalLocations(totalLocations);
      setCurrentLocation(currentLocation);
      setProgress(progress);

      if (initialLocation) {
        goToLocation(initialLocation);
      }

      return onReady(totalLocations, currentLocation, progress);
    }

    if (type === 'onDisplayError') {
      const { reason } = parsedEvent;
      setIsLoading(false);

      return onDisplayError(reason);
    }

    if (type === 'onResized') {
      const { layout } = parsedEvent;

      return onResized(layout);
    }

    if (type === 'onLocationChange') {
      const { totalLocations, currentLocation, progress } = parsedEvent;
      setTotalLocations(totalLocations);
      setCurrentLocation(currentLocation);
      setProgress(progress);

      if (currentLocation.atStart) setAtStart(true);
      else if (currentLocation.atEnd) setAtEnd(true);
      else {
        setAtStart(false);
        setAtEnd(false);
      }
      return onLocationChange(totalLocations, currentLocation, progress);
    }

    if (type === 'onSearch') {
      const { results } = parsedEvent;

      return onSearch(results);
    }

    if (type === 'onLocationsReady') {
      const { epubKey, locations } = parsedEvent;
      setLocations(locations);

      return onLocationsReady(epubKey, locations);
    }

    if (type === 'onSelected') {
      const { cfiRange, text } = parsedEvent;

      return onSelected(text, cfiRange);
    }

    if (type === 'onMarkPressed') {
      const { cfiRange, text } = parsedEvent;

      return onMarkPressed(cfiRange, text);
    }

    if (type === 'onOrientationChange') {
      const { orientation } = parsedEvent;

      return onOrientationChange(orientation);
    }

    if (type === 'onBeginning') {
      setAtStart(true);

      return onBeginning();
    }

    if (type === 'onFinish') {
      setAtEnd(true);

      return onFinish();
    }

    if (type === 'onRendered') {
      const { section, currentSection } = parsedEvent;

      return onRendered(section, currentSection);
    }

    if (type === 'onLayout') {
      const { layout } = parsedEvent;

      return onLayout(layout);
    }

    if (type === 'onNavigationLoaded') {
      const { toc } = parsedEvent;

      return onNavigationLoaded(toc);
    }
  }

  useEffect(() => {
    if (book.current) registerBook(book.current);
  }, [registerBook]);

  let lastTap: number | null = null;
  let timer: NodeJS.Timeout;

  const handleDoublePress = () => {
    if (lastTap) {
      onDoublePress();
      clearTimeout(timer);
      lastTap = null;
    } else {
      lastTap = Date.now();
      timer = setTimeout(() => {
        onPress();
        lastTap = null;
        clearTimeout(timer);
      }, 300);
    }
  };

  return (
    <GestureRecognizer
      onSwipeLeft={() => {
        goNext();
        onSwipeLeft();
      }}
      onSwipeRight={() => {
        goPrevious();
        onSwipeRight();
      }}
      config={{
        velocityThreshold: 0.1,
        directionalOffsetThreshold: 80,
        enableSwipeLeft: enableSwipe,
        enableSwipeRight: enableSwipe,
      }}
      style={{
        width,
        height,
        position: 'relative',
      }}
    >
      {isLoading && (
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            zIndex: 2,
          }}
        >
          {renderLoadingComponent()}
        </View>
      )}

      <TouchableWithoutFeedback onPress={handleDoublePress}>
        <WebView
          ref={book}
          source={{ html: template }}
          showsVerticalScrollIndicator={false}
          injectedJavaScriptBeforeContentLoaded={injectedJS}
          originWhitelist={['*']}
          scrollEnabled={false}
          mixedContentMode="compatibility"
          onMessage={onMessage}
          allowUniversalAccessFromFileURLs={true}
          allowFileAccessFromFileURLs={true}
          allowFileAccess
          style={{
            width,
            // backgroundColor: theme.body.background,
            height: isLoading ? 0 : height,
          }}
        />
      </TouchableWithoutFeedback>
    </GestureRecognizer>
  );
}
