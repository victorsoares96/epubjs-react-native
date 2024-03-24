import { useContext } from 'react';
import { ReaderContext, ReaderContextProps } from '../context';

export function useReader() {
  const {
    changeFontSize,
    changeFontFamily,
    changeTheme,
    goToLocation,
    goPrevious,
    goNext,
    getLocations,
    getCurrentLocation,
    getMeta,
    search,
    theme,
    atStart,
    atEnd,
    totalLocations,
    currentLocation,
    progress,
    locations,
    isLoading,
    key,
    searchResults,
    addAnnotation,
    updateAnnotation,
    removeAnnotation,
    removeSelection,
    annotations,
  } = useContext(ReaderContext);

  return {
    changeFontSize,
    changeFontFamily,
    changeTheme,
    goToLocation,
    goPrevious,
    goNext,
    getLocations,
    getCurrentLocation,
    getMeta,
    search,
    addAnnotation,
    updateAnnotation,
    removeAnnotation,
    removeSelection,
    theme,
    atStart,
    atEnd,
    totalLocations,
    currentLocation,
    progress,
    locations,
    isLoading,
    key,
    searchResults,
    annotations,
  } as Pick<
    ReaderContextProps,
    | 'changeFontSize'
    | 'changeFontFamily'
    | 'changeTheme'
    | 'goToLocation'
    | 'goPrevious'
    | 'goNext'
    | 'getLocations'
    | 'getCurrentLocation'
    | 'getMeta'
    | 'search'
    | 'theme'
    | 'atStart'
    | 'atEnd'
    | 'totalLocations'
    | 'currentLocation'
    | 'progress'
    | 'locations'
    | 'isLoading'
    | 'key'
    | 'searchResults'
    | 'addAnnotation'
    | 'updateAnnotation'
    | 'removeAnnotation'
    | 'removeSelection'
    | 'annotations'
  >;
}
