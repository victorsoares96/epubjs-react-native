import React, { useEffect, useRef } from 'react';
import { Platform, View } from 'react-native';
import {
  GestureHandlerRootView,
  HandlerStateChangeEvent,
  State,
  Swipeable,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
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
  const doubleTapRef = useRef(null);

  let injectedJS = `
    window.BOOK_PATH = "${src}";
    window.LOCATIONS = ${locations};
    window.HEIGHT = ${height * 0.9} + 'px';
    window.WIDTH = ${width} + 'px';
    window.THEME = ${JSON.stringify(theme)};
  `;

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

  const onSingleTapEvent = (
    event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>
  ) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onPress();
    }
  };

  const onDoubleTapEvent = (
    event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>
  ) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onDoublePress();
    }
  };

  const swipeAction = () => <View style={{ width: 0.5 }} />;

  useEffect(() => {
    if (book.current) registerBook(book.current);
  }, [registerBook]);

  useEffect(() => {
    if (initialLocation) goToLocation(initialLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Swipeable
        useNativeAnimations
        // @ts-ignore
        renderLeftActions={enableSwipe && swipeAction}
        // @ts-ignore
        renderRightActions={enableSwipe && swipeAction}
        onSwipeableLeftWillOpen={() => {
          goPrevious();
          onSwipeLeft();
        }}
        onSwipeableRightWillOpen={() => {
          goNext();
          onSwipeRight();
        }}
        overshootLeft={false}
        overshootRight={false}
        childrenContainerStyle={{ flex: 1 }}
        containerStyle={{ flex: 1 }}
      >
        <TapGestureHandler
          onHandlerStateChange={onSingleTapEvent}
          waitFor={doubleTapRef}
        >
          <TapGestureHandler
            ref={doubleTapRef}
            onHandlerStateChange={onDoubleTapEvent}
            numberOfTaps={2}
          >
            <View style={{ flex: 1, position: 'relative' }}>
              {Platform.OS === 'ios' && (
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    zIndex: 2,
                  }}
                />
              )}

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
                  flex: 1,
                  backgroundColor: theme.body.background,
                  height: isLoading ? 0 : '100%',
                }}
              />
            </View>
          </TapGestureHandler>
        </TapGestureHandler>
      </Swipeable>
    </GestureHandlerRootView>
  );
}
