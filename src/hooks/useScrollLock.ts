import { useCallback, useRef } from 'react';

const useBodyScrollLock = () => {
  const originalPaddingRightRef = useRef<string>('');

  const getBodyComputedScrollStyle = useCallback(() => {
    const originalStyle = window.getComputedStyle(document.body);
    return {
      overflow: originalStyle.overflow,
      paddingRight: originalStyle.paddingRight,
    };
  }, []);

  const getScrollBarWidth = useCallback(() => {
    return window.innerWidth - document.documentElement.clientWidth;
  }, []);

  const lock = useCallback(() => {
    const { overflow, paddingRight } = getBodyComputedScrollStyle();
    if (overflow === 'hidden') return;
    originalPaddingRightRef.current = paddingRight;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${getScrollBarWidth()}px`;
  }, [getBodyComputedScrollStyle, getScrollBarWidth]);

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

  return {
    lock,
    unlock,
  };
};

export default useBodyScrollLock;
