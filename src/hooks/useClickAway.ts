import { useEffect } from 'react';

export const useClickAway = ({
  ref,
  handler,
}: {
  ref: React.RefObject<HTMLElement>;
  handler: (event: MouseEvent | TouchEvent | KeyboardEvent) => void;
  isActiveEscape?: boolean;
}) => {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent | KeyboardEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler(e);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
