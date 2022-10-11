import { useRef } from 'react';

let counter = 0;

export function guid(prefix = '') {
  counter++;
  return `${prefix}${counter}`;
}

export default function useGuid(prefix = '') {
  const id = useRef(guid(prefix));
  return id.current;
}
