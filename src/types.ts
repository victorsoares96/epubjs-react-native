import type { WebView } from 'react-native-webview';

export type Location = {
  atStart?: boolean;
  atEnd?: boolean;
  end: {
    cfi: ePubCfi;
    displayed: {
      page: number;
      total: number;
    };
    href: string;
    index: number;
    location: number;
    percentage: number;
  };
  start: {
    cfi: ePubCfi;
    displayed: {
      page: number;
      total: number;
    };
    href: string;
    index: number;
    location: number;
    percentage: number;
  };
};

export type Annotation = 'highlight' | 'underline';

export type FontSize = string;

/**
 * @example
 * ````
 * epubcfi(/6/6!/4/2,/2/2/1:0,/4[q1]/2/14/2/1:14)
 * ````
 */
export type ePubCfi = string;

export type Themes = {
  [key: string]: Theme;
};

export type Theme = {
  [key: string]: {
    [key: string]: any;
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
   * Change font size of all elements in the book
   * @param font
   * @see https://www.w3schools.com/cssref/css_websafe_fonts.asp
   */
  changeFontFamily: (font: string) => void;

  /**
   * Register a theme
   * @param {string} name
   * @param theme {@link Theme}
   * @example
   * ```
   * registerTheme({ dark: { "body": { "background": "#333", "color": "white" } } });
   * ```
   */
  registerTheme: (theme: Theme) => void;

  /**
   * @param themes {@link Themes}
   * @example
   * ```
   * registerThemes({ light: { "body": { "color": "black" } } });
   * ```
   */
  registerThemes: (themes: Themes) => void;

  /**
   * Select a existing theme
   * @param {string} name
   * @example
   * ```
   * selectTheme("light");
   * ```
   */
  selectTheme: (name: string) => void;

  /**
   * Update a existing theme
   * @param {string} name
   * @example
   * ```
   * updateTheme("light");
   * ```
   */
  updateTheme: (name: string) => void;

  /**
   * Go to specific location in the book
   * @param {ePubCfi} target {@link ePubCfi}
   * @param highlightColor {@link string} color of the highlight (default: yellow)
   */
  goToLocation: (target: string, highlightColor?: string) => void;

  /**
   * Go to previous page in the book
   */
  goPrevious: () => void;

  /**
   * Go to next page in the book
   */
  goNext: () => void;

  /**
   * Search for a specific text in the book
   * @param {string} query {@link string} text to search
   */
  search: (query: string) => void;

  /**
   * Get the total locations of the book
   */
  getLocations: () => ePubCfi[];

  /**
   * The active theme of the book
   */
  activeTheme: string;

  themes: Themes;

  /**
   * Change the current theme of the book
   * @param {Theme} theme {@link Theme}
   */
  // changeTheme: (theme: Theme) => void;

  /**
   * The current location of the book
   */
  currentLocation: Location | null;

  setCurrentLocation: (currentLocation: Location | null) => void;

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

  locations: ePubCfi[];

  setLocations: (locations: ePubCfi[]) => void;

  totalLocations: number;

  setTotalLocations: (totalLocations: number) => void;

  /**
   * Returns the current location of the book
   * @returns
   * @param {string} cfi {@link ePubCfi}
   * @param {number} currentPage {@link number}
   * @param {number} progress {@link progress}
   * @param {Date} date {@link Date}
   */
  getCurrentLocation: () => Location | null;

  /**
   * Indicates if you are at the beginning of the book
   * @returns {boolean} {@link boolean}
   */
  atStart?: boolean;
  setAtStart: (atStart: boolean) => void;

  /**
   * Indicates if you are at the end of the book
   * @returns {boolean} {@link boolean}
   */
  atEnd?: boolean;
  setAtEnd: (atEnd: boolean) => void;
}

export interface ReaderProps {
  /**
   * The source of your ePub. Can be a base64 string or a URL
   * @param {object} src
   */
  src: {
    /**
     * The base64 string of the ePub
     * @param {string} base64
     * @example
     * ```
     * <Reader
     *    src={{
     *    base64: 'base64 string'
     *  }}
     * />
     * ```
     */
    base64?: string;
    /**
     * The url of the ePub
     * @param {string} uri
     * @example
     * ```
     * <Reader
     *  src={{
     *    uri: 'https://example.com/epub.epub'
     *  }}
     * />
     * ```
     */
    uri?: string;
  };
  /**
   * Called once the book loads is started
   * @returns {void} void
   */
  onStarted?: () => void;
  /**
   * Called once book has been displayed
   * @params {number} totalLocations {@link number}
   * @params {currentLocation} currentLocation {@link CurrentLocation}
   * @params {number} progress {@link number}
   * @returns {void} void
   */
  onReady?: (
    totalLocations: number,
    currentLocation: Location,
    progress: number
  ) => void;
  /**
   * Called once book has not been displayed
   * @param {string} reason
   * @returns {void} void
   */
  onDisplayError?: (reason: string) => void;
  /**
   * Emit that the rendition has been resized
   * @param {any} layout
   * @returns {void} void
   */
  onResized?: (layout: any) => void;
  /**
   * Called when occurred a page change
   * @param {string} cfi
   * @param {number} progress
   * @param {number} totalPages
   * @returns {void} void
   */
  onLocationChange?: (
    totalLocations: number,
    currentLocation: number,
    progress: number
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
  onLocationsReady?: (epubKey: string, locations: Location[]) => void;
  /**
   * Called once a text selection has occurred
   * @param {SelectedText} selectedText
   * @returns {void} void
   */
  onSelected?: (selectedText: SelectedText, cfiRange: string) => void;
  /**
   * Called when marked text is pressed
   * @param {SelectedText} selectedText
   * @returns {void} void
   */
  onMarkPressed?: (selectedText: SelectedText, cfiRange: string) => void;
  /**
   * Called when screen orientation change is detected
   * @param {string} orientation
   * @returns {void} void
   */
  onOrientationChange?: (orientation: '-90' | '0' | '90') => void;
  /**
   * Called when the book is on the homepage
   * @returns {void} void
   */
  onBeginning?: () => void;
  /**
   * Called when the book is on the final page
   * @returns {void} void
   */
  onFinish?: () => void;
  /**
   * Emit that a section has been rendered
   * @param {any} section
   * @param {any} currentSection
   * @returns {void} void
   */
  onRendered?: (section: any, currentSection: any) => void;
  /**
   * Called when book layout is change
   * @param {string} layout
   * @returns {void} void
   */
  onLayout?: (layout: any) => void;
  /**
   * @param {any} toc
   * @returns {void} void
   */
  onNavigationLoaded?: (toc: any) => void;
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
  /**
   * Enable text selection feature on the book
   * @default false
   * @description Recommend using this with `enableSwipe` disabled
   */
  enableSelection?: boolean;

  themes?: Themes;

  activeTheme?: string;
}
