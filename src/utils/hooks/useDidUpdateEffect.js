import { useEffect, useRef } from "react";

export const useDidUpdateEffect = (callback, dependency) => {
  const hasRendered = useRef(false);

  useEffect(
    () => (hasRendered.current ? callback() : (hasRendered.current = true)),
    dependency
  );
};
