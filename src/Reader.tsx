import React from 'react';
import { Platform } from 'react-native';

import { Reader as AndroidReader } from './Reader.android';
import { Reader as IOSReader } from './Reader.ios';

import type { ReaderProps } from './types';

export function Reader(props: ReaderProps) {
  // @ts-ignore
  if (Platform.OS === 'android') return <AndroidReader {...props} />;
  return <IOSReader {...props} />;
}
