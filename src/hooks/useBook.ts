import { useContext } from 'react';
import { BookContext } from '../context';

export function useBook() {
  const context = useContext(BookContext);
  return context;
}
