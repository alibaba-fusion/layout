import { useRef } from 'react';
import { uniqueId } from 'lodash-es';

export default function useGuid(prefix = '') {
  const id = useRef(uniqueId(prefix));
  return id.current;
}
