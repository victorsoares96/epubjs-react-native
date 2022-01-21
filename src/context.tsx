import React from 'react';
import { createContext, useRef, useState } from 'react';
import type WebView from 'react-native-webview';
import { defaultTheme } from './hooks/useTheme';
import type {
  Annotation,
  Location,
  ePubCfi,
  FontSize,
  ReaderContextProps,
  Theme,
  Themes,
} from './types';

export const BookContext = createContext<ReaderContextProps>({
  registerBook: () => {},
  changeFontSize: () => {},
  changeFontFamily: () => {},
  registerTheme: () => {},
  registerThemes: () => {},
  selectTheme: () => {},
  updateTheme: () => {},
  activeTheme: 'default',
  changeActiveTheme: () => {},
  themes: { defaultTheme },
  goToLocation: () => {},
  goPrevious: () => {},
  goNext: () => {},
  getLocations: () => [] as ePubCfi[],
  search: () => {},
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

export function BookProvider({ children }: { children: React.ReactNode }) {
  const book = useRef<WebView | null>(null);

  const [atStart, setAtStart] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const [totalLocations, setTotalLocations] = useState(0);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [progress, setProgress] = useState(0);
  const [locations, setLocations] = useState<ePubCfi[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [theme, changeTheme] = useTheme(defaultTheme);
  const [themes, changeThemes] = useState<Themes>({ defaultTheme });
  const [activeTheme, changeActiveTheme] = useState('default');

  function registerBook(bookRef: WebView) {
    book.current = bookRef;
  }

  function registerTheme(theme: Theme) {
    book.current?.injectJavaScript(`
      rendition.themes.register('${theme}'); true
    `);
  }

  function registerThemes(themes: Themes) {
    changeThemes({ ...themes });
    book.current?.injectJavaScript(`
      rendition.themes.register('${themes}'); true
    `);
  }

  function changeFontFamily(fontFamily: string) {
    book.current?.injectJavaScript(`
      rendition.themes.font('${fontFamily}');
    `);
  }

  function changeFontSize(size: FontSize) {
    book.current?.injectJavaScript(`
      rendition.themes.fontSize('${size}'); true
    `);
  }

  function selectTheme(name: string) {
    changeActiveTheme(name);
    book.current?.injectJavaScript(`
      rendition.themes.select('${name}'); true
    `);
  }

  function updateTheme(name: string) {
    book.current?.injectJavaScript(`
      window.rendition.themes.update(${name}); true
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
        registerThemes,
        selectTheme,
        updateTheme,
        goToLocation,
        goPrevious,
        goNext,
        getLocations,
        search,
        activeTheme,
        themes,
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
