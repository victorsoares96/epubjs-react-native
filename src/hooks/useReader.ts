import { useContext } from 'react';
import { ReaderContext, ReaderContextProps } from '../context';

export function useReader() {
  const {
    changeFontSize,
    changeFontFamily,
    selectTheme,
    goToLocation,
    goPrevious,
    goNext,
    getLocations,
    getCurrentLocation,
    search,
    addMark,
    removeMark,
    themes,
    activeTheme,
    atStart,
    atEnd,
    totalLocations,
    currentLocation,
    progress,
    locations,
    isLoading,
    key,
    searchResults,
  } = useContext(ReaderContext);

  return {
    changeFontSize,
    changeFontFamily,
    selectTheme,
    goToLocation,
    goPrevious,
    goNext,
    getLocations,
    getCurrentLocation,
    search,
    addMark,
    removeMark,
    themes,
    activeTheme,
    atStart,
    atEnd,
    totalLocations,
    currentLocation,
    progress,
    locations,
    isLoading,
    key,
    searchResults,
  } as Pick<
    ReaderContextProps,
    | 'changeFontSize'
    | 'changeFontFamily'
    | 'selectTheme'
    | 'goToLocation'
    | 'goPrevious'
    | 'goNext'
    | 'getLocations'
    | 'getCurrentLocation'
    | 'search'
    | 'addMark'
    | 'removeMark'
    | 'themes'
    | 'activeTheme'
    | 'atStart'
    | 'atEnd'
    | 'totalLocations'
    | 'currentLocation'
    | 'progress'
    | 'locations'
    | 'isLoading'
    | 'key'
    | 'searchResults'
  >;
}
