import { useState, useEffect, MutableRefObject } from 'react';

const useDetectOutsideClick = (el: MutableRefObject<any>, initialState: boolean = false) => {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (el?.current !== null && !el.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener('click', onClick);
    }

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isActive, el]);

  return [isActive, setIsActive] as const;
};

export default useDetectOutsideClick;
