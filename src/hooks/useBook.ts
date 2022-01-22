import { useContext } from 'react';
import { ReaderContext } from '../context';

export function useReader() {
  const context = useContext(ReaderContext);
  return context;
}
