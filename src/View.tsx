import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  TouchableWithoutFeedback,
  I18nManager,
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
import type { ReaderProps } from './types';
import { OpeningBook } from './utils/OpeningBook';

export type ViewProps = Omit<ReaderProps, 'src' | 'fileSystem'> & {
  templateUri: string;
  allowedUris: string;
};

export function View({
  templateUri,
  allowedUris,
  onStarted = () => {},
  onReady = () => {},
  onDisplayError = () => {},
  onResized = () => {},
  onLocationChange = () => {},
  onRendered = () => {},
  onSearch = () => {},
  onLocationsReady = () => {},
  onSelected = () => {},
  onPressAnnotation = () => {},
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
  defaultTheme = initialTheme,
  renderOpeningBookComponent = () => (
    <OpeningBook width={width} height={height} />
  ),
  onPressExternalLink,
  menuItems,
  onAddAnnotation = () => {},
  onChangeAnnotations = () => {},
  initialAnnotations,
}: ViewProps) {
  const {
    registerBook,
    setTotalLocations,
    setCurrentLocation,
    setMeta,
    setProgress,
    setLocations,
    setAtStart,
    setAtEnd,
    goNext,
    goPrevious,
    isRendering,
    setIsRendering,
    goToLocation,
    changeTheme,
    setKey,
    setSearchResults,
    theme,
    removeSelection,
    setAnnotations,
    setInitialAnnotations,
  } = useContext(ReaderContext);
  const book = useRef<WebView>(null);
  const [selectedText, setSelectedText] = useState<{
    cfiRange: string;
    cfiRangeText: string;
  }>({ cfiRange: '', cfiRangeText: '' });

  const onMessage = (event: WebViewMessageEvent) => {
    const parsedEvent = JSON.parse(event.nativeEvent.data);

    const { type } = parsedEvent;

    delete parsedEvent.type;

    if (type === 'meta') {
      const { metadata } = parsedEvent;
      setMeta(metadata);
    }

    if (type === 'onStarted') {
      setIsRendering(true);

      changeTheme(defaultTheme);

      return onStarted();
    }

    if (type === 'onReady') {
      const { totalLocations, currentLocation, progress } = parsedEvent;
      setIsRendering(false);
      setTotalLocations(totalLocations);
      setCurrentLocation(currentLocation);
      setProgress(progress);

      if (initialAnnotations) {
        setInitialAnnotations(initialAnnotations);
      }

      if (initialLocation) {
        goToLocation(initialLocation);
      }

      return onReady(totalLocations, currentLocation, progress);
    }

    if (type === 'onDisplayError') {
      const { reason } = parsedEvent;
      setIsRendering(false);

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

      setSelectedText({ cfiRange, cfiRangeText: text });
      return onSelected(text, cfiRange);
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

    if (type === 'onAddAnnotation') {
      const { annotation } = parsedEvent;

      return onAddAnnotation(annotation);
    }

    if (type === 'onChangeAnnotations') {
      const { annotations } = parsedEvent;
      setAnnotations(annotations);
      return onChangeAnnotations(annotations);
    }

    if (type === 'onSetInitialAnnotations') {
      const { annotations } = parsedEvent;
      setAnnotations(annotations);
      return () => {};
    }

    if (type === 'onPressAnnotation') {
      const { annotation } = parsedEvent;

      return onPressAnnotation(annotation);
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

  return (
    <GestureHandlerRootView style={{ width, height }}>
      <FlingGestureHandler
        direction={I18nManager.isRTL ? Directions.LEFT : Directions.RIGHT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE && enableSwipe) {
            goPrevious();
            onSwipeRight();
          }
        }}
      >
        <FlingGestureHandler
          direction={I18nManager.isRTL ? Directions.RIGHT : Directions.LEFT}
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
            {isRendering && (
              <RNView
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  zIndex: 2,
                }}
              >
                {renderOpeningBookComponent()}
              </RNView>
            )}

            <TouchableWithoutFeedback onPress={handleDoublePress}>
              <WebView
                ref={book}
                source={{ uri: templateUri }}
                showsVerticalScrollIndicator={false}
                javaScriptEnabled
                originWhitelist={['*']}
                scrollEnabled={false}
                mixedContentMode="compatibility"
                onMessage={onMessage}
                menuItems={menuItems?.map((item, key) => ({
                  label: item.label,
                  key: key.toString(),
                }))}
                onCustomMenuSelection={(event) => {
                  menuItems?.forEach((item) => {
                    if (event.nativeEvent.label === item.label) {
                      const removeSelectionMenu = item.action(
                        selectedText.cfiRange,
                        selectedText.cfiRangeText
                      );

                      if (removeSelectionMenu) {
                        removeSelection();
                      }
                    }
                  });
                }}
                allowingReadAccessToURL={allowedUris}
                allowUniversalAccessFromFileURLs
                allowFileAccessFromFileURLs
                allowFileAccess
                javaScriptCanOpenWindowsAutomatically
                onOpenWindow={(event) => {
                  event.preventDefault();

                  if (onPressExternalLink) {
                    onPressExternalLink(event.nativeEvent.targetUrl);
                  }
                }}
                onShouldStartLoadWithRequest={(request) => {
                  if (
                    !isRendering &&
                    request.mainDocumentURL &&
                    request.url !== request.mainDocumentURL
                  ) {
                    goToLocation(
                      request.url.replace(request.mainDocumentURL, '')
                    );
                  }

                  if (
                    (request.url.includes('mailto:') ||
                      request.url.includes('tel:')) &&
                    onPressExternalLink
                  ) {
                    onPressExternalLink(request.url);
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
