import React from 'react';

export default function useSetState<T>(initialState: T) {
  return React.useReducer(
    (state: T, newState: Partial<T>) => ({ ...state, ...newState }),
    initialState
  );
}
