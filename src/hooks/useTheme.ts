import type { Theme } from 'src/types';
import useSetState from './useSetState';

export const defaultTheme: Theme = {
  'fontSize': '100%',
  'body': {
    'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    'background': '#fff',
    'font-size': '100%',
  },
  'p': {
    'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    'color': '#000 !important',
    'font-size': '100%',
  },
  'li': {
    'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    'color': '#000 !important',
    'font-size': '100%',
  },
  'h1': {
    'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    'color': '#000 !important',
  },
  'a': {
    'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    'color': '#000 !important',
    'pointer-events': 'none',
    'cursor': 'default',
  },
  '::selection': {
    background: 'lightskyblue',
  },
};

export function useTheme(theme: Theme = defaultTheme) {
  return useSetState<Theme>(theme);
}
