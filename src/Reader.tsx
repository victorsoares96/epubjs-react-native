import React, { useEffect, useRef } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import GestureRecognizer from 'react-native-swipe-detect';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { useBook } from './hooks/useBook';
import template from './template';
import type { ReaderProps, SelectedText } from './types';

export function Reader({
  src,
  onStarted = () => {},
  onAttached = () => {},
  onDisplayed = () => {},
  onDisplayError = () => {},
  onRendered = () => {},
  onSearch = () => {},
  onLocationsReady = () => {},
  onSelected = () => {},
  onMarkPressed = () => {},
  onOrientationChange = () => {},
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
}: ReaderProps) {
  const {
    theme,
    registerBook,
    setCurrentPage,
    setTotalPages,
    setProgress,
    progress,
    isLoading,
    setIsLoading,
    currentLocation,
    setCurrentLocation,
    locations,
    setLocations,
    goToLocation,
    goPrevious,
    goNext,
  } = useBook();
  const book = useRef<WebView>(null);

  let injectedJS = `
    window.LOCATIONS = ${locations};
    window.THEME = ${JSON.stringify(theme)};
    window.ENABLE_SELECTION = ${enableSelection};
  `;

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

  if (initialLocation) {
    injectedJS = `${injectedJS}window.BOOK_LOCATION = "${initialLocation}"; true`;
  } else if (currentLocation) {
    injectedJS = `${injectedJS}window.BOOK_LOCATION = "${currentLocation}"; true`;
  }

  function onMessage(event: WebViewMessageEvent) {
    let parsedEvent = JSON.parse(event.nativeEvent.data);

    let { type } = parsedEvent;

    console.log(parsedEvent);

    delete parsedEvent.type;

    if (type === 'onStarted') {
      onStarted();
      setIsLoading(true);
    }

    if (type === 'onReady') {
      const { totalLocations, currentLocation, progress } = parsedEvent;
      setIsLoading(false);
      onReady({
        totalLocations,
        currentLocation,
        progress,
      });
    }

    if (type === 'onLocationsReady') {
      const { epubKey, locations } = parsedEvent;
      if (isLoading) {
        setIsLoading(parsedEvent.isLoading);
        setTotalPages(parsedEvent.totalPages);
        setLocations(parsedEvent.locations);
      }
      onLocationsReady({
        epubKey,
        locations,
      });
    }

    if (type === 'onLocationChange') {
      const { totalLocations, currentLocation, progress } = parsedEvent;
      setCurrentPage(parsedEvent.currentPage);
      setTotalPages(parsedEvent.totalPages);
      setProgress(parsedEvent.progress);
      setCurrentLocation(parsedEvent.cfi);

      onLocationChange({
        totalLocations,
        currentLocation,
        progress,
      });
    }

    if (type === 'onBeginning') {
      onBeginning();
    }

    if (type === 'onFinish') {
      onFinish();
    }

    if (type === 'onRendered') {
      const { section, currentSection } = parsedEvent;
      onRendered({
        section,
        currentSection,
      });
    }

    if (type === 'onLayout') {
      const { layout } = parsedEvent;
      onLayout({
        layout,
      });
    }

    if (type === 'onSelected') {
      const { cfiRange, text } = parsedEvent;
      onSelected({
        cfiRange,
        text,
      });
    }

    if (type === 'onMarkPressed') {
      const { cfiRange, text } = parsedEvent;
      onMarkPressed({
        cfiRange,
        text,
      });
    }

    if (type === 'onResized') {
      const { layout } = parsedEvent;
      onResized({
        layout,
      });
    }

    if (type === 'onNavigationLoaded') {
      const { toc } = parsedEvent;
      onNavigationLoaded({
        toc,
      });
    }

    if (type === 'onDisplayError') {
      const { reason } = parsedEvent;
      setIsLoading(false);
      onDisplayError({
        reason,
      });
    }

    if (type === 'onSearch') {
      const { results } = parsedEvent;

      return onSearch(results);
    }

    if (type === 'onOrientationChange') {
      const { orientation } = parsedEvent;
      return onOrientationChange(orientation);
    }
  }

  useEffect(() => {
    if (book.current) registerBook(book.current);
  }, [registerBook]);

  useEffect(() => {
    if (initialLocation) goToLocation(initialLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

  console.log('locations: ', locations);

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
      {!isLoading && (
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
            backgroundColor: theme.body.background,
            height: isLoading ? 0 : height,
          }}
        />
      </TouchableWithoutFeedback>
    </GestureRecognizer>
  );
}
