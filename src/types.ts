import type { WebView } from 'react-native-webview';

export type FontSize =
  | '25%'
  | '50%'
  | '75%'
  | '125%'
  | '100%'
  | '150%'
  | '175%'
  | '200%';

export type ePubCfi = string;

export type CurrentLocation = {
  cfi: string | null;
  currentPage: number;
  progress: number;
  date: Date;
};

export type Theme = {
  'fontSize': FontSize;
  'body': {
    'background': string;
    'font-size': FontSize;
  };
  'p': {
    'color': string;
    'font-size': FontSize;
  };
  'li': {
    'color': string;
    'font-size': FontSize;
  };
  'h1': {
    color: string;
  };
  'a': {
    'color': string;
    'pointer-events': string;
    'cursor': string;
  };
  '::selection': {
    background: string;
  };
};

export type SearchResult = {
  cfi: string;
  excerpt: string;
};

export type SelectedText = {
  cfi: string;
  location: number;
  progress: number;
  text: string;
  totalPages: number;
  highlightColor: string;
  currentDate: Date;
};

export interface ReaderContextProps {
  registerBook: (bookRef: WebView) => void;

  changeFontSize: (size: FontSize) => void;

  goToLocation: (target: string, highlightColor?: string) => void;

  goToPage: (page: number) => void;

  goPrevious: () => void;

  goNext: () => void;

  goToNote: (cfi: ePubCfi, currentPage?: number) => void;

  search: (query: string) => void;

  theme: Theme;

  changeTheme: (theme: Theme) => void;

  currentLocation: string | null;

  setCurrentLocation: (currentLocation: string | null) => void;

  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (totalPages: number) => void;
  progress: number;

  setProgress: (progress: number) => void;

  isLoading: boolean;

  setIsLoading: (isLoading: boolean) => void;

  locations: string | null;

  setLocations: (locations: string | null) => void;

  getCurrentLocation: () => CurrentLocation;
}

export interface ReaderProps {
  src: string;
  onStarted?: () => void;
  onAttached?: () => void;
  onDisplayed?: () => void;

  onDisplayError?: (reason: string) => void;
  onRendered?: (section: any, view: any) => void;
  onRemoved?: (section: any, view: any) => void;

  onResized?: (width: number, height: number) => void;

  onLocationChange?: (
    cfi: string,
    progress: number,
    totalPages: number
  ) => void;

  onSearch?: (results: SearchResult[]) => void;

  onLocationsReady?: (locations: string) => void;

  onSelected?: (selectedText: SelectedText) => void;

  onMarkPressed?: (selectedText: SelectedText) => void;
  initialLocation?: string;
  onOrientationChange?: (orientation: '-90' | '0' | '90') => void;
  onPress?: () => void;
  onDoublePress?: () => void;
  width: number | string;
  height: number | string;
  nitialLocation?: string;
  enableSwipe?: boolean;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  renderLoadingComponent?: () => React.ReactNode;
}
