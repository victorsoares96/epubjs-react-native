import React from 'react';
import { createContext, useEffect, useRef, useState } from 'react';
import type WebView from 'react-native-webview';
import { defaultTheme as initialTheme, useTheme } from './hooks/useTheme';
import type {
  Annotation,
  Location,
  ePubCfi,
  FontSize,
  ReaderContextProps,
  Theme,
} from './types';

export const BookContext = createContext<ReaderContextProps>({
  registerBook: () => {},
  changeFontSize: () => {},
  changeFontFamily: () => {},
  registerTheme: () => {},
  selectTheme: () => {},
  updateTheme: () => {},
  goToLocation: () => {},
  goPrevious: () => {},
  goNext: () => {},
  getLocations: () => [] as ePubCfi[],
  search: () => {},
  theme: initialTheme,
  // changeTheme: () => {},
  currentLocation: null,
  setCurrentLocation: () => {},
  progress: 0,
  setProgress: () => {},
  isLoading: false,
  setIsLoading: () => {},
  locations: [],
  setLocations: () => {},
  totalLocations: 0,
  setTotalLocations: () => {},
  getCurrentLocation: () => ({
    atStart: false,
    atEnd: false,
    end: {
      cfi: '',
      displayed: {
        page: 0,
        total: 0,
      },
      href: '',
      index: 0,
      location: 0,
      percentage: 0,
    },
    start: {
      cfi: '',
      displayed: {
        page: 0,
        total: 0,
      },
      href: '',
      index: 0,
      location: 0,
      percentage: 0,
    },
  }),
  atStart: false,
  setAtStart: () => {},
  atEnd: false,
  setAtEnd: () => {},
} as ReaderContextProps);

export function BookProvider({
  children,
  defaultTheme = initialTheme,
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
}) {
  const book = useRef<WebView | null>(null);

  const [atStart, setAtStart] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const [totalLocations, setTotalLocations] = useState(0);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [progress, setProgress] = useState(0);
  const [locations, setLocations] = useState<ePubCfi[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [theme, changeTheme] = useTheme(defaultTheme);

  /*useEffect(() => {
    console.log(`
    rendition.themes.register("myTheme", ${JSON.stringify(defaultTheme)});
    rendition.themes.select("myTheme"); true
  `);
  }, [defaultTheme]);
  */

  function registerBook(bookRef: WebView) {
    book.current = bookRef;
  }

  function changeFontFamily(fontFamily: string) {
    book.current?.injectJavaScript(`
      window.rendition.themes.font('${fontFamily}');
    `);
  }

  function changeFontSize(size: FontSize) {
    book.current?.injectJavaScript(`
      window.rendition.themes.fontSize('${size}'); true
    `);
  }

  function registerTheme(name: string, theme: Theme) {
    book.current?.injectJavaScript(`
      rendition.themes.register(${name}, ${theme});
    `);
  }

  function selectTheme(name: string) {
    book.current?.injectJavaScript(`
      rendition.themes.select(${name});
    `);
  }

  function updateTheme(name: string) {
    book.current?.injectJavaScript(`
      window.rendition.themes.register("myTheme", ${JSON.stringify(
        defaultTheme
      )});
      window.rendition.themes.select("myTheme"); true
    `);
    /*book.current?.injectJavaScript(`
      window.rendition.themes.update(${name}); true
    `);*/
  }

  function addAnnotation(
    type: Annotation,
    cfiRange: string,
    data: any,
    callback?: () => void,
    className?: string,
    styles?: any
  ) {
    const defaultStyles = { fill: 'yellow' };

    book.current?.injectJavaScript(`
      rendition.annotations.add(
        ${type},
        ${cfiRange},
        { data: "${data}" },
        (e) => ${callback && callback()},
        ${className},
        ${styles || defaultStyles}
      );
    `);
  }

  function removeAnnotation(cfiRange: string, type: Annotation) {
    book.current?.injectJavaScript(`
      rendition.annotations.remove(${cfiRange}, ${type});
    `);
  }

  /*useEffect(() => {
    changeTheme(defaultTheme);
  }, [defaultTheme]);*/

  function goToLocation(target: ePubCfi | string) {
    book.current?.injectJavaScript(
      `window.rendition.display('${target}'); true`
    );
  }

  function goPrevious() {
    book.current?.injectJavaScript(`window.rendition.prev(); true`);
  }

  function goNext() {
    book.current?.injectJavaScript(`window.rendition.next(); true`);
  }

  function getLocations() {
    return locations;
  }

  function getCurrentLocation() {
    return currentLocation;
  }

  function search(query: string) {
    book.current?.injectJavaScript(`
      Promise.all(
        window.book.spine.spineItems.map((item) => {
          return item.load(window.book.load.bind(window.book)).then(() => {
            let results = item.find('${query}'.trim());
            item.unload();
            return Promise.resolve(results);
          });
        })
      ).then((results) =>
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: 'onSearch', results: [].concat.apply([], results) })
        )
      ); true
    `);
  }
  return (
    <BookContext.Provider
      value={{
        registerBook,
        changeFontSize,
        changeFontFamily,
        registerTheme,
        selectTheme,
        updateTheme,
        goToLocation,
        goPrevious,
        goNext,
        getLocations,
        search,
        theme,
        currentLocation,
        setCurrentLocation,
        progress,
        setProgress,
        isLoading,
        setIsLoading,
        locations,
        setLocations,
        totalLocations,
        setTotalLocations,
        getCurrentLocation,
        atStart,
        setAtStart,
        atEnd,
        setAtEnd,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
