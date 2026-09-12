import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, Platform, View as RNView } from 'react-native';
import { WebView } from 'react-native-webview';
import type {
  ShouldStartLoadRequest,
  WebViewMessageEvent,
} from 'react-native-webview/lib/WebViewTypes';
import { defaultTheme as initialTheme, ReaderContext } from './context';
import type { Bookmark, ReaderProps } from './types';
import { OpeningBook } from './utils/OpeningBook';
import INTERNAL_EVENTS from './utils/internalEvents.util';
import { GestureHandler } from './utils/GestureHandler';
import { SelectionMenu } from './utils/SelectionMenu';
import { SELECTION_MENU_BRIDGE_SCRIPT } from './utils/selectionMenuBridge';
import type { SelectionRect } from './utils/getSelectionMenuPosition';
import { shouldUseIosSelectionOverlay } from './utils/shouldUseIosSelectionOverlay';

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
  onSingleTap = () => {},
  onDoublePress = () => {},
  onDoubleTap = () => {},
  onLongPress = () => {},
  width,
  height,
  initialLocation,
  enableSelection = false,
  enableSwipe = true,
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
  onSwipeUp = () => {},
  onSwipeDown = () => {},
  defaultTheme = initialTheme,
  renderOpeningBookComponent = () => (
    <OpeningBook
      width={width}
      height={height}
      backgroundColor={defaultTheme.body.background}
    />
  ),
  openingBookComponentContainerStyle = {
    width: width || Dimensions.get('screen').width,
    height: height || Dimensions.get('screen').height,
  },
  onPressExternalLink,
  menuItems,
  onAddAnnotation = () => {},
  onChangeAnnotations = () => {},
  initialAnnotations,
  onAddBookmark = () => {},
  onRemoveBookmark = () => {},
  onUpdateBookmark = () => {},
  onChangeBookmarks = () => {},
  onIsBookmarked = () => {},
  initialBookmarks,
  injectedJavascript,
  getInjectionJavascriptFn,
  onWebViewMessage,
  waitForLocationsReady = false,
  keepScrollOffsetOnLocationChange,
  flow,
  onChangeSection = () => {},
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
    section,
    setSection,
    setToc,
    setLandmarks,
    setBookmarks,
    bookmarks,
    setIsBookmarked,
    currentLocation: currLoc,
    setIsSearching,
    setFlow,
  } = useContext(ReaderContext);
  const book = useRef<WebView>(null);
  const [selectedText, setSelectedText] = useState<{
    cfiRange: string;
    cfiRangeText: string;
  }>({ cfiRange: '', cfiRangeText: '' });
  const selectedTextRef = useRef(selectedText);
  selectedTextRef.current = selectedText;
  const useIosSelectionMenu = shouldUseIosSelectionOverlay(
    Platform.OS,
    menuItems
  );
  const [selectionRect, setSelectionRect] = useState<SelectionRect | null>(
    null
  );
  const [isSelectionMenuVisible, setIsSelectionMenuVisible] = useState(false);
  const [viewport, setViewport] = useState({
    width: typeof width === 'number' ? width : 0,
    height: typeof height === 'number' ? height : 0,
  });

  const injectSelectionMenuBridge = () => {
    if (!useIosSelectionMenu) return;
    book.current?.injectJavaScript(SELECTION_MENU_BRIDGE_SCRIPT);
  };

  useEffect(() => {
    setFlow(flow || 'auto');
  }, [flow, setFlow]);

  useEffect(() => {
    if (getInjectionJavascriptFn && book.current) {
      getInjectionJavascriptFn(book.current.injectJavaScript);
    }
  }, [getInjectionJavascriptFn]);

  const handleChangeIsBookmarked = (
    items: Bookmark[],
    currentLoc = currLoc
  ) => {
    const isBookmarked = items.some(
      (bookmark) =>
        bookmark.location.start.cfi === currentLoc?.start.cfi &&
        bookmark.location.end.cfi === currentLoc?.end.cfi
    );

    setIsBookmarked(isBookmarked);
    onIsBookmarked(isBookmarked);
  };

  const onMessage = (event: WebViewMessageEvent) => {
    const parsedEvent = JSON.parse(event.nativeEvent.data);

    const { type } = parsedEvent;

    if (!INTERNAL_EVENTS.includes(type) && onWebViewMessage) {
      return onWebViewMessage(parsedEvent);
    }

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
      if (!waitForLocationsReady) {
        setIsRendering(false);
      }

      if (initialAnnotations) {
        setInitialAnnotations(initialAnnotations);
      }

      if (initialLocation) {
        goToLocation(initialLocation);
      }

      if (injectedJavascript) {
        book.current?.injectJavaScript(injectedJavascript);
      }

      injectSelectionMenuBridge();

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
      const { totalLocations, currentLocation, progress, currentSection } =
        parsedEvent;
      setTotalLocations(totalLocations);
      setCurrentLocation(currentLocation);
      setProgress(progress);
      setSection(currentSection);

      if (section?.href !== currentSection?.href) {
        onChangeSection(currentSection);
      }

      handleChangeIsBookmarked(bookmarks, currentLocation);
      setIsSelectionMenuVisible(false);

      if (currentLocation.atStart) setAtStart(true);
      else if (currentLocation.atEnd) setAtEnd(true);
      else {
        setAtStart(false);
        setAtEnd(false);
      }
      return onLocationChange(
        totalLocations,
        currentLocation,
        progress,
        currentSection
      );
    }

    if (type === 'onSearch') {
      const { results, totalResults } = parsedEvent;
      setSearchResults({ results, totalResults });
      setIsSearching(false);

      return onSearch(results, totalResults);
    }

    if (type === 'onLocationsReady') {
      const { epubKey, totalLocations, currentLocation, progress } =
        parsedEvent;
      setLocations(parsedEvent.locations);
      setKey(epubKey);
      setTotalLocations(totalLocations);
      setCurrentLocation(currentLocation);
      setProgress(progress);

      if (waitForLocationsReady) {
        setIsRendering(false);
      }

      return onLocationsReady(epubKey, parsedEvent.locations);
    }

    if (type === 'onSelected') {
      const { cfiRange, text, rect } = parsedEvent;

      setSelectedText({ cfiRange, cfiRangeText: text });
      if (useIosSelectionMenu && text) {
        setSelectionRect(rect ?? null);
        setIsSelectionMenuVisible(true);
      }
      return onSelected(text, cfiRange);
    }

    if (type === 'onSelectionCleared') {
      setIsSelectionMenuVisible(false);
      return () => {};
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
      const { currentSection } = parsedEvent;
      injectSelectionMenuBridge();

      return onRendered(parsedEvent.section, currentSection);
    }

    if (type === 'onLayout') {
      const { layout } = parsedEvent;

      return onLayout(layout);
    }

    if (type === 'onNavigationLoaded') {
      const { toc, landmarks } = parsedEvent;

      setToc(toc);
      setLandmarks(landmarks);

      return onNavigationLoaded({ toc, landmarks });
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

    if (type === 'onAddBookmark') {
      const { bookmark } = parsedEvent;

      setBookmarks([...bookmarks, bookmark]);
      onAddBookmark(bookmark);
      handleChangeIsBookmarked([...bookmarks, bookmark]);
      return onChangeBookmarks([...bookmarks, bookmark]);
    }

    if (type === 'onRemoveBookmark') {
      const { bookmark } = parsedEvent;

      onRemoveBookmark(bookmark);
      handleChangeIsBookmarked(
        bookmarks.filter(({ id }) => id !== bookmark.id)
      );
      return onChangeBookmarks(
        bookmarks.filter(({ id }) => id !== bookmark.id)
      );
    }

    if (type === 'onRemoveBookmarks') {
      handleChangeIsBookmarked([]);
      return onChangeBookmarks([]);
    }

    if (type === 'onUpdateBookmark') {
      const { bookmark } = parsedEvent;
      const Bookmarks = bookmarks;

      const index = Bookmarks.findIndex((item) => item.id === bookmark.id);
      Bookmarks[index] = bookmark;

      onUpdateBookmark(bookmark);
      handleChangeIsBookmarked(Bookmarks);
      return onChangeBookmarks(Bookmarks);
    }

    return () => {};
  };

  const runMenuItemAction = (label: string) => {
    menuItems?.forEach((item) => {
      if (label === item.label) {
        const removeSelectionMenu = item.action(
          selectedTextRef.current.cfiRange,
          selectedTextRef.current.cfiRangeText
        );

        setIsSelectionMenuVisible(false);

        if (removeSelectionMenu) {
          removeSelection();
        }
      }
    });
  };

  const handleOnCustomMenuSelection = (event: {
    nativeEvent: {
      label: string;
      key: string;
      selectedText: string;
    };
  }) => {
    runMenuItemAction(event.nativeEvent.label);
  };

  const handleOnShouldStartLoadWithRequest = (
    request: ShouldStartLoadRequest
  ) => {
    if (
      !isRendering &&
      request.mainDocumentURL &&
      request.url !== request.mainDocumentURL
    ) {
      goToLocation(request.url.replace(request.mainDocumentURL, ''));
    }

    if (
      (request.url.includes('mailto:') || request.url.includes('tel:')) &&
      onPressExternalLink
    ) {
      onPressExternalLink(request.url);
    }

    return true;
  };

  useEffect(() => {
    if (initialBookmarks) {
      setBookmarks(initialBookmarks);
    }
  }, [initialBookmarks, setBookmarks]);

  useEffect(() => {
    if (book.current) registerBook(book.current);
  }, [registerBook]);

  return (
    <RNView
      style={{ width, height }}
      onLayout={(event) => {
        const { width: nextWidth, height: nextHeight } =
          event.nativeEvent.layout;
        setViewport((current) =>
          current.width === nextWidth && current.height === nextHeight
            ? current
            : { width: nextWidth, height: nextHeight }
        );
      }}
    >
      <GestureHandler
        width={width}
        height={height}
        onSingleTap={() => {
          onPress();
          onSingleTap();
        }}
        onDoubleTap={() => {
          onDoublePress();
          onDoubleTap();
        }}
        onLongPress={onLongPress}
        onSwipeLeft={() => {
          if (enableSwipe) {
            goNext({
              keepScrollOffset: keepScrollOffsetOnLocationChange,
            });
            onSwipeLeft();
          }
        }}
        onSwipeRight={() => {
          if (enableSwipe) {
            goPrevious({
              keepScrollOffset: keepScrollOffsetOnLocationChange,
            });
            onSwipeRight();
          }
        }}
        onSwipeUp={() => {
          if (enableSwipe) {
            onSwipeUp();
          }
        }}
        onSwipeDown={() => {
          if (enableSwipe) {
            onSwipeDown();
          }
        }}
      >
        {isRendering && (
          <RNView
            style={{
              ...openingBookComponentContainerStyle,
              position: 'absolute',
              zIndex: 2,
            }}
          >
            {renderOpeningBookComponent()}
          </RNView>
        )}

        <WebView
          ref={book}
          source={{ uri: templateUri }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          textInteractionEnabled={!!enableSelection}
          allowsLinkPreview={false}
          dataDetectorTypes="none"
          javaScriptEnabled
          originWhitelist={['*']}
          scrollEnabled={false}
          mixedContentMode="compatibility"
          onMessage={onMessage}
          menuItems={
            useIosSelectionMenu
              ? []
              : menuItems?.map((item, key) => ({
                  label: item.label,
                  key: key.toString(),
                }))
          }
          onCustomMenuSelection={
            useIosSelectionMenu ? undefined : handleOnCustomMenuSelection
          }
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
          onShouldStartLoadWithRequest={handleOnShouldStartLoadWithRequest}
          style={{
            width,
            backgroundColor: theme.body.background,
            height,
          }}
        />
      </GestureHandler>
      {useIosSelectionMenu && isSelectionMenuVisible && menuItems && (
        <SelectionMenu
          items={menuItems}
          selection={selectionRect}
          viewport={viewport}
          onPressItem={runMenuItemAction}
        />
      )}
    </RNView>
  );
}
