import { DimensionValue, ViewStyle } from 'react-native';

export type PaginateOptions = {
  keepScrollOffset?: boolean;
};

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

export type Manager = 'default' | 'continuous';

export type Flow =
  | 'auto'
  | 'paginated'
  | 'scrolled'
  | 'scrolled-doc'
  | 'scrolled-continuous';

export type Spread = 'none' | 'always' | 'auto';

export type AnnotationType = 'mark' | 'highlight' | 'underline';

export type AnnotationStyles = {
  /**
   * Change the annotation color.
   * Only for `highlight` and `underline` type.
   *
   * Example: `green` or `#4c12a1`. Default is `yellow`
   */
  color?: string;
  /**
   * Change the annotation opacity.
   * Only for `highlight` and `underline` type.
   *
   * Example: `0.5`. Default is `0.3`
   */
  opacity?: number;
  /**
   * Only for `underline` annotation type. Define underline thickness.
   *
   * Default is: `1px`
   */
  thickness?: number;
};

export type Annotation<Data = any> = {
  type: AnnotationType;
  data: Data;
  cfiRange: ePubCfi;
  sectionIndex: number;
  cfiRangeText: string;
  iconClass?: string;
  styles?: AnnotationStyles;
};

export type Section = {
  id: string;
  href: string;
  label: string;
  parent?: any;
  subitems: Array<any>;
};

export type Toc = Section[];

export type Landmark = {
  href: string;
  label: string;
  type: string;
};

export type Bookmark<Data = any> = {
  id: number;
  section: Section;
  location: Location;
  text: string;
  data?: Data;
};

export type FontSize = string;

/**
 * @example
 * ````
 * epubcfi(/6/6!/4/2,/2/2/1:0,/4[q1]/2/14/2/1:14)
 * ````
 */
export type ePubCfi = string;

export type Theme = {
  [key: string]: {
    [key: string]: string;
  };
};

export type SearchResult = {
  cfi: ePubCfi;
  section: Section;
  excerpt: string;
};

export type SearchOptions = {
  /**
   * Example: toc-introduction_001
   */
  sectionId?: string;
};

export type LoadingFileProps = {
  fileSize: number;
  downloadProgress: number;
  downloadSuccess: boolean;
  downloadError: string | null;
};

type FileSystem = {
  file: string | null;
  progress: number;
  downloading: boolean;
  size: number;
  error: string | null;
  success: boolean;
  documentDirectory: string | null;
  cacheDirectory: string | null;
  bundleDirectory: string | null;
  readAsStringAsync: (
    fileUri: string,
    options?: {
      encoding?: 'utf8' | 'base64';
    }
  ) => Promise<string>;
  writeAsStringAsync: (
    fileUri: string,
    contents: string,
    options?: {
      encoding?: 'utf8' | 'base64';
    }
  ) => Promise<void>;
  deleteAsync: (fileUri: string) => Promise<void>;
  downloadFile: (
    fromUrl: string,
    toFile: string
  ) => Promise<{ uri: string | null; mimeType: string | null }>;
  getFileInfo: (fileUri: string) => Promise<{
    uri: string;
    exists: boolean;
    isDirectory: boolean;
    size: number | undefined;
  }>;
};

export interface ReaderProps {
  /**
   * Can be a `base64`, `epub`, `opf` or `binary`.
   * @param {object} src
   */
  src: string;
  /**
   * @param {ePubCfi[]} locations
   * @example
   * ```
   * <Reader
   *  src={{
   *    locations: ['epubcfi(/6/2...', 'epubcfi(/6/4...']
   *  }}
   * />
   * ```
   */
  initialLocations?: ePubCfi[];
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
   * @param {string} currentTocItem
   * @returns {void} void
   */
  onLocationChange?: (
    totalLocations: number,
    currentLocation: Location,
    progress: number,
    currentSection: Section | null
  ) => void;
  /**
   * Called once when the book has been searched
   * @param {SearchResult[]} results
   * @param {number} totalResults
   * @returns {void} void
   */
  onSearch?: (results: SearchResult[], totalResults: number) => void;
  /**
   * Called once the locations has been generated
   * @param {string} locations
   * @returns {void} void
   */
  onLocationsReady?: (epubKey: string, locations: ePubCfi[]) => void;
  /**
   * Called once a text selection has occurred
   * @param {SelectedText} selectedText
   * @returns {void} void
   */
  onSelected?: (selectedText: string, cfiRange: ePubCfi) => void;
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
   * @param {Toc} toc
   * @param {Landmark[]} landmarks
   * @returns {void} void
   */
  onNavigationLoaded?: ({
    toc,
    landmarks,
  }: {
    toc: Toc;
    landmarks: Landmark[];
  }) => void;
  /**
   * Called when the book was pressed
   * @deprecated use **onSingleTap** instead
   */
  onPress?: () => void;
  /**
   * Called when book is tapped once
   */
  onSingleTap?: () => void;
  /**
   * Called when the book was double pressed
   * @deprecated use **onDoubleTap** instead
   */
  onDoublePress?: () => void;
  /**
   * Called when book is tapped twice
   */
  onDoubleTap?: () => void;
  /**
   * Called when book is long pressed
   */
  onLongPress?: () => void;
  width?: DimensionValue;
  height?: DimensionValue;
  /**
   * Can be an ePubCfi or toc href
   */
  initialLocation?: string;
  /**
   * Enable swipe actions.
   * Default is `true`
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
   * Called when swipe up gesture is detected
   * @returns {void} void
   */
  onSwipeUp?: () => void;
  /**
   * Called when swipe down gesture is detected
   * @returns {void} void
   */
  onSwipeDown?: () => void;
  /**
   * Render when the book is loading
   * @returns {JSX.Element} JSX.Element
   */
  renderLoadingFileComponent?: (props: LoadingFileProps) => JSX.Element;
  /**
   * Appears when the book is been rendering
   * @returns {JSX.Element} JSX.Element
   */
  renderOpeningBookComponent?: () => JSX.Element;
  openingBookComponentContainerStyle?: ViewStyle;
  /**
   * Enable text selection feature on the book.
   *
   * Default is false, except when `menuItems` is passed.
   */
  enableSelection?: boolean;

  /**
   * @param theme {@link Theme}
   * @example
   * ```
   * <Reader
   *  defaultTheme={{ "body": { "color": "black" } }}
   * />
   * ```
   */
  defaultTheme?: Theme;

  fileSystem(): FileSystem;

  /**
   * This will allow the sandbox content to run scripts, but currently makes the sandbox insecure.
   *
   * By default this option is `true` in *iOS* to fix an execution blocking issue related to the use of the `addMark()` function in iOS platform.
   *
   * You can get more information about this in the issue: https://github.com/victorsoares96/epubjs-react-native/issues/111
   */
  allowScriptedContent?: boolean;

  /**
   * Epubjs is rendering the epub-content inside and iframe which defaults to sandbox="allow-same-origin", to enable opening links or running javascript in an epub, you will need to pass this param.
   */
  allowPopups?: boolean;

  /**
   * Function that is invoked when external link is pressed.
   *
   * When used, the `allowPopups` property is automatically enabled
   */
  onPressExternalLink?: (url: string) => void;

  /**
   * An array of objects which will be shown when selecting text. An empty array will suppress the menu.
   * These will appear after a long press to select text.
   * @platform ios, android
   */
  menuItems?: Array<{
    key?: string;
    label: string;
    /**
     * To keep text selection set the function return to `false`
     */
    action: (cfiRange: string, text: string) => boolean;
  }>;

  onAddAnnotation?: (annotation: Annotation) => void;

  onChangeAnnotations?: (annotations: Annotation[]) => void;

  /**
   * Called when annotation is pressed
   */
  onPressAnnotation?: (annotation: Annotation) => void;

  initialAnnotations?: Annotation[];

  onAddBookmark?: (bookmark: Bookmark) => void;

  onRemoveBookmark?: (bookmark: Bookmark) => void;

  onUpdateBookmark?: (bookmark: Bookmark) => void;

  onChangeBookmarks?: (bookmarks: Bookmark[]) => void;

  onIsBookmarked?: (isBookmarked: boolean) => void;

  initialBookmarks?: Bookmark[];

  /**
   * Set this to provide JavaScript that will be injected when the book loads.
   */
  injectedJavascript?: string;

  getInjectionJavascriptFn?: (
    injectJavascript: (script: string) => void
  ) => void;

  onWebViewMessage?: (event: any) => void;

  manager?: Manager;

  flow?: Flow;

  snap?: boolean;

  spread?: Spread;

  fullsize?: boolean;

  waitForLocationsReady?: boolean;

  /**
   * Prevents scroll top when change location
   *
   * Works with `scrolled-doc` flow.
   *
   * Default is false
   */
  keepScrollOffsetOnLocationChange?: boolean;
}
