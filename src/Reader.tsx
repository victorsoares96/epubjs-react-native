import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
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
import type { ReaderProps, SearchResult, SelectedText } from './types';

export interface Props {
  /**
   * The url of your ePub to render
   * @param {string} src
   */
  src: string;
  /**
   * Called once the book loads is started
   * @returns {void} void
   */
  onStarted?: () => void;
  /**
   * Emit that rendering has attached to an element
   * @returns {void} void
   */
  onAttached?: () => void;
  /**
   * Called once book has been displayed
   * @returns {void} void
   */
  onDisplayed?: () => void;
  /**
   * Called once book has not been displayed
   * @param {string} reason
   * @returns {void} void
   */
  onDisplayError?: (reason: string) => void;
  /**
   * Emit that a section has been rendered
   * @param {any} section
   * @param {any} view
   * @returns {void} void
   */
  onRendered?: (section: any, view: any) => void;
  /**
   * Emit that a section has been removed
   * @param {any} section
   * @param {any} view
   * @returns {void} void
   */
  onRemoved?: (section: any, view: any) => void;
  /**
   * Emit that the rendition has been resized
   * @param {number} width
   * @param {number} height
   * @returns {void} void
   */
  onResized?: (width: number, height: number) => void;
  /**
   * Called when occurred a page change
   * @param {string} cfi
   * @param {number} progress
   * @param {number} totalPages
   * @returns {void} void
   */
  onLocationChange?: (
    cfi: string,
    progress: number,
    totalPages: number
  ) => void;
  /**
   * Called once when the book has been searched
   * @param {SearchResult[]} results
   * @returns {void} void
   */
  onSearch?: (results: SearchResult[]) => void;
  /**
   * Called once the locations has been generated
   * @param {string} locations
   * @returns {void} void
   */
  onLocationsReady?: (locations: string) => void;
  /**
   * Called once a text selection has occurred
   * @param {SelectedText} selectedText
   * @returns {void} void
   */
  onSelected?: (selectedText: SelectedText) => void;
  /**
   * Called when marked text is pressed
   * @param {SelectedText} selectedText
   * @returns {void} void
   */
  onMarkPressed?: (selectedText: SelectedText) => void;
  /**
   * Called when screen orientation change is detected
   * @param {string} orientation
   * @returns {void} void
   */
  onOrientationChange?: (orientation: '-90' | '0' | '90') => void;
  /**
   * Called when the book was pressed
   * @returns {void} void
   */
  onPress?: () => void;
  /**
   * Called when the book was double pressed
   * @returns {void} void
   */
  onDoublePress?: () => void;
  /**
   * width of the ePub Rendition
   * @param {number} width
   */
  width: number | string;
  /**
   * height of the ePub Rendition
   * @param {number} height
   */
  height: number | string;
  /**
   * Can be an ePubCfi or chapter url
   */
  initialLocation?: string;
  /**
   * Enable swipe actions
   * @default true
   */
  enableSwipe?: boolean;
  /**
   * Called when swipe left gesture is detected
   * @returns {void} void
   */
  onSwipeLeft?: () => void;
  /**
   * Called when swipe right gesture is detected
   * @returns {void} void
   */
  onSwipeRight?: () => void;
  /**
   * Render when the book is loading
   * @returns {React.ReactNode} void
   */
  renderLoadingComponent?: () => React.ReactNode;
}

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
    window.HEIGHT = ${height} + 'px';
    window.WIDTH = ${width} + 'px';
    window.THEME = ${JSON.stringify(theme)};
  `;

  if (currentLocation)
    injectedJS = `${injectedJS}window.BOOK_LOCATION = "${currentLocation}"; true`;

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
    if (initialLocation) goToLocation(initialLocation);
    if (book.current) registerBook(book.current);
  }, [goToLocation, registerBook, initialLocation]);

  useEffect(() => {
    if (initialLocation) setCurrentLocation(initialLocation);
  }, [initialLocation, setCurrentLocation]);

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
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  zIndex: 2,
                }}
              />

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
