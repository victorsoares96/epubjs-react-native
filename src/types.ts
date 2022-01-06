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
  /**
   * Register a book reference
   * @param {WebView} bookRef
   */
  registerBook: (bookRef: WebView) => void;

  /**
   * Change font size of all elements in the book
   * @param {FontSize} size {@link FontSize}
   */
  changeFontSize: (size: FontSize) => void;

  /**
   * Go to specific location in the book
   * @param {ePubCfi} target {@link ePubCfi}
   * @param highlightColor {@link string} color of the highlight (default: yellow)
   */
  goToLocation: (target: string, highlightColor?: string) => void;

  /**
   * Go to specific page in the book
   * @param {number} page {@link number}
   */
  goToPage: (page: number) => void;

  /**
   * Go to previous page in the book
   */
  goPrevious: () => void;

  /**
   * Go to next page in the book
   */
  goNext: () => void;

  goToNote: (cfi: ePubCfi, currentPage?: number) => void;

  /**
   * Search for a specific text in the book
   * @param {string} query {@link string} text to search
   */
  search: (query: string) => void;

  /**
   * The theme of the book
   */
  theme: Theme;

  /**
   * Change the current theme of the book
   * @param {Theme} theme {@link Theme}
   */
  changeTheme: (theme: Theme) => void;

  /**
   * The current location of the book
   */
  currentLocation: string | null;

  setCurrentLocation: (currentLocation: string | null) => void;

  /**
   * The current page
   * @returns {number} {@link number}
   */
  currentPage: number;
  setCurrentPage: (page: number) => void;
  /**
   * The total number of pages
   * @returns {number} {@link number}
   */
  totalPages: number;
  setTotalPages: (totalPages: number) => void;
  /**
   * The progress of the book
   * @returns {number} {@link number}
   */
  progress: number;

  setProgress: (progress: number) => void;

  /**
   * Indicates if the book is loading
   * @returns {boolean} {@link boolean}
   */
  isLoading: boolean;

  setIsLoading: (isLoading: boolean) => void;

  locations: string | null;

  setLocations: (locations: string | null) => void;

  /**
   * Returns the current location of the book
   * @returns
   * @param {string} cfi {@link ePubCfi}
   * @param {number} currentPage {@link number}
   * @param {number} progress {@link progress}
   * @param {Date} date {@link Date}
   */
  getCurrentLocation: () => CurrentLocation;
}

export interface ReaderProps {
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
  width: number;
  /**
   * height of the ePub Rendition
   * @param {number} height
   */
  height: number;
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
   * @returns {React.ReactNode} React.ReactNode
   */
  renderLoadingComponent?: () => React.ReactNode;
}
