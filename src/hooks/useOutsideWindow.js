import { useEffect, useRef } from 'react';

function useOutsideWindow(handler, handleEventPhase = true) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler();
    };
    document.addEventListener('click', handleClick, handleEventPhase);
    return () => document.removeEventListener('click', handleClick, handleEventPhase); // Handle event in the capturing phase
  }, [handler, handleEventPhase]);
  return { ref };
}

export default useOutsideWindow;
