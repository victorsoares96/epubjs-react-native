import type { Theme } from '@epubjs-react-native/core';

export const light: Theme = {
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
};
