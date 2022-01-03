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
// import template from './template';
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
                source={{
                  html: `<!DOCTYPE html>
                <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="apple-mobile-web-app-capable" content="yes" />
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <title>EPUB.js</title>
                  <script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
                  <script src="https://cdnjs.cloudflare.com/ajax/libs/detect_swipe/2.1.1/jquery.detect_swipe.min.js"></script>
                  <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js"></script>
                  <script src="https://cdn.jsdelivr.net/npm/epubjs/dist/epub.min.js"></script>

                  <style>
                    body {
                      width: 100vw;
                      min-height: 100vh;
                      margin: 0;
                      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                      color: #333;
                    }

                    #title {
                      width: 900px;
                      min-height: 18px;
                      margin: 10px auto;
                      text-align: center;
                      font-size: 16px;
                      color: #E2E2E2;
                      font-weight: 400;
                    }

                    #title:hover {
                      color: #777;
                    }

                    #viewer.spreads {
                      width: 900px;
                      height: 600px;
                      box-shadow: 0 0 4px #ccc;
                      border-radius: 5px;
                      padding: 0;
                      position: relative;
                      margin: 10px auto;
                      background: white url('ajax-loader.gif') center center no-repeat;
                      top: calc(50vh - 400px);
                    }

                    #viewer.spreads .epub-view>iframe {
                      background: white;
                    }

                    #viewer.scrolled {
                      overflow: hidden;
                      width: 800px;
                      margin: 0 auto;
                      position: relative;
                      background: url('ajax-loader.gif') center center no-repeat;
                      box-shadow: 0 0 4px #ccc;
                      padding: 20px;
                      background: white;
                    }

                    #viewer.scrolled .epub-view>iframe {
                      background: white;
                    }

                    #prev {
                      left: 0;
                    }

                    #next {
                      right: 0;
                    }

                    #toc {
                      display: block;
                      margin: 10px auto;
                    }

                    @media (min-width: 1000px) {
                      #viewer.spreads:after {
                        position: absolute;
                        width: 1px;
                        border-right: 1px #000 solid;
                        height: 90%;
                        z-index: 1;
                        left: 50%;
                        margin-left: -1px;
                        top: 5%;
                        opacity: .15;
                        box-shadow: -2px 0 15px rgba(0, 0, 0, 1);
                        content: "";
                      }

                      #viewer.spreads.single:after {
                        display: none;
                      }

                      #prev {
                        left: 40px;
                      }

                      #next {
                        right: 40px;
                      }
                    }

                    .arrow {
                      position: fixed;
                      top: 50%;
                      margin-top: -32px;
                      font-size: 64px;
                      color: #E2E2E2;
                      font-family: arial, sans-serif;
                      font-weight: bold;
                      cursor: pointer;
                      -webkit-user-select: none;
                      -moz-user-select: none;
                      user-select: none;
                      text-decoration: none;
                    }

                    .navlink {
                      margin: 14px;
                      display: block;
                      text-align: center;
                      text-decoration: none;
                      color: #ccc;
                    }

                    .arrow:hover,
                    .navlink:hover {
                      color: #777;
                    }

                    .arrow:active,
                    .navlink:hover {
                      color: #000;
                    }

                    #book-wrapper {
                      width: 480px;
                      height: 640px;
                      overflow: hidden;
                      border: 1px solid #ccc;
                      margin: 28px auto;
                      background: #fff;
                      border-radius: 0 5px 5px 0;
                      position: absolute;
                    }

                    #book-viewer {
                      width: 480px;
                      height: 660px;
                      margin: -30px auto;
                      -moz-box-shadow: inset 10px 0 20px rgba(0, 0, 0, .1);
                      -webkit-box-shadow: inset 10px 0 20px rgba(0, 0, 0, .1);
                      box-shadow: inset 10px 0 20px rgba(0, 0, 0, .1);
                    }

                    #book-viewer iframe {
                      padding: 40px 40px;
                    }

                    #controls {
                      position: absolute;
                      bottom: 16px;
                      left: 50%;
                      width: 400px;
                      margin-left: -200px;
                      text-align: center;
                      display: none;
                    }

                    #controls>input[type=range] {
                      width: 400px;
                    }

                    #navigation {
                      width: 400px;
                      height: 100vh;
                      position: absolute;
                      overflow: auto;
                      top: 0;
                      left: 0;
                      background: #777;
                      -webkit-transition: -webkit-transform .25s ease-out;
                      -moz-transition: -moz-transform .25s ease-out;
                      -ms-transition: -moz-transform .25s ease-out;
                      transition: transform .25s ease-out;

                    }

                    #navigation.fixed {
                      position: fixed;
                    }

                    #navigation h1 {
                      width: 200px;
                      font-size: 16px;
                      font-weight: normal;
                      color: #fff;
                      margin-bottom: 10px;
                    }

                    #navigation h2 {
                      font-size: 14px;
                      font-weight: normal;
                      color: #B0B0B0;
                      margin-bottom: 20px;
                    }

                    #navigation ul {
                      padding-left: 36px;
                      margin-left: 0;
                      margin-top: 12px;
                      margin-bottom: 12px;
                      width: 340px;
                    }

                    #navigation ul li {
                      list-style: decimal;
                      margin-bottom: 10px;
                      color: #cccddd;
                      font-size: 12px;
                      padding-left: 0;
                      margin-left: 0;
                    }

                    #navigation ul li a {
                      color: #ccc;
                      text-decoration: none;
                    }

                    #navigation ul li a:hover {
                      color: #fff;
                      text-decoration: underline;
                    }

                    #navigation ul li a.active {
                      color: #fff;
                    }

                    #navigation #cover {
                      display: block;
                      margin: 24px auto;
                    }

                    #navigation #closer {
                      position: absolute;
                      top: 0;
                      right: 0;
                      padding: 12px;
                      color: #cccddd;
                      width: 24px;
                    }

                    #navigation.closed {
                      -webkit-transform: translate(-400px, 0);
                      -moz-transform: translate(-400px, 0);
                      -ms-transform: translate(-400px, 0);
                      transform: translate(-400px, 0);
                    }

                    svg {
                      display: block;
                    }

                    .close-x {
                      stroke: #cccddd;
                      fill: transparent;
                      stroke-linecap: round;
                      stroke-width: 5;
                    }

                    .close-x:hover {
                      stroke: #fff;
                    }

                    #opener {
                      position: absolute;
                      top: 0;
                      left: 0;
                      padding: 10px;
                      stroke: #E2E2E2;
                      fill: #E2E2E2;

                    }

                    #opener:hover {
                      stroke: #777;
                      fill: #777;
                    }
                  </style>

                  <style type="text/css">
                    body {
                      display: flex;
                      -webkit-align-items: center;
                      -webkit-justify-content: center;
                      overflow: hidden;
                    }

                    #viewer {
                      width: 100%;
                      height: 100%;
                    }


                    @media only screen and (min-device-width : 320px) and (max-device-width : 667px) {
                      #viewer iframe {
                        /* pointer-events: none; */
                      }

                      .arrow {
                        position: inherit;
                        display: none;
                      }
                    }
                  </style>
                </head>

                <body>
                  <div id="viewer"></div>
                  <!--<div id="prev" class="arrow">‹</div>-->
                  <!--<div id="next" class="arrow">›</div>-->
                  <script>
                    document.getElementById('viewer').style.width = window.WIDTH;
                    document.getElementById('viewer').style.height = window.HEIGHT;
                    var book = ePub(window.BOOK_PATH);
                    var rendition = book.renderTo("viewer", {
                      manager: "continuous",
                      flow: "paginated",
                      width: "100%",
                      height: "100%",
                      snap: true
                    });

                    var displayed = rendition.display();

                    displayed.then(function (renderer) {
                      window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: "displayed",
                      }));
                      rendition.themes.register({ theme: window.THEME });
                      rendition.themes.select('theme');
                    })
                    .catch(function (reason) {
                      window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: "displayError",
                        reason: reason
                      }));
                    });

                    book.loaded.navigation.then(function (toc) {
                      window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: "navigationLoaded",
                        toc: toc,
                      }));
                    });
                    if (window.LOCATIONS) {
                      window.book.locations.load(window.LOCATIONS);
                    } else {
                      window.book.ready.then(() => {
                        window.book.locations.generate(1650).then(() => {
                          window.ReactNativeWebView.postMessage(
                            JSON.stringify({
                              type: 'locations',
                              current: window.book.locations.currentLocation(),
                              locations: window.book.locations.save(),
                            })
                          );
                        });
                      });
                    }
                    rendition.on('started', () => {
                      window.rendition.display(window.BOOK_LOCATION)

                      rendition.themes.register({ theme: window.THEME });
                      rendition.themes.select('theme');
                      window.ReactNativeWebView.postMessage(
                        JSON.stringify({ type: 'started' })
                      );
                    });
                    rendition.on('attached', () => {
                      window.ReactNativeWebView.postMessage(
                        JSON.stringify({ type: 'attached' })
                      );
                    });
                    rendition.on('rendered', (section, view) => {
                      window.ReactNativeWebView.postMessage(
                        JSON.stringify({ type: 'rendered', section: section, view: view })
                      );
                    });

                    rendition.on('relocated', function (e) {
                      window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: 'relocated',
                        cfi: e.start.cfi,
                        currentPage: e.start.location + 1,
                        totalPages: window.book.locations.length(),
                        progress: Math.round(e.start.percentage * 100),
                      }));
                    });
                    rendition.on('orientationchange', function (orientation) {
                      window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: 'orientation',
                        orientation: orientation
                      }));
                    });
                    rendition.on("selected", function(cfiRange, contents) {
                      book.getRange(cfiRange).then(function (range) {
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                          type: 'selected',
                          cfi: cfiRange,
                          text: range.toString(),
                          totalPages: window.book.locations.length(),
                          progress: window.book.locations.percentageFromCfi(cfiRange),
                          location: window.book.locations.locationFromCfi(cfiRange),
                          currentDate: new Date()
                        }));
                      });
                      contents.window.getSelection().removeAllRanges();
                    });

                    rendition.on("markClicked", function (cfiRange, data, contents) {
                      window.book.getRange(cfiRange).then((range) => {
                        window.ReactNativeWebView.postMessage(
                          JSON.stringify({
                            type: 'markClicked',
                            cfi: cfiRange,
                            text: range.toString(),
                            totalPages: window.book.locations.length(),
                            progress: window.book.locations.percentageFromCfi(cfiRange),
                            location: window.book.locations.locationFromCfi(cfiRange),
                            currentDate: new Date()
                          })
                        );
                      });
                    });

                    var next = document.getElementById("next");
                    next.addEventListener("click", function () {
                      rendition.next();
                    }, false);

                    var prev = document.getElementById("prev");
                    prev.addEventListener("click", function () {
                      rendition.prev();
                    }, false);

                    document.addEventListener("keyup", function (e) {
                      // Left Key
                      if ((e.keyCode || e.which) == 37) {
                        rendition.prev();
                      }

                      // Right Key
                      if ((e.keyCode || e.which) == 39) {
                        rendition.next();
                      }
                    }, false);

                    $(window).on( "swipeleft", function( event ) {
                      rendition.next();
                    });
                    $(window).on( "swiperight", function( event ) {
                      rendition.prev();
                    });
                  </script>
                </body>
              </html>`,
                }}
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
