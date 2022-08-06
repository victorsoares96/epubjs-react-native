import { useCallback } from 'react';
import type { Theme, ePubCfi } from '../types';
import template from '../template';

export function useInjectBookVariables() {
  const injectBookVariables = useCallback(
    ({
      type,
      book,
      theme,
      enableSelection,
      locations,
    }: {
      type: 'file' | 'base64' | 'url';
      book: string;
      theme: Theme;
      enableSelection: boolean;
      locations?: ePubCfi[];
    }) => {
      return template
        .replace(/const type = window.type;/, `const type = '${type}';`)
        .replace(/const file = window.book;/, `const file = '${book}';`)
        .replace(
          /const theme = window.theme;/,
          `const theme = ${JSON.stringify(theme)};`
        )
        .replace(
          /const initialLocations = window.locations;/,
          `const initialLocations = ${locations};`
        )
        .replace(
          /const enableSelection = window.enable_selection;/,
          `const enableSelection = ${enableSelection};`
        );
    },
    []
  );

  return { injectBookVariables };
}
