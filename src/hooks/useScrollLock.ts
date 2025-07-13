import { useCallback, useEffect, useRef } from 'react';

const useBodyScrollLock = () => {
  const scrollBarWidthRef = useRef<number>();
  const originalPaddingRightRef = useRef<string>('');

  const getBodyComputedScrollStyle = useCallback(() => {
    const originalStyle = window.getComputedStyle(document.body);
    return {
      overflow: originalStyle.overflow,
      paddingRight: originalStyle.paddingRight,
    };
  }, []);

  const lock = useCallback(() => {
    const { overflow, paddingRight } = getBodyComputedScrollStyle();
    if (overflow === 'hidden') return;
    originalPaddingRightRef.current = paddingRight;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarWidthRef.current}px`;
  }, [getBodyComputedScrollStyle]);

  const unlock = useCallback(() => {
    const { overflow } = getBodyComputedScrollStyle();
    if (overflow !== 'hidden') return;
    document.body.style.overflow = '';
    document.body.style.paddingRight =
      originalPaddingRightRef.current === '0px'
        ? ''
        : originalPaddingRightRef.current;
    if (!document.body.getAttribute('style')) {
      document.body.removeAttribute('style');
    }
  }, [getBodyComputedScrollStyle]);

  useEffect(() => {
    if (!scrollBarWidthRef.current) {
      scrollBarWidthRef.current =
        window.innerWidth - document.documentElement.clientWidth;
    }
  }, []);

  return {
    lock,
    unlock,
  };
};

export default useBodyScrollLock;
