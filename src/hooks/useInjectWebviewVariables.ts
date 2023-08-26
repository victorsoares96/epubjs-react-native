import { useCallback } from 'react';
import type { Theme, ePubCfi } from '../types';
import template from '../template';
import type { SourceType } from '../utils/enums/source-type.enum';

export function useInjectWebVieWVariables() {
  const injectWebVieWVariables = useCallback(
    ({
      jszip,
      epubjs,
      type,
      book,
      theme,
      enableSelection,
      locations,
    }: {
      jszip: string;
      epubjs: string;
      type: SourceType;
      book: string;
      theme: Theme;
      enableSelection: boolean;
      locations?: ePubCfi[];
    }) => {
      return template
        .replace(
          /<script id="jszip"><\/script>/,
          `<script src="${jszip}"></script>`
        )
        .replace(
          /<script id="epubjs"><\/script>/,
          `<script src="${epubjs}"></script>`
        )
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
  return { injectWebVieWVariables };
}
