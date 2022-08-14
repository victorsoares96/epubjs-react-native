import type { Theme } from '@epubjs-react-native/core';

export const dark: Theme = {
  'body': {
    background: '#333',
  },
  'span': {
    color: '#fff !important',
  },
  'p': {
    color: '#fff !important',
  },
  'li': {
    color: '#fff !important',
  },
  'h1': {
    color: '#fff !important',
  },
  'a': {
    'color': '#fff !important',
    'pointer-events': 'auto',
    'cursor': 'pointer',
  },
  '::selection': {
    background: 'lightskyblue',
  },
};
