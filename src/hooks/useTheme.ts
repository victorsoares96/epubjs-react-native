import type { Theme } from 'src/types';
import useSetState from './useSetState';

export const defaultTheme: Theme = {
  'fontSize': '12pt',
  'body': {
    'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    'background': '#fff',
    'font-size': '12pt',
  },
  'span': {
    'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    'color': '#000 !important',
    'font-size': '12pt',
  },
  'p': {
    'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    'color': '#000 !important',
    'font-size': '12pt',
  },
  'li': {
    'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    'color': '#000 !important',
    'font-size': '12pt',
  },
  'h1': {
    'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    'color': '#000 !important',
  },
  'a': {
    'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    'color': '#000 !important',
    'pointer-events': 'auto',
    'cursor': 'pointer',
  },
  '::selection': {
    background: 'lightskyblue',
  },
};

export function useTheme(theme: Theme = defaultTheme) {
  return useSetState<Theme>(theme);
}
