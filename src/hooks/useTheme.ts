import type { Theme, Themes } from 'src/types';
import useSetState from './useSetState';

export const defaultTheme: Theme = {
  default: {
    'body': {
      background: '#fff',
    },
    'span': {
      color: '#000 !important',
    },
    'p': {
      color: '#000 !important',
    },
    'li': {
      color: '#000 !important',
    },
    'h1': {
      color: '#000 !important',
    },
    'a': {
      'color': '#000 !important',
      'pointer-events': 'auto',
      'cursor': 'pointer',
    },
    '::selection': {
      background: 'lightskyblue',
    },
  },
};

export const themes: Themes = {
  ...defaultTheme,
};

interface InitialState {
  themes: Themes;
  activeTheme: string;
}

const initialState = {
  themes,
  activeTheme: 'default',
};

export function useTheme() {
  return useSetState<InitialState>(initialState);
}
