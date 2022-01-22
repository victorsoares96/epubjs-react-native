import React, { createContext, useReducer, useRef } from 'react';
import type WebView from 'react-native-webview';
import type { ePubCfi, FontSize, Location, Theme, Themes } from './types';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

enum Types {
  REGISTER_THEME = 'REGISTER_THEME',
  REGISTER_THEMES = 'REGISTER_THEMES',
  SELECT_THEME = 'SELECT_THEME',
  CHANGE_FONT_SIZE = 'CHANGE_FONT_SIZE',
  CHANGE_FONT_FAMILY = 'CHANGE_FONT_FAMILY',
  SET_AT_START = 'SET_AT_START',
  SET_AT_END = 'SET_AT_END',
  SET_TOTAL_LOCATIONS = 'SET_TOTAL_LOCATIONS',
  SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION',
  SET_PROGRESS = 'SET_PROGRESS',
  SET_LOCATIONS = 'SET_LOCATIONS',
  SET_IS_LOADING = 'SET_IS_LOADING',
}

type BookPayload = {
  [Types.REGISTER_THEME]: Theme;
  [Types.REGISTER_THEMES]: Themes;
  [Types.SELECT_THEME]: string;
  [Types.CHANGE_FONT_SIZE]: FontSize;
  [Types.CHANGE_FONT_FAMILY]: string;
  [Types.SET_AT_START]: boolean;
  [Types.SET_AT_END]: boolean;
  [Types.SET_TOTAL_LOCATIONS]: number;
  [Types.SET_CURRENT_LOCATION]: Location;
  [Types.SET_PROGRESS]: number;
  [Types.SET_LOCATIONS]: ePubCfi[];
  [Types.SET_IS_LOADING]: boolean;
};

type BookActions = ActionMap<BookPayload>[keyof ActionMap<BookPayload>];

type InitialState = {
  themes: Themes;
  activeTheme: string;
  fontFamily: string;
  fontSize: FontSize;
  atStart: boolean;
  atEnd: boolean;
  totalLocations: number;
  currentLocation: Location | null;
  progress: number;
  locations: ePubCfi[];
  isLoading: boolean;
};

export const defaultTheme: Theme = {
  default: {
    'body': {
      background: '#fff',
    },
    'span': {
      color: '#000 !important',
    },
    'p': {
      color: '#000 !important',
    },
    'li': {
      color: '#000 !important',
    },
    'h1': {
      color: '#000 !important',
    },
    'a': {
      'color': '#000 !important',
      'pointer-events': 'auto',
      'cursor': 'pointer',
    },
    '::selection': {
      background: 'lightskyblue',
    },
  },
};

const initialState: InitialState = {
  themes: defaultTheme,
  activeTheme: 'default',
  fontFamily: 'Helvetica',
  fontSize: '12pt',
  atStart: false,
  atEnd: false,
  totalLocations: 0,
  currentLocation: null,
  progress: 0,
  locations: [],
  isLoading: false,
};

function bookReducer(state: InitialState, action: BookActions): InitialState {
  switch (action.type) {
    case Types.REGISTER_THEMES:
      return {
        ...state,
        themes: action.payload,
      };
    case Types.REGISTER_THEME:
      return {
        ...state,
        themes: { ...state.themes, ...action.payload },
      };
    case Types.SELECT_THEME:
      return {
        ...state,
        activeTheme: action.payload,
      };
    case Types.CHANGE_FONT_SIZE:
      return {
        ...state,
        fontSize: action.payload,
      };
    case Types.CHANGE_FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.payload,
      };
    case Types.SET_AT_START:
      return {
        ...state,
        atStart: action.payload,
      };
    case Types.SET_AT_END:
      return {
        ...state,
        atEnd: action.payload,
      };
    case Types.SET_TOTAL_LOCATIONS:
      return {
        ...state,
        totalLocations: action.payload,
      };
    case Types.SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
      };
    case Types.SET_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    case Types.SET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };
    case Types.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}

interface ReaderContextProps {
  registerBook: (bookRef: WebView) => void;
  setAtStart: (atStart: boolean) => void;
  setAtEnd: (atEnd: boolean) => void;
  setTotalLocations: (totalLocations: number) => void;
  setCurrentLocation: (location: Location) => void;
  setProgress: (progress: number) => void;
  setLocations: (locations: ePubCfi[]) => void;
  setIsLoading: (isLoading: boolean) => void;

  goToLocation: (cfi: ePubCfi) => void;
  goPrevious: () => void;
  goNext: () => void;
  getLocations: () => ePubCfi[];
  getCurrentLocation: () => Location | null;
  search: (query: string) => void;

  registerTheme: (theme: Theme) => void;
  registerThemes: (themes: Themes) => void;
  selectTheme: (theme: string) => void;
  changeFontFamily: (fontFamily: string) => void;
  changeFontSize: (size: FontSize) => void;
  updateTheme: (name: string) => void;

  themes: Themes;
  activeTheme: string;
  atStart: boolean;
  atEnd: boolean;
  totalLocations: number;
  currentLocation: Location | null;
  progress: number;
  locations: ePubCfi[];
  isLoading: boolean;
}

const ReaderContext = createContext<ReaderContextProps>({
  registerBook: () => {},
  setAtStart: () => {},
  setAtEnd: () => {},
  setTotalLocations: () => {},
  setCurrentLocation: () => {},
  setProgress: () => {},
  setLocations: () => {},
  setIsLoading: () => {},

  goToLocation: () => {},
  goPrevious: () => {},
  goNext: () => {},
  getLocations: () => [],
  getCurrentLocation: () => null,
  search: () => {},

  registerTheme: () => {},
  registerThemes: () => {},
  selectTheme: () => {},
  changeFontFamily: () => {},
  changeFontSize: () => {},
  updateTheme: () => {},

  themes: defaultTheme,
  activeTheme: 'default',
  atStart: false,
  atEnd: false,
  totalLocations: 0,
  currentLocation: null,
  progress: 0,
  locations: [],
  isLoading: false,
});

const ReaderProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);
  const book = useRef<WebView | null>(null);

  function registerBook(bookRef: WebView) {
    book.current = bookRef;
  }

  function registerTheme(theme: Theme) {
    book.current?.injectJavaScript(`
      rendition.themes.register('${JSON.stringify(theme)}');
    `);
    dispatch({ type: Types.REGISTER_THEME, payload: theme });
  }

  function registerThemes(themes_: Themes) {
    book.current?.injectJavaScript(`
      window.THEMES = ${JSON.stringify(themes_)};
      window.rendition.themes.register('${JSON.stringify(themes_)}'); true
    `);
    dispatch({ type: Types.REGISTER_THEMES, payload: themes_ });
  }

  function selectTheme(name: string) {
    book.current?.injectJavaScript(`
      window.ACTIVE_THEME = '${name}';
      window.rendition.themes.select('${name}'); true
    `);
    book.current?.forceUpdate();
    dispatch({ type: Types.SELECT_THEME, payload: name });
  }

  function changeFontFamily(fontFamily: string) {
    book.current?.injectJavaScript(`
      rendition.themes.font('${fontFamily}');
    `);
    dispatch({ type: Types.CHANGE_FONT_FAMILY, payload: fontFamily });
  }

  function changeFontSize(size: FontSize) {
    book.current?.injectJavaScript(`
      rendition.themes.fontSize('${size}'); true
    `);
    dispatch({ type: Types.CHANGE_FONT_SIZE, payload: size });
  }

  function updateTheme(name: string) {
    book.current?.injectJavaScript(`
      rendition.themes.update('${name}'); true
    `);
  }

  function setAtStart(atStart: boolean) {
    dispatch({ type: Types.SET_AT_START, payload: atStart });
  }

  function setAtEnd(atEnd: boolean) {
    dispatch({ type: Types.SET_AT_END, payload: atEnd });
  }

  function setTotalLocations(totalLocations: number) {
    dispatch({ type: Types.SET_TOTAL_LOCATIONS, payload: totalLocations });
  }

  function setCurrentLocation(location: Location) {
    dispatch({ type: Types.SET_CURRENT_LOCATION, payload: location });
  }

  function setProgress(progress: number) {
    dispatch({ type: Types.SET_PROGRESS, payload: progress });
  }

  function setLocations(locations: ePubCfi[]) {
    dispatch({ type: Types.SET_LOCATIONS, payload: locations });
  }

  function setIsLoading(isLoading: boolean) {
    dispatch({ type: Types.SET_IS_LOADING, payload: isLoading });
  }

  function goToLocation(target: ePubCfi) {
    book.current?.injectJavaScript(`rendition.display('${target}'); true`);
  }

  function goPrevious() {
    book.current?.injectJavaScript(`rendition.prev(); true`);
  }

  function goNext() {
    book.current?.injectJavaScript(`rendition.next(); true`);
  }

  function getLocations() {
    return state.locations;
  }

  function getCurrentLocation() {
    book.current?.injectJavaScript(`
      alert(JSON.stringify(window.THEMES)); true
    `);
    return state.currentLocation;
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
    <ReaderContext.Provider
      value={{
        registerBook,
        setAtStart,
        setAtEnd,
        setTotalLocations,
        setCurrentLocation,
        setProgress,
        setLocations,
        setIsLoading,

        goToLocation,
        goPrevious,
        goNext,
        getLocations,
        getCurrentLocation,
        search,

        registerTheme,
        registerThemes,
        selectTheme,
        changeFontFamily,
        changeFontSize,
        updateTheme,
        themes: state.themes,

        activeTheme: state.activeTheme,
        atStart: state.atStart,
        atEnd: state.atEnd,
        totalLocations: state.totalLocations,
        currentLocation: state.currentLocation,
        progress: state.progress,
        locations: state.locations,
        isLoading: state.isLoading,
      }}
    >
      {children}
    </ReaderContext.Provider>
  );
};

export { ReaderProvider, ReaderContext };
