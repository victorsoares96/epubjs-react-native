import { Themes } from '@epubjs-react-native/core';
import { light, dark, sepia } from '../CustomThemes/themes';

export const MAX_FONT_SIZE = 32;
export const MIN_FONT_SIZE = 8;

export const availableFonts: Array<string> = [
  'Helvetica',
  'cursive',
  'serif',
  'monospace',
  'Georgia',
  'Times',
];

export const themes: Themes = {
  light,
  dark,
  sepia,
};
