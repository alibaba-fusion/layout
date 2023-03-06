import { useEffect, useRef } from 'react';

// @ts-ignore
export default function useCombinedRefs(...refs) {
  const targetRef = useRef();

  useEffect(() => {
    refs.forEach((r) => {
      if (!r) return;

      if (typeof r === 'function') {
        r(targetRef.current);
      } else {
        r.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}
