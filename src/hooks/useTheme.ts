import type { Theme } from 'lib/typescript';
import useSetState from './useSetState';

export const defaultTheme: Theme = {
  'fontSize': '100%',
  'body': {
    'background': '#fff',
    'font-size': '100%',
  },
  'p': {
    'color': '#000 !important',
    'font-size': '100%',
  },
  'li': {
    'color': '#000 !important',
    'font-size': '100%',
  },
  'h1': {
    color: '#000 !important',
  },
  'a': {
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
