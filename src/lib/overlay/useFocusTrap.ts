'use client';
import { useEffect, useRef } from 'react';
import useKeyPress from './useKeyPress';

export const useFocusTrap = (isActive: boolean) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const focusableSelector =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  useKeyPress('Tab', (e) => {
    if (!isActive || !modalRef.current) return;

    const focusableElements =
      modalRef.current.querySelectorAll(focusableSelector);
    if (!focusableElements.length) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    // Shift+Tab을 누른 경우
    if (e.shiftKey) {
      // 첫 번째 요소에서 Shift+Tab을 누르면 마지막 요소로 이동
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      // Tab만 누른 경우
      // 마지막 요소에서 Tab을 누르면 첫 번째 요소로 이동
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  });

  useEffect(() => {
    if (!isActive || !modalRef.current) return;
    previousFocusRef.current = document.activeElement as HTMLElement;
    const focusableElements =
      modalRef.current.querySelectorAll(focusableSelector);

    if (focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    } else {
      modalRef.current.focus();
    }

    return () => {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isActive]);

  return modalRef;
};
