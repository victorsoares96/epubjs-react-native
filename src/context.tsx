import React from 'react';
import { createContext, useEffect, useRef, useState } from 'react';
import type WebView from 'react-native-webview';
import { defaultTheme as initialTheme, useTheme } from './hooks/useTheme';
import type {
  Annotation,
  ePubCfi,
  FontSize,
  Location,
  ReaderContextProps,
  Theme,
} from './types';

export const BookContext = createContext<ReaderContextProps>({
  registerBook: () => {},
  changeFontSize: () => {},
  changeFontFamily: () => {},
  goToLocation: () => {},
  goToPage: () => {},
  goPrevious: () => {},
  goNext: () => {},
  goToNote: () => {},
  savePage: () => {},
  search: () => {},
  theme: initialTheme,
  changeTheme: () => {},
  currentLocation: null,
  setCurrentLocation: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  totalPages: 0,
  setTotalPages: () => {},
  progress: 1,
  setProgress: () => {},
  isLoading: false,
  setIsLoading: () => {},
  locations: null,
  setLocations: () => {},
  getCurrentLocation: () => {
    return {
      cfi: '',
      currentPage: 1,
      progress: 1,
      date: new Date(),
    };
  },
} as ReaderContextProps);

export function BookProvider({
  children,
  defaultTheme = initialTheme,
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
}) {
  const book = useRef<WebView | null>(null);

  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [locations, setLocations] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [progress, setProgress] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [theme, changeTheme] = useTheme(defaultTheme);

  function registerBook(bookRef: WebView) {
    book.current = bookRef;
  }

  function changeFontFamily(fontFamily: string) {
    book.current?.injectJavaScript(`
      rendition.themes.font(${fontFamily});
    `);
  }

  function changeFontSize(size: FontSize) {
    book.current?.injectJavaScript(`
      rendition.themes.fontSize(${size});
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

  function updateTheme(theme: Theme) {
    book.current?.injectJavaScript(`
      rendition.themes.update(${theme});
    `);
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
    updateTheme(theme);
  }, [theme]);*/

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

  function getCurrentLocation() {
    return { cfi: currentLocation, currentPage, progress, date: new Date() };
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
        goToLocation,
        goPrevious,
        goNext,
        search,
        theme,
        changeTheme,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        progress,
        setProgress,
        isLoading,
        setIsLoading,
        currentLocation,
        setCurrentLocation,
        locations,
        setLocations,
        getCurrentLocation,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
