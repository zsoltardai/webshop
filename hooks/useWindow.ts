import React, { useEffect, useState } from 'react';


type UseWindow = () => {isMobile: boolean};

const useWindow: UseWindow = () => {

  const [isMobile, setMobile] = useState<boolean>(window.innerWidth < 800);

  const eventListener = (): void => setMobile(window.innerWidth < 800);

  useEffect(
    () => {
      window.addEventListener(
        'resize',
        eventListener,
      );

      return () => window.removeEventListener(
        'resize',
        eventListener
      );
    },
    [],
  );

  return {isMobile};
};

export default useWindow;
