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

    delete parsedEvent.type;

    if (type === 'started') {
      onStarted();
      setIsLoading(true);
    }

    if (type === 'attached') {
      onAttached();
    }

    if (
      type === 'displayed' ||
      type === 'displayError' ||
      type === 'rendered'
    ) {
      setIsLoading(false);
    }

    if (type === 'displayed') {
      onDisplayed();
    }

    if (type === 'displayError') {
      onDisplayError(parsedEvent.section);
    }

    if (type === 'rendered') {
      onRendered(parsedEvent.section, parsedEvent.view);
    }

    if (type === 'search') {
      const results = parsedEvent.results;

      return onSearch(results);
    }

    if (type === 'relocated') {
      setCurrentPage(parsedEvent.currentPage);
      setTotalPages(parsedEvent.totalPages);
      setProgress(parsedEvent.progress);
      setCurrentLocation(parsedEvent.cfi);
    }

    if (type === 'locations') {
      if (isLoading) {
        setIsLoading(parsedEvent.isLoading);
        setTotalPages(parsedEvent.totalPages);
        setLocations(parsedEvent.locations);
      }

      return onLocationsReady(parsedEvent.locations);
    }

    if (type === 'selected') {
      const { cfi, text } = parsedEvent as SelectedText;

      book.current?.injectJavaScript(`
        window.rendition.annotations.remove("${cfi}", "highlight");
        window.rendition.annotations.add("highlight", "${cfi}", {data: "${text}"}, (e) => {}, "", { "fill": "${theme['::selection'].background}" });
        true
      `);

      return onSelected(parsedEvent);
    }

    if (type === 'markClicked') {
      return onMarkPressed(parsedEvent);
    }

    if (type === 'isLoading') {
      return setIsLoading(parsedEvent.isLoading);
    }

    if (type === 'orientation') {
      return onOrientationChange(parsedEvent.orientation);
    }
  }

  useEffect(() => {
    if (book.current) registerBook(book.current);
  }, [registerBook]);

  useEffect(() => {
    if (initialLocation) goToLocation(initialLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            backgroundColor: theme.body.background,
            height: isLoading ? 0 : height,
          }}
        />
      </TouchableWithoutFeedback>
    </GestureRecognizer>
  );
}
