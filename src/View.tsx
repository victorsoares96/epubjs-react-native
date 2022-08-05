import React, { useContext, useEffect, useRef } from 'react';
import {
  Alert,
  Text,
  TouchableWithoutFeedback,
  View as RNView,
} from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  GestureHandlerRootView,
  State,
} from 'react-native-gesture-handler';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { defaultTheme as initialTheme, ReaderContext } from './context';
import template from './template';
import type { ReaderProps } from './types';

export function View({
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
  enableSelection = false,
  defaultTheme = initialTheme,
  initialLocations,
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
    changeTheme,
    setKey,
    setSearchResults,
    theme,
  } = useContext(ReaderContext);
  const book = useRef<WebView>(null);

  /* if (src.base64) {
    injectedJS = `
      window.BOOK_BASE64 = ${JSON.stringify(src.base64)};
      ${injectedJS}
    `;
  } else if (src.uri) {
    injectedJS = `
      window.BOOK_FILE = '${src.uri}';
      ${injectedJS}
    `;
  } else {
    throw new Error('src must be a base64 or uri');
  } */

  const onMessage = (event: WebViewMessageEvent) => {
    const parsedEvent = JSON.parse(event.nativeEvent.data);

    const { type } = parsedEvent;

    delete parsedEvent.type;

    if (type === 'onStarted') {
      setIsLoading(true);

      changeTheme(defaultTheme);

      return onStarted();
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
      setSearchResults(results);

      return onSearch(results);
    }

    if (type === 'onLocationsReady') {
      const { epubKey } = parsedEvent;
      setLocations(parsedEvent.locations);
      setKey(epubKey);

      return onLocationsReady(epubKey, parsedEvent.locations);
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

    return () => {};
  };

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

  /* useEffect(() => {
    console.log(src.uri);
    book.current?.injectJavaScript(`alert(window.book) true;`);
  }, [src.uri]); */
  return (
    <GestureHandlerRootView style={{ width, height }}>
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE && enableSwipe) {
            goPrevious();
            onSwipeRight();
          }
        }}
      >
        <FlingGestureHandler
          direction={Directions.LEFT}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE && enableSwipe) {
              goNext();
              onSwipeLeft();
            }
          }}
        >
          <RNView
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {isLoading && (
              <RNView
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  zIndex: 2,
                }}
              >
                <Text>carregando</Text>
              </RNView>
            )}

            <TouchableWithoutFeedback onPress={handleDoublePress}>
              <WebView
                ref={book}
                source={{ html: template, baseUrl: 'file:///' }}
                showsVerticalScrollIndicator={false}
                javaScriptEnabled
                injectedJavaScriptBeforeContentLoaded={`window.book = '${
                  src.uri
                }'; window.theme = ${JSON.stringify(
                  defaultTheme
                )}; window.locations = ${initialLocations}; window.enable_selection = ${enableSelection}; true;`}
                originWhitelist={['*']}
                scrollEnabled={false}
                mixedContentMode="compatibility"
                onMessage={onMessage}
                allowUniversalAccessFromFileURLs
                allowFileAccessFromFileURLs
                allowFileAccess
                onError={(error) => Alert.alert(error.toString())}
                onShouldStartLoadWithRequest={(request) => {
                  if (
                    !isLoading &&
                    request.mainDocumentURL &&
                    request.url !== request.mainDocumentURL
                  ) {
                    goToLocation(
                      request.url.replace(request.mainDocumentURL, '')
                    );
                  }
                  return true;
                }}
                style={{
                  width,
                  backgroundColor: theme.body.background,
                  height,
                }}
              />
            </TouchableWithoutFeedback>
          </RNView>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </GestureHandlerRootView>
  );
}
