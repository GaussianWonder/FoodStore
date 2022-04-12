import { useState, useEffect } from 'react';

const useDetectRightEdge = (initialState: boolean = false, fraction: number = 0.1) => {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const { screenX } = e;
      const { clientWidth } = document.body;

      setIsActive(screenX >= clientWidth - fraction * clientWidth);
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [isActive]);

  return [isActive, setIsActive] as const;
};

export default useDetectRightEdge;
